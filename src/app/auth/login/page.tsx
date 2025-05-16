import React from "react";
import { Box } from "@mui/material";
import LoginForm from "./components/LoginForm";

const page = () => {
  return (
    <Box className="md:min-w-[40%] sm:min-w-[80%] max-w-[90%]">
      <LoginForm />
    </Box>
  );
};

export default page;
