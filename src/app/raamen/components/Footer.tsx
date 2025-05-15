import { Box } from "@mui/material";
import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import React from "react";

const Footer = () => {
  return (
    <Box className="relative h-full bottom-0 bg-violet-950 w-full py-4 row-start-3 flex gap-6 flex-wrap items-center justify-between px-4">
      <Box>
        <h1 className="text-white text-sm">© 2025 Raamen. All rights reserved.</h1>
      </Box>
      <Box className="flex gap-3 items-center">
        <a href="https://instagram.com/fangeline_" target="_blank">
          <IconBrandInstagram size={24} className="text-white" />
        </a>
        <IconBrandFacebook size={24} className="text-white" />
        <IconBrandX size={22} className="text-white" />
      </Box>
    </Box>
  );
};

export default Footer;
