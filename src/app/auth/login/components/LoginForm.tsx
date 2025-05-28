"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { email, InferInput, nonEmpty, object, pipe, string } from "valibot";

const schema = object({
  email: pipe(string(), email("Invalid email format"), nonEmpty("Email is required")),
  password: pipe(string(), nonEmpty("Password is required")),
});

type FormData = InferInput<typeof schema>;

const LoginForm = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleOnSubmit = async (data: FormData) => {
    console.log("data", data);
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        alert("Error: " + response.statusText);
        return;
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      reset();
      router.push("/raamen");
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  return (
    <Paper className="p-7 w-[full]" elevation={0}>
      <form data-testid="login-form" onSubmit={handleSubmit(handleOnSubmit)}>
        <h1 className="text-violet-950 font-bold text-2xl">Login</h1>
        <Box className="mt-4 grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-x-8">
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
        </Box>
        <Box className="mt-7 flex flex-col gap-y-3 justify-center text-center">
          <Button
            type="submit"
            sx={{ fontWeight: 600, fontSize: 15, bgcolor: "oklch(28.3% 0.141 291.089)", color: "white", width: "100%" }}
            endIcon={isLoading && <CircularProgress size={20} sx={{ color: "white" }} className="absolute" />}
          >
            Login
          </Button>
          <p className="text-sm text-slate-600">
            Have not registered yet?{" "}
            <a className="text-raamen-secondary" href="/auth/login">
              Click here!
            </a>
          </p>
        </Box>
      </form>
    </Paper>
  );
};

export default LoginForm;
