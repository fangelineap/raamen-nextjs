"use client";

import { Box, Button, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import DataTable from "./DataTable";
import Raamen from "../type/Raamen";

const RaamenMain = () => {
  const [ramenData, setRamenData] = useState<Raamen[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [customPagination, setCustomPagination] = useState({
    page: 1,
    rowsPerPage: 2,
  });
  const [filteredData, setFilteredData] = useState<Raamen[]>(ramenData);

  useEffect(() => {
    const fetchRamenData = async () => {
      try {
        console.log("Fetching ramen data...");
        try {
          // Make a POST request to an external login API (http://localhost:3001/api/login)
          const response = await fetch("http://localhost:3001/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: "silvermist@gmail.com",
              password: "silvermist",
            }),
          });

          if (!response.ok) {
            throw new Error(`External login API returned an error: ${response.status}`);
          }

          // Parse the JSON response from the external API
          const data = await response.json();

          console.log("Login response data:", data);

          const ramenData = await fetch("http://localhost:3001/api/ramen/all", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
          });

          console.log("Response received:", ramenData.status, ramenData.statusText);

          if (!ramenData.ok) {
            throw new Error(`HTTP error! Status: ${ramenData.status}`);
          }

          const ramens = await ramenData.json();

          setRamenData(ramens.ramens);
        } catch (error) {
          console.error("Error during login:", error);
        }
      } catch (error) {
        console.error("Error fetching ramen data:", error);
      }
    };
    // const interval = setInterval(() => {
    //   fetchRamenData();
    // }, 5000);

    fetchRamenData();

    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  useEffect(() => {
    if (keyword === "") {
      setFilteredData(ramenData);
    } else {
      setFilteredData(ramenData.filter((ramen) => ramen.name.toLowerCase().includes(keyword.toLowerCase())));
    }
  }, [keyword, ramenData]);

  // States for the add ramen modal
  const handleOpenAddRamenModal = () => {
    setOpen(true);
  };
  const handleCloseAddRamenModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="flex justify-between items-center">
        <Typography fontWeight={600} fontSize={20} className="text-violet-950">
          Raamen List
        </Typography>
        <Box className="flex gap-3 items-center">
          <Button
            variant="contained"
            onClick={handleOpenAddRamenModal}
            sx={{ bgcolor: "oklch(28.3% 0.141 291.089)", fontWeight: 600, fontSize: 13 }}
          >
            Add Ramen
          </Button>
          <Box className="px-3 py-1 bg-white border border-slate-200 rounded-md flex justify-between items-center">
            <Input
              placeholder="Search ramen..."
              disableUnderline
              className="text-sm"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <IconSearch size={20} className="text-violet-950 pl-2 size-7" />
          </Box>
        </Box>
      </Box>
      <Box className="my-3">
        <DataTable
          handleOpenAddRamenModal={handleOpenAddRamenModal}
          handleCloseAddRamenModal={handleCloseAddRamenModal}
          open={open}
          data={filteredData}
          customPagination={customPagination}
          setCustomPagination={setCustomPagination}
        />
      </Box>
    </>
  );
};

export default RaamenMain;
