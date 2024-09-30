import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CustomSidebar from "./CustomSidebar";

const CurrentProject = () => {
  const { name } = useParams();
  const initialData = [
    { type: "In progress", data: ["Task 1", "Task 2"], color: "text-[#2b83de]"   ,  border: "border-[#2b83de]"   },
    { type: "To Do", data: ["Task 3", "Task 4"], color: "text-[#f7a23a]",  border: "border-[#f7a23a]" },
    { type: "In Review", data: ["Task 5"], color: "text-[#e23333]" ,  border: "border-[#e23333]"},
    { type: "Ready For QA", data: ["Task 6"], color: "text-[#7ec451]" ,  border: "border-[#7ec451]"},
    { type: "Closed", data: [], color: "text-[#696969]",  border: "border-[#696969]" }, // Fixed invalid "text-gyay"
  ];

  const [columns, setColumns] = useState(initialData);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedColumnIndex, setDraggedColumnIndex] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(null);

  const handleColumnDragStart = (e, columnIndex) => {
    setDraggedColumnIndex(columnIndex);
    e.dataTransfer.setData("text/plain", columnIndex);
  };

  const handleColumnDrop = (e, toColumnIndex) => {
    const fromColumnIndex = draggedColumnIndex;

    if (fromColumnIndex === toColumnIndex) return;

    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const draggedColumn = newColumns.splice(fromColumnIndex, 1)[0];
      newColumns.splice(toColumnIndex, 0, draggedColumn);
      return newColumns;
    });
    setDraggedColumnIndex(null);
  };

  const handleTaskDragStart = (e, task, fromColumnIndex) => {
    setDraggedTask({ task, fromColumnIndex });
    e.dataTransfer.setData("text/plain", task);
    e.currentTarget.classList.add("dragging");
  };

  const handleTaskDrop = (e, toColumnIndex) => {
    const { task, fromColumnIndex } = draggedTask;
    document
      .querySelectorAll(".dragging")
      .forEach((element) => element.classList.remove("dragging"));
    // Prevent unnecessary state updates if task is dropped in the same column
    if (fromColumnIndex === toColumnIndex) return;
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      const fromColumn = updatedColumns[fromColumnIndex].data;
      const toColumn = updatedColumns[toColumnIndex].data;
      // Find the task index in the source column
      const taskIndex = fromColumn.indexOf(task);
      if (taskIndex === -1) return updatedColumns; // Task not found, no update needed
      // Remove the task from the source column
      const [removedTask] = fromColumn.splice(taskIndex, 1);
      // Add the task to the destination column if it doesn't already exist
      if (!toColumn.includes(removedTask)) {
        toColumn.push(removedTask);
      }
      return updatedColumns;
    });
    // Reset dragged task and remove any 'dragging' classes
    setDraggedTask(null);
    // document.querySelectorAll(".dragging").forEach((element) => element.classList.remove("dragging"));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCloseForm = () => {
    setNewTask(""); // Clear the input field
    setSelectedColumnIndex(null); // Hide the form
  };

  const handleAddTask = (columnIndex) => {
    if (newTask.trim() === "") return;

    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];

      // Check if the task already exists in the column's data
      if (!updatedColumns[columnIndex].data.includes(newTask)) {
        updatedColumns[columnIndex].data = [
          ...updatedColumns[columnIndex].data,
          newTask,
        ];
      }

      return updatedColumns;
    });

    setNewTask("");
    setSelectedColumnIndex(null);
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddButtonClick = (columnIndex) => {
    // If the form is already open for this column, close it by setting selectedColumnIndex to null
    if (selectedColumnIndex === columnIndex) {
      setSelectedColumnIndex(null);
    } else {
      setSelectedColumnIndex(columnIndex); // Otherwise, open the form for the clicked column
    }
  };

  console.log(columns);

  return (
    <div className="flex bg-[#F7FAFF] h-screen">
      <CustomSidebar />
      <div className="flex flex-col w-full overflow-auto">
        <div className="bg-[#F7FAFF] w-full px-9 py-3 text-2xl font-bold text-gray-700">
          {name}
        </div>
        <div className="overflow-hidden h-full">
          <div className="p-4 flex h-full">
            <div className="border border-gray-200 rounded-3xl p-9 bg-white gap-6 shadow-lg flex w-full overflow-x-scroll scrollable-no-scrollbar ">
              {columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`border border-t-0 border-gray-200 rounded-3xl py-4 px-3 bg-slate-200 overflow-y-scroll scrollable-no-scrollbar flex flex-col min-w-[350px] mr-4 ${
                    draggedColumnIndex === columnIndex ? "column-dragging" : ""
                  }`}
                  style={{ height: "calc(-170px + 100vh)" }}
                  onDrop={(e) => {
                    if (draggedTask) {
                      handleTaskDrop(e, columnIndex);
                    } else {
                      handleColumnDrop(e, columnIndex);
                    }
                  }}
                  onDragOver={handleDragOver}
                  draggable
                  onDragStart={(e) => handleColumnDragStart(e, columnIndex)}
                >
                  <div className="flex justify-between items-center mb-4 border-b-2 border-b-gray-400 ">
                    <div className="flex gap-2">
                    <div className={`border-2  rounded-full  ${column.border} my-1`}></div>
                    <h3
                      className={`text-xl font-semibold capitalize text-[16px] ${column.color}`}
                    >
                      {column.type}
                    </h3>
                    </div>
                    <button
                      className="text-[20px] font-bold"
                      onClick={() => handleAddButtonClick(columnIndex)}
                    >
                      +
                    </button>
                  </div>
                  {selectedColumnIndex === columnIndex && (
                    <div className="mb-4 border border-gray-100 px-2 py-3 bg-white shadow-lg rounded-md">
                      <div className="text-md font-bold">Title</div>
                      <input
                        type="text"
                        value={newTask}
                        onChange={handleNewTaskChange}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && newTask.trim() !== "") {
                            handleAddTask(columnIndex); // Trigger task addition on Enter key press
                          }
                        }}
                        className="border mt-2 w-full p-1 rounded"
                        placeholder="Enter new task"
                      />
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => handleAddTask(columnIndex)}
                          className={`mt-3 p-1 rounded ${
                            newTask.trim() === ""
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-blue-500 text-white"
                          }`}
                          disabled={newTask.trim() === ""} // Disable if newTask is empty
                        >
                          Add Task
                        </button>

                        <button
                          onClick={handleCloseForm}
                          className="mt-3 py-1 px-2 bg-white text-black border border-gray-200 shadow-inner text-sm rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  {column.data.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`bg-white shadow-lg py-9 px-3 mb-5 rounded-md cursor-pointer hover:bg-gray-50 transition-colors task-item ${
                        draggedTask?.task === task ? "dragging" : ""
                      }`}
                      draggable
                      onDragStart={(e) =>
                        handleTaskDragStart(e, task, columnIndex)
                      }
                    >
                      {task}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentProject;
