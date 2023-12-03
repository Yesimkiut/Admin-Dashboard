import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";

export function useApi(url) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setFilterData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  const removeData = useCallback(
    (id) => {
      const updatedData = data.filter((item) => id !== item.id);
      setData(updatedData);
      setFilterData(updatedData);
    },
    [data]
  );

  const editData = useCallback(
    (id, editedData) => {
      const updatedData = data.map((item) =>
        id === item.id ? { ...item, ...editedData } : item
      );
      setData(updatedData);
      setFilterData(updatedData);
    },
    [data]
  );

  const handleRowSelection = useCallback((id, checked, selectedRow) => {
    if (checked) {
      setSelectedRowId((prevSelectedRowIds) => [...prevSelectedRowIds, id]);
    } else {
      const updatedRow = selectedRow.filter((item) => id !== item);
      setSelectedRowId(updatedRow);
    }
  }, []);

  const performSearch = useCallback(
    (term) => {
      const lowercasedTerm = term.toLowerCase();
      const results = data.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(lowercasedTerm)
        )
      );
      setFilterData(results);
    },
    [data]
  );

  const handleBulkDelete = useCallback(
    (selectedRow) => {
      if (selectedRow.length > 0) {
        const updatedData = data.filter(
          (item) => !selectedRow.includes(item.id)
        );
        setData(updatedData);
        setFilterData(updatedData);
        setSelectedRowId([]);
      }
    },
    [data]
  );

  const handleBulkSelection = useCallback(
    (bulkData, checked) => {
      if (bulkData.length > 0) {
        if (checked) {
          const bulkDataId = bulkData.map((item) => item.id);
          setSelectedRowId(bulkDataId);
        } else {
          selectedRowId([]);
        }
      }
    },
    [data]
  );

  const memoizedFilterData = useMemo(() => filterData, [filterData]);

  return {
    data: memoizedFilterData,
    removeData,
    editData,
    performSearch,
    handleRowSelection,
    selectedRowId,
    handleBulkDelete,
    handleBulkSelection,
  };
}
