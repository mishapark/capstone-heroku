import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

export default function AlertDash({ open, setOpen }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              size="small"
              color="warning"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Products are about to expire
        </Alert>
      </Collapse>
    </Box>
  );
}
