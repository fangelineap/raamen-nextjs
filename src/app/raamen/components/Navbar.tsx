'use client'

import { Box } from "@mui/material";
import { IconLogout, IconSoupFilled, IconUserCircle } from "@tabler/icons-react";
import React from "react";
import ActionButton from "./ActionButton";

const Navbar = () => {
  const options = [
    {
      name: "Logout",
      icon: <IconLogout size={16} className="text-red-500 dark:text-red-400" />,
      handleClick: () => {
        // Handle logout action here
      },
    },
  ];

  return (
    <Box className="sticky h-full py-5 top-0 w-full z-1000 bg-white text-black flex justify-between items-center px-4 shadow-sm">
      <Box className="flex justify-center items-center gap-2 text-violet-950">
        <IconSoupFilled size={30} className="text-violet-950" />
        <h1 className="text-xl font-semibold">Raamen</h1>
      </Box>
      <Box className="flex relative right-0 justify-end items-center">
        <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-gray-400 text-md text-gray-300 font-bold">Hi, <span className="text-violet-300">Username</span>!</h1>
        <ActionButton icon={<IconUserCircle size={28} className="text-violet-950" />} options={options} />
      </Box>
    </Box>
  );
};

export default Navbar;
