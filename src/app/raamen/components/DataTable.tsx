"use client";

import { Box } from "@mui/material";
import { IconChevronLeft, IconChevronRight, IconDotsVertical, IconEdit, IconTrashFilled } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import ConfirmationModal from "./ConfirmationModal";
import RaamenFormModal from "./RaamenFormModal";
import Raamen from "../type/Raamen";

interface DataTableProps {
  handleOpenAddRamenModal: () => void;
  handleCloseAddRamenModal: () => void;
  open: boolean;
  data: Raamen[];
  customPagination: {
    page: number;
    rowsPerPage: number;
  };
  setCustomPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      rowsPerPage: number;
    }>
  >;
}

const DataTable = ({
  handleOpenAddRamenModal,
  open,
  handleCloseAddRamenModal,
  data,
  customPagination,
  setCustomPagination,
}: DataTableProps) => {
  const [confirmationProps, setConfirmationProps] = useState({
    title: "",
    content: "",
    onConfirm: () => {},
  });
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [singleData, setSingleData] = useState<Raamen>({
    id: 0,
    name: "",
    description: "",
    broth: "",
    price: 0,
    user_id: 0,
    User: {
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });
  const [type, setType] = useState<"add" | "edit">("add");

  useEffect(() => {
    console.log("Data changed:", data);
    setCustomPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [data, setCustomPagination]);

  const handlePageChange = (pageNumber: number) => {
    setCustomPagination((prev) => ({
      ...prev,
      page: pageNumber,
    }));
  };

  const setOpenConfirmationModal = () => {
    setOpenConfirmation(true);
  };

  const setCloseConfirmationModal = () => {
    setOpenConfirmation(false);
  };

  const handleEditFormRamen = (id: string) => {
    getIndividualRamen(id);
    console.log("Edit ramen with ID:", id);
    setType("edit");
    setSingleData(getIndividualRamen(id) as Raamen);
    handleOpenAddRamenModal();
  };

  const getIndividualRamen = (id: string) => {
    return data.find((item) => item.id === parseInt(id));
  };

  const handleDeleteRamen = (id: string) => {
    console.log("Delete ramen with ID:", id);

    setConfirmationProps({
      title: "Delete Ramen",
      content: "Are you sure you want to delete this ramen?",
      onConfirm: () => {
        setLoading(true);

        const deleteRamen = async () => {
          try {
            const response = await fetch(`http://localhost:3001/api/ramen/delete/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              credentials: "include",
            });

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          } catch {
            throw new Error("Error deleting ramen");
          }
        };

        deleteRamen();
        setLoading(false);
        setCloseConfirmationModal();
      },
    });
    setOpenConfirmationModal();
  };

  const getOptions = (id: string) => [
    {
      name: "Edit",
      icon: <IconEdit size={16} className="text-gray-500 dark:text-gray-400" />,
      handleClick: () => handleEditFormRamen(id),
    },
    {
      name: "Delete",
      icon: <IconTrashFilled size={16} className="text-red-500 dark:text-red-400" />,
      handleClick: () => handleDeleteRamen(id),
    },
  ];

  return (
    // Table Content
    <Box className="relative overflow-x-auto w-full shadow-md sm:rounded-lg border border-slate-200">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-violet-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Broth
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data
              .slice(
                (customPagination.page - 1) * customPagination.rowsPerPage,
                customPagination.page * customPagination.rowsPerPage
              )
              .map((item) => (
                <tr key={item.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.broth}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">
                    <ActionButton
                      icon={<IconDotsVertical size={16} className="text-gray-500 dark:text-gray-400" />}
                      options={getOptions(item.id.toString())}
                    />
                  </td>
                </tr>
              ))
          ) : (
            <tr key="no data">
              <td colSpan={12} className="text-center py-4 col-span-full">
                No ramen found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Box className="flex items-center justify-between border-t text-white uppercase bg-violet-50 px-4 py-3 sm:px-6">
        <Box className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-white hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-white hover:bg-gray-50"
          >
            Next
          </a>
        </Box>
        <Box className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <Box>
            <p className="text-sm text-gray-400">
              Page <span className="font-medium">{customPagination.page}</span> Showing{" "}
              <span className="font-medium">
                {customPagination.page == 1 ? 1 : (customPagination.page - 1) * customPagination.rowsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {data.length > customPagination.page * customPagination.rowsPerPage
                  ? customPagination.page * customPagination.rowsPerPage
                  : data.length}
              </span>{" "}
              of <span className="font-medium">{data.length}</span> results
            </p>
          </Box>
          <Box>
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
              <a
                className={`${
                  customPagination.page == 1 ? "disabled" : " hover:bg-gray-50"
                } relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (customPagination.page > 1) handlePageChange(customPagination.page - 1);
                }}
              >
                <span className="sr-only">Previous</span>
                <IconChevronLeft aria-hidden="true" className="size-5" />
              </a>
              {Array.from({ length: Math.ceil(data.length / customPagination.rowsPerPage) }).map((_, index) => {
                if (index < 3) {
                  return (
                    <a
                      key={index}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        index + 1 === customPagination.page
                          ? "bg-violet-400 text-white"
                          : "text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                      } focus:z-20 focus:outline-offset-0`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePageChange(index + 1);
                      }}
                    >
                      {index + 1}
                    </a>
                  );
                }
              })}

              {Math.ceil(data.length / customPagination.rowsPerPage) > 3 && (
                <span
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    customPagination.page > 3
                      ? "bg-violet-400 text-white"
                      : "text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                  } focus:z-20 focus:outline-offset-0`}
                >
                  ...
                </span>
              )}
              <a
                className={`${
                  customPagination.page == Math.ceil(data.length / customPagination.rowsPerPage)
                    ? "disabled"
                    : " hover:bg-gray-50"
                } relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (customPagination.page < Math.ceil(data.length / customPagination.rowsPerPage))
                    handlePageChange(customPagination.page + 1);
                }}
              >
                <span className="sr-only">Next</span>
                <IconChevronRight aria-hidden="true" className="size-5" />
              </a>
            </nav>
          </Box>
        </Box>
      </Box>

      {/* Form Modal */}
      <RaamenFormModal
        open={open}
        handleClose={handleCloseAddRamenModal}
        type={type}
        data={singleData}
        setLoading={setLoading}
        setOpenConfirmationModal={setOpenConfirmationModal}
        setCloseConfirmationModal={setCloseConfirmationModal}
        setConfirmationProps={setConfirmationProps}
        setType={setType}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={openConfirmation}
        handleClose={setCloseConfirmationModal}
        handleSubmit={confirmationProps.onConfirm}
        title={confirmationProps.title}
        content={confirmationProps.content}
        isLoading={loading}
      />
    </Box>
  );
};

export default DataTable;
