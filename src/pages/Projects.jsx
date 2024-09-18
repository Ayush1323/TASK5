import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import StarIcon from "@mui/icons-material/Star";
import { PER_PAGE_OPTIONS } from "../utils/constant";
import CommonPagination from "../common/Pagination";
import { Link } from "react-router-dom";

const Projects = () => {
  const initialProjects = [
    {
      id: 1,
      name: "CheckMyGuest | Hire",
      created: "1 year ago",
      tag: "#CHEH",
      color: "bg-red-200",
    },
    {
      id: 2,
      name: "Passio | Hire",
      created: "2 years ago",
      tag: "#PASS",
      color: "bg-blue-200",
    },
    {
      id: 3,
      name: "Retrun | Hire",
      created: "1 month ago",
      tag: "#RETI",
      color: "bg-green-200",
    },
    {
      id: 4,
      name: "Navatech (Neom) | Hire",
      created: "1 year ago",
      tag: "#NEOM",
      color: "bg-yellow-200",
    },
    {
      id: 5,
      name: "Karlos | Fix",
      created: "2 months ago",
      tag: "#KARL",
      color: "bg-indigo-200",
    },
    {
      id: 6,
      name: "Test Aryan | Bucket",
      created: "3 months ago",
      tag: "#TESB",
      color: "bg-purple-200",
    },
    {
      id: 7,
      name: "Dedicated UI/UX Designer",
      created: "7 months ago",
      tag: "#DEDR",
      color: "bg-pink-200",
    },
    {
      id: 8,
      name: "CollabCRM | Inhouse",
      created: "9 months ago",
      tag: "#COLLAB",
      color: "bg-teal-200",
    },
  ];

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [projects, setProjects] = useState(initialProjects);
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [selectedTab, setSelectedTab] = useState("1");

  const handleRating = (id) => {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) =>
        project.id === id
          ? { ...project, isFavorite: !project.isFavorite }
          : project
      );
      // Update favorite projects
      const favorites = updatedProjects.filter((project) => project.isFavorite);
      setFavoriteProjects(favorites);
      return updatedProjects;
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const paginatedProjects = projects.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const paginatedFavoriteProjects = favoriteProjects.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="w-11/12 my-4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="project tabs">
            <Tab label={`Your Projects (${projects.length})`} value="1" />
            <Tab
              label={`Favorite Projects (${favoriteProjects.length})`}
              value="2"
            />
            <Tab label="Daily Allocation (0)" value="3" />
          </TabList>
        </Box>

        {/* Tab for All Projects */}
        <TabPanel value="1" sx={{ p: 0 }}>
          {paginatedProjects.map((project) => (
            <div
              className="flex items-center justify-between p-4 border-b"
              key={project.id}
            >
              <div className="flex items-center">
                <div
                  className={`text-xl font-bold w-12 h-12 flex justify-center items-center rounded-md ${project.color}`}
                >
                  {project.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="flex justify-center items-center gap-2">
                    <Link to={`/CurrentProject/${project.name}`}>
                      <h3 className="text-lg font-semibold hover:underline cursor-pointer">
                        {project.name}
                      </h3>
                    </Link>
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

        {/* Tab for Favorite Projects */}
        <TabPanel value="2" sx={{ p: 0 }}>
          {paginatedFavoriteProjects.length > 0 ? (
            paginatedFavoriteProjects.map((project) => (
              <div
                className="flex items-center justify-between p-4 border-b"
                key={project.id}
              >
                <div className="flex items-center">
                  <div
                    className={`text-xl font-bold w-12 h-12 flex justify-center items-center rounded-md ${project.color}`}
                  >
                    {project.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="flex justify-center items-center gap-2">
                      <Link to={`/CurrentProject/${project.name}`}>
                        <h3 className="text-lg font-semibold hover:underline cursor-pointer">
                          {project.name}
                        </h3>
                      </Link>
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
            ))
          ) : (
            <p className="p-9 text-center">No favorite projects yet.</p>
          )}
        </TabPanel>

        <TabPanel value="3" className="p-9 text-center">
          Daily Allocation content goes here.
        </TabPanel>
      </TabContext>

      {/* Use the CommonPagination component */}
      <CommonPagination
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={
          selectedTab === "1" ? projects.length : favoriteProjects.length
        }
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        perPageOptions={PER_PAGE_OPTIONS}
      />
    </div>
  );
};

export default Projects;
