'use client'

import { Box } from "@mui/material";
import React from "react";
import RaamenMain from "./components/RaamenMain";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const page = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Box className="w-[90%] py-3">
        <RaamenMain />
      </Box>
    </QueryClientProvider>
  );
};

export default page;
