import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

interface ConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  isLoading?: boolean;
  title?: string;
  content?: string;
}

const ConfirmationModal = ({ open, handleClose, handleSubmit, isLoading, title, content }: ConfirmationModalProps) => {
  return (
    <Box>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown
      >
        <DialogTitle className="pb-4">
          <Typography variant="h5" fontWeight={600} className="text-violet-950">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">{content}</Typography>
        </DialogContent>
        <DialogActions className="dialog-actions-dense pt-0 flex gap-2 w-full justify-end items-center col-span-full">
          <Button
            sx={{ fontWeight: 600, fontSize: 13, bgcolor: red[400], color: "white" }}
            disabled={isLoading}
            color="error"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ fontWeight: 600, fontSize: 13, bgcolor: "oklch(28.3% 0.141 291.089)", color: "white" }}
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress className="text-white" size={16} />}
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConfirmationModal;
