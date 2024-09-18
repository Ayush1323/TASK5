import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CustomSidebar from "./CustomSideBar";

const CurrentProject = () => {
  const { name } = useParams();

  const initialData = [
    { type: "In progress", data: ["Task 1", "Task 2"] },
    { type: "To Do", data: ["Task 3", "Task 4"] },
    { type: "In Review", data: ["Task 5"] },
    { type: "Ready For QA", data: ["Task 6"] },
  ];

  const [columns, setColumns] = useState(initialData);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedColumnIndex, setDraggedColumnIndex] = useState(null);

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
  };

  const handleTaskDrop = (e, toColumnIndex) => {
    const { task, fromColumnIndex } = draggedTask;

    if (fromColumnIndex === toColumnIndex) return;

    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];

      // Remove the task from the source column
      const fromTasks = updatedColumns[fromColumnIndex].data.filter(
        (item) => item !== task
      );

      // Add the task to the destination column
      const toTasks = updatedColumns[toColumnIndex].data.includes(task)
        ? updatedColumns[toColumnIndex].data
        : [...updatedColumns[toColumnIndex].data, task];

      updatedColumns[fromColumnIndex].data = fromTasks;
      updatedColumns[toColumnIndex].data = toTasks;

      return updatedColumns;
    });

    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
            <div className="border border-gray-200 rounded-3xl p-9 bg-white gap-6 shadow-lg flex w-full overflow-x-scroll">
              {columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className="border border-gray-200 rounded-3xl py-4 px-3 bg-gray-50 shadow-md flex flex-col min-w-[300px] mr-4"
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
                  <h3 className="text-xl font-semibold mb-4 border-b-2 capitalize text-gray-800">
                    {column.type}
                  </h3>
                  {column.data.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="bg-blue-200 p-2 mb-2 rounded-md cursor-pointer hover:bg-blue-300 transition-colors"
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
