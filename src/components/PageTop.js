import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import SearchInput from "./SearchInput";

const PageTop = ({ performSearch, handleBulkDelete, selectedRow }) => {
  return (
    <div className="top">
      <SearchInput performSearch={performSearch} />
      <button
        className="delete-button-top"
        onClick={() => handleBulkDelete(selectedRow)}
      >
        <MdDeleteOutline className="delete-icon-top" />
      </button>
    </div>
  );
};

export default PageTop;
