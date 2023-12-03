import React, { useCallback, useMemo, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { usePagination } from "../hooks/usePagination";
import { useApi } from "../hooks/useApi";
import PageTop from "./PageTop";
import PageBottom from "./PageBottom";

const URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const Table = () => {
  const {
    data,
    removeData,
    editData,
    performSearch,
    handleRowSelection,
    selectedRowId,
    handleBulkDelete,
    handleBulkSelection,
  } = useApi(URL);
  const {
    currentPage,
    PAGE_LIMIT,
    goToNextPage,
    goToPrevPage,
    pageArray,
    goToFirstPage,
    goToLastPage,
    goToPageNum,
    numPages,
  } = usePagination(data);
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_LIMIT;
    const endIndex = startIndex + PAGE_LIMIT;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage]);

  const renderHeader = () => {
    let headerElement = ["name", "email", "role", "action"];

    return headerElement.map((key, index) => {
      return (
        <th className={key === "name" ? "checkbox-text" : ""} key={index}>
          {key === "name" && (
            <input
              type="checkbox"
              checked={
                paginatedData.length > 0 &&
                paginatedData.every((item) => selectedRowId.includes(item.id))
              }
              onChange={(e) =>
                handleBulkSelection(paginatedData, e.target.checked)
              }
            />
          )}
          <span>{key.toUpperCase()}</span>
        </th>
      );
    });
  };

  const handleSave = () => {
    editData(editMode, editedData);
    setEditMode(null);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedData(null);
  };

  const renderBody = () => {
    return (
      paginatedData &&
      paginatedData.map(({ id, name, email, role }) => {
        return (
          <tr
            style={
              selectedRowId.includes(id) ? { backgroundColor: "#ddd" } : {}
            }
            key={id}
          >
            <td>
              {editMode === id ? (
                <input
                  className="table-input"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                />
              ) : (
                <div className="checkbox-text">
                  <input
                    type="checkbox"
                    checked={selectedRowId.includes(id)}
                    onChange={(e) =>
                      handleRowSelection(id, e.target.checked, selectedRowId)
                    }
                  />
                  <span>{name}</span>
                </div>
              )}
            </td>
            <td>
              {editMode === id ? (
                <input
                  className="table-input"
                  value={editedData.email}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                />
              ) : (
                email
              )}
            </td>
            <td>
              {editMode === id ? (
                <input
                  className="table-input"
                  value={editedData.role}
                  onChange={(e) =>
                    setEditedData({ ...editedData, role: e.target.value })
                  }
                />
              ) : (
                role
              )}
            </td>
            <td className="action">
              {editMode === id ? (
                <>
                  <button
                    className="save-button"
                    onClick={() => handleSave(id)}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => handleCancelEdit()}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditMode(id);
                      setEditedData({ name, email, role });
                    }}
                  >
                    <FaEdit className="edit-icon" />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => removeData(id)}
                  >
                    <MdDeleteOutline className="delete-icon" />
                  </button>
                </>
              )}
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <>
      <PageTop
        performSearch={performSearch}
        handleBulkDelete={handleBulkDelete}
        selectedRow={selectedRowId}
      />
      <table id="employee">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
      <PageBottom
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        pageArray={pageArray}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        goToPageNum={goToPageNum}
        numPages={numPages}
        currentPage={currentPage}
        selectedRow={selectedRowId.length}
        totalRow={paginatedData.length}
      />
    </>
  );
};

export default Table;
