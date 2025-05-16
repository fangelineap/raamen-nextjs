import { Box } from "@mui/material";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="w-full flex items-center justify-center h-screen bg-raamen-light py-3">
        {children}
    </Box>
  );
};

export default layout;
