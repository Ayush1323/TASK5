import React from "react";
import { Pagination } from "@mui/material";

const CommonPagination = ({
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  perPageOptions,
}) => {
  return (
    <div className="flex justify-between items-center mt-3">
      <div>
        <label htmlFor="rowsPerPage" className="mr-2 text-gray-700">
          Per page:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(e)}
          className="border p-2 rounded cursor-pointer"
        >
          {perPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Pagination
          count={Math.ceil(totalCount / rowsPerPage)}
          page={page}
          onChange={onPageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default CommonPagination;
