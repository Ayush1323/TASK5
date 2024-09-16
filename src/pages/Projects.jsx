import React, { useState } from "react";
import { Pagination, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import StarIcon from "@mui/icons-material/Star";
import { PER_PAGE_OPTIONS } from "../utils/constant";

const Projects = () => {
  const initialProjects = [
    { id: 1, name: "CheckMyGuest | Hire", created: "1 year ago", tag: "#CHEH",color:"red-200" },
    { id: 2, name: "Passio | Hire", created: "2 years ago", tag: "#PASS",color:"blue-200" },
    { id: 3, name: "Retrun | Hire", created: "1 month ago", tag: "#RETI",color:"green-200" },
    {
      id: 4,
      name: "Navatech (Neom) | Hire",
      created: "1 year ago",
      tag: "#NEOM",
      color:"yellow-200"
    },
    { id: 5, name: "Karlos | Fix", created: "2 months ago", tag: "#KARL",color:"indigo-200" },
    {
      id: 6,
      name: "Test Aryan | Bucket",
      created: "3 months ago",
      tag: "#TESB",
      color:"purple-200"
    },
    {
      id: 7,
      name: "Dedicated UI/UX Designer",
      created: "7 months ago",
      tag: "#DEDR",
      color:"pink-200"
    },
    {
      id: 8,
      name: "CollabCRM | Inhouse",
      created: "9 months ago",
      tag: "#COLLAB",
      color:"teal-200"
    }, 
  ];


  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [projects, setProjects] = useState(initialProjects);
  const [selectedTab, setSelectedTab] = useState("1"); // Track selected tab by value

  const handleRating = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? { ...project, isFavorite: !project.isFavorite }
          : project
      )
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset page number to 1 when rows per page changes
  };

  const paginatedProjects = projects.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };


  return (
    <div className="w-11/12 my-4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {/* MUI Tabs */}
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="project tabs">
            <Tab
              label={`Your Projects (${initialProjects.length})`}
              value="1"
            />
            <Tab label="Favorite Projects (0)" value="2" />
            <Tab label="Daily Allocation (0)" value="3" />
          </TabList>
        </Box>

        {/* Tab Panels */}
        <TabPanel value="1" sx={{ p: 0 }}>
          {paginatedProjects.map((project) => (
            <div
              className="flex items-center justify-between p-4 border-b"
              key={project.id}
            >
              <div className="flex items-center">
                <div
                  className={`text-xl font-bold w-12 h-12 flex justify-center items-center rounded-md bg-${project.color}`}
                >
                  {project.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="flex justify-center items-center gap-2">
                    <h3 className="text-lg font-semibold hover:underline cursor-pointer">
                      {project.name}
                    </h3>
                    <div>
                      <StarIcon
                        className={`cursor-pointer ${
                          project.isFavorite
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleRating(project.id)}
                      />
                    </div>
                  </div>
                  <p className="text-gray-500">{project.tag}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Created {project.created}
              </div>
            </div>
          ))}
        </TabPanel>

        <TabPanel value="2">On Working...</TabPanel>
        <TabPanel value="3">Coming Soon...</TabPanel>
      </TabContext>

      {/* Pagination and Rows per Page */}
      <div className="flex justify-between items-center mt-3">
        <div>
          <label htmlFor="rowsPerPage" className="mr-2 text-gray-700">
            Per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="border p-2 rounded cursor-pointer"
          >
            {PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Pagination
            count={Math.ceil(projects.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
