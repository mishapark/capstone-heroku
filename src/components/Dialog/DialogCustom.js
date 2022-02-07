import React from "react";
import { Button } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogForm from "./DialogForm";

function DialogCustom({ title, content, onClose }) {
  const renderContent = () => {
    switch (content) {
      case "addProduct":
        return (
          <>
            <DialogForm title="General Product Information" />
            <DialogForm title="Product Technical Information" />
            <DialogForm title="Product Environmental Information" />
            <DialogForm title="Marking and Documentations" />
          </>
        );
      default:
        break;
    }
  };
  return (
    <>
      <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
      <DialogContent dividers="true" style={{ backgroundColor: "#f6f7f8" }}>
        {renderContent()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </>
  );
}

export default DialogCustom;
