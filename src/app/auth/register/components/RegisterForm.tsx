"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { email, InferInput, nonEmpty, object, pipe, regex, string } from "valibot";

const schema = object({
  firstName: pipe(string(), nonEmpty("First name is required")),
  lastName: pipe(string(), nonEmpty("Last name is required")),
  email: pipe(string(), email("Invalid email format"), nonEmpty("Email is required")),
  password: pipe(
    string(),
    nonEmpty("Password is required"),
    regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and contain at least one letter and one number"
    )
  ),
  confirmPassword: pipe(
    string(),
    nonEmpty("Password is required"),
    regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and contain at least one letter and one number"
    )
  ),
});

type FormData = InferInput<typeof schema>;

const RegisterForm = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOnSubmit = async (data: FormData) => {
    console.log("data", data);
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { type: "manual", message: "Passwords do not match" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        alert("Error: " + response.statusText);
        return;
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      reset();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  return (
    <Paper className="p-7 w-[full]" elevation={0}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <h1 className="text-violet-950 font-bold text-2xl">Register</h1>
        <Box className="mt-4 grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-x-8">
          {/* First Name */}
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
              First Name
            </label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <div className="mt-2 grid grid-cols-1">
                  {/* <div className="flex items-center rounded-md"> */}
                  <input
                    {...field}
                    id="firstName"
                    value={field.value}
                    type="text"
                    placeholder="First Name"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-raamen-secondary ${
                      errors.firstName ? "outline-red-500" : "outline-gray-300"
                    }`}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                  {/* </div> */}
                  {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
                </div>
              )}
            />
          </div>

          {/* Last Name */}
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
              Last Name
            </label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <div className="mt-2 grid grid-cols-1">
                  {/* <div className="flex items-center rounded-md"> */}
                  <input
                    {...field}
                    id="lastName"
                    value={field.value}
                    type="text"
                    placeholder="Last Name"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-raamen-secondary ${
                      errors.lastName ? "outline-red-500" : "outline-gray-300"
                    }`}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                  {/* </div> */}
                  {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
                </div>
              )}
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="mt-2 grid grid-cols-1">
                  {/* <div className="flex items-center rounded-md"> */}
                  <input
                    {...field}
                    id="email"
                    value={field.value}
                    type="text"
                    placeholder="Email"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-raamen-secondary ${
                      errors.email ? "outline-red-500" : "outline-gray-300"
                    }`}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                  {/* </div> */}
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                </div>
              )}
            />
          </div>

          {/* Password */}
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="mt-2 grid grid-cols-1">
                  {/* <div className="flex items-center rounded-md"> */}
                  <input
                    {...field}
                    id="password"
                    value={field.value}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-raamen-secondary ${
                      errors.password ? "outline-red-500" : "outline-gray-300"
                    }`}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />

                  {/* <Input
                    {...field}
                    id="password"
                    value={field.value}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-raamen-secondary ${
                      errors.password ? "outline-red-500" : "outline-gray-300"
                    }`}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    endAdornment={
                      showPassword ? (
                        <IconEyeOff
                          size={16}
                          className="text-gray-500 dark:text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <IconEye
                          size={16}
                          className="text-gray-500 dark:text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )
                    }
                  /> */}
                  {/* </div> */}
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                </div>
              )}
            />
          </div>
          {/* Confirm Password */}
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
              Confirm Password
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <div className="mt-2 grid grid-cols-1">
                  {/* <div className="flex items-center rounded-md"> */}
                  <input
                    {...field}
                    id="confirmPassword"
                    value={field.value}
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-raamen-secondary ${
                      errors.confirmPassword ? "outline-red-500" : "outline-gray-300"
                    }`}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        </Box>
        <Box className="mt-7 flex flex-col gap-y-3 justify-center text-center">
          <Button
            type="submit"
            sx={{ fontWeight: 600, fontSize: 15, bgcolor: "oklch(28.3% 0.141 291.089)", color: "white", width: "100%" }}
            endIcon={isLoading && <CircularProgress size={20} sx={{ color: "white" }} className="absolute" />}
          >
            Register
          </Button>
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <a className="text-raamen-secondary" href="/auth/login">
              Click here!
            </a>
          </p>
        </Box>
      </form>
    </Paper>
  );
};

export default RegisterForm;
