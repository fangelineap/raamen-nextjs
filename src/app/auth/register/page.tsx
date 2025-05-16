import React from "react";
import { Box } from "@mui/material";
import RegisterForm from "./components/RegisterForm";

const page = () => {
  return (
    <Box className="md:min-w-[40%] sm:min-w-[80%] max-w-[90%]">
      <RegisterForm />
    </Box>
  );
};

export default page;