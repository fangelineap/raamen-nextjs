"use client";

import { Box, Button, Dialog, DialogActions, DialogContent, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { minLength, nonEmpty, object, pipe, string } from "valibot";
import type { InferInput } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { IconChevronDown, IconX } from "@tabler/icons-react";
import { red } from "@mui/material/colors";
import Raamen from "../type/Raamen";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const schema = object({
  id: string(),
  name: pipe(
    string(),
    minLength(3, "Name must be at least 3 characters long"),
    nonEmpty("Name must be at least 3 characters long")
  ),
  broth: pipe(string(), nonEmpty("Broth is required")),
  price: pipe(string(), nonEmpty("Price is required")),
  description: pipe(string(), nonEmpty("Description is required")),
});

type FormData = InferInput<typeof schema>;

interface RaamenFormModalProps {
  open: boolean;
  handleClose: () => void;
  type: "add" | "edit";
  data?: Raamen;
  setLoading: (loading: boolean) => void;
  setOpenConfirmationModal: () => void;
  setCloseConfirmationModal: () => void;
  setConfirmationProps: (props: { title: string; content: string; onConfirm: () => void }) => void;
  setType: (type: "add" | "edit") => void;
}

const RaamenFormModal = ({
  open,
  handleClose,
  type,
  data,
  setLoading,
  setOpenConfirmationModal,
  setCloseConfirmationModal,
  setConfirmationProps,
  setType
}: RaamenFormModalProps) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: valibotResolver(schema),
    defaultValues: {
      id: "",
      name: "",
      broth: "",
      price: "",
      description: "",
    }
  });

  const router = useRouter();

  useEffect(() => {
    if (type === "edit" && data) {
      reset({
        id: data.id.toString(),
        name: data.name,
        broth: data.broth,
        price: data.price.toString(),
        description: data.description,
      });
    } else if (type === "add") {
      reset({
        id: "",
        name: "",
        broth: "",
        price: "",
        description: "",
      });
    }
  }, [data, type, reset]);

  const queryClient = useQueryClient();

  const onClose = () => {
    reset();
    handleClose();
  };

  useEffect(() => {
    console.log("initial edit data", data);
  }, [data]);

  const handleSubmitConfirmation = async (data: FormData) => {
    console.log("data", data);

    if(type === "add") {
      const response = await fetch("http://localhost:3001/api/ramen/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          broth: data.broth,
          price: parseInt(data.price),
          description: data.description,
          user_id: 1,
        }),
      });
      console.log("Response received:", response.status, response.statusText);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const ramen = await response.json();
      console.log("ramen", ramen);

      queryClient.invalidateQueries({ queryKey: ["ramen"]});
    } else if(type === "edit") {
      const response = await fetch(`http://localhost:3001/api/ramen/update/${data.id}`, { 
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          broth: data.broth,
          price: parseInt(data.price),
          description: data.description,
        }),
      });
      console.log("Response received:", response.status, response.statusText);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const ramen = await response.json();
      console.log("ramen", ramen);

      queryClient.invalidateQueries({ queryKey: ["ramen"]});
    }

    reset();
    setLoading(false);
    setCloseConfirmationModal();
    setType("add");
    router.push("/raamen");
    handleClose();
  };

  const onSubmit = (data: FormData) => {
    if (type === "add") {
      console.log("hereeee", data);
      setConfirmationProps({
        title: "Add Ramen Confirmation",
        content: "Are you sure you want to add this ramen?",
        onConfirm: () => handleSubmitConfirmation(data),
      });
    } else if (type === "edit") {
      setConfirmationProps({
        title: "Edit Ramen Confirmation",
        content: "Are you sure you want to edit this ramen?",
        onConfirm: () => handleSubmitConfirmation(data),
      });
    }

    setOpenConfirmationModal();
  };

  return (
    <Box className="w-[80vw] bg-white shadow-sm rounded-md">
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown
        PaperProps={{
          style: {
            overflow: "visible",
            marginTop: "0px",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full py-3 px-5">
          <Box className='flex justify-between items-center">'>
            <h1 className="text-violet-950 font-semibold text-2xl">Add Ramen</h1>
            <IconButton onClick={onClose}>
              <IconX size={20} />
            </IconButton>
          </Box>
          {/* Add Form */}
          <DialogContent className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 w-full">
            {/* Ramen Name */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                Ramen Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 grid grid-cols-1">
                    {/* <div className="flex items-center rounded-md"> */}
                    <input
                      {...field}
                      id="name"
                      value={field.value}
                      type="text"
                      placeholder="Name"
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-raamen-secondary ${
                        errors.name ? "outline-red-500" : "outline-gray-300"
                      }`}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                    {/* </div> */}
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                )}
              />
            </div>

            {/* Broth */}
            <div className="sm:col-span-3">
              <label htmlFor="broth" className="block text-sm/6 font-medium text-gray-900">
                Broth
              </label>
              <Controller
                name="broth"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      {...field}
                      id="broth"
                      name="broth"
                      autoComplete="broth-name"
                      defaultValue={data?.broth ?? ""}
                      className={`col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-raamen-secondary sm:text-sm/6 ${
                        errors.broth ? "outline-red-500" : "outline-gray-300"
                      }`}
                    >
                      <option value="" disabled>
                        Select Broth
                      </option>
                      <option>Chicken</option>
                      <option>Pork</option>
                      <option>Miso</option>
                    </select>
                    <IconChevronDown
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                    {errors.broth && <p className="text-sm text-red-500 mt-1">{errors.broth.message}</p>}
                  </div>
                )}
              />
            </div>

            {/* Price */}
            <div className="sm:col-span-full">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                Price
              </label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 grid grid-cols-1">
                    <input
                      {...field}
                      id="price"
                      value={field.value}
                      type="number"
                      placeholder="Price"
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-raamen-secondary ${
                        errors.price ? "outline-red-500" : "outline-gray-300"
                      }`}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                    {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
                  </div>
                )}
              />
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <div className="mt-2">
                    <textarea
                      {...field}
                      id="description"
                      name="description"
                      value={field.value}
                      placeholder="Description"
                      rows={3}
                      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-raamen-secondary sm:text-sm/6 ${
                        errors.description ? "outline-red-500" : "outline-gray-300"
                      }`}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </div>
                )}
              />
              {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
            </div>
          </DialogContent>

          {/* Buttons */}
          <DialogActions className="flex gap-3 w-full justify-end items-center col-span-full">
            <Button sx={{ fontWeight: 600, fontSize: 13, bgcolor: red[400], color: "white" }} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{ fontWeight: 600, fontSize: 13, bgcolor: "oklch(28.3% 0.141 291.089)", color: "white" }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default RaamenFormModal;
