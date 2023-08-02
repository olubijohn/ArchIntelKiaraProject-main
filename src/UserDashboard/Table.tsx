import React, { useEffect, useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { HiDotsVertical } from "react-icons/hi";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import * as routes from "../Data/Routes";
import { TableData } from "../Interface/ITableData";
import { initialData } from "../Data/TableData";

const Table: React.FC = () => {
  const navigate = useNavigate();
  const [lastRescheduled, setLastRescheduled] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<TableData[]>(initialData);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 5;

  useEffect(() => {
    setData(initialData);
  }, []);

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
  };

  const handleSort = (column: string) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = data.sort((a, b) => {
    if (sortBy !== "") {
      if (a[sortBy as keyof TableData] < b[sortBy as keyof TableData]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[sortBy as keyof TableData] > b[sortBy as keyof TableData]) {
        return sortOrder === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const showReschedules = (index: number) => {
    const rescheduled = document.getElementById(`reschedule${index}`);
    const last_rescheduled = document.getElementById(lastRescheduled);
    if (rescheduled) {
      if (last_rescheduled) last_rescheduled.style.visibility = "hidden";
      if (lastRescheduled !== `reschedule${index}`) {
        rescheduled.style.visibility = "visible";
        setLastRescheduled(`reschedule${index}`);
      } else {
        setLastRescheduled("");
      }
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead className="head">
          <tr>
            {/* <th onClick={() => handleSort("id")}>
              ID{" "}
              {sortBy === "id" && (
                <span>{sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}</span>
              )}
            </th> */}
            <th onClick={() => handleSort("name")}>
              Doctor name{" "}
              {sortBy === "name" && (
                <span>
                  {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("type")}>
              Type{" "}
              {sortBy === "type" && (
                <span>
                  {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("date")}>
              Date{" "}
              {sortBy === "date" && (
                <span>
                  {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("status")}>
              Status{" "}
              {sortBy === "status" && (
                <span>
                  {sortOrder === "asc" ? <BsArrowUp /> : <BsArrowDown />}
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              {/* <td>{item.id}</td> */}
              <td className="table-cell">{item.name}</td>
              <td className="table-cell">{item.type}</td>
              <td className="table-cell">{item.date}</td>
              <td className={`table-cell `}>
                <span
                  className={`${
                    item.status.toLowerCase().startsWith("d")
                      ? "done"
                      : item.status.toLowerCase().startsWith("c")
                      ? "cancelled"
                      : "missed"
                  }`}
                >
                  {item.status}
                </span>
                {item.status.toLowerCase().startsWith("m") && (
                  <HiDotsVertical onClick={() => showReschedules(index)} />
                )}
                {item.status.toLowerCase().startsWith("m") && (
                  <div
                    className="rescheduled"
                    id={`reschedule${index}`}
                    key={item.id}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <span style={{ padding: "5px 0px" }}>Cancel</span>
                    <span onClick={() => navigate(routes.appointment)}>
                      Reschedule
                    </span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        Rows per page:
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <span>{`${
          indexOfFirstItem + 1
        }-${indexOfLastItem} of ${totalPages}`}</span>
        <GrPrevious
          onClick={() => {
            if (currentPage !== 1) {
              handlePageChange(currentPage - 1);
            }
          }}
        />
        <GrNext
          onClick={() => {
            if (currentPage !== totalPages) {
              handlePageChange(currentPage + 1);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Table;
