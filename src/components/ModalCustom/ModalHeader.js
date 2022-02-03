import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

const styles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 10,
  paddingLeft: 20,
  backgroundColor: "white",
  boxShadow: "rgb(0 0 0 / 50%)  0 6px 6px -6px",
  position: "sticky",
  top: 0,
  width: "100%",
  zIndex: 10,
};

function ModalHeader({ title, onClose }) {
  return (
    <div style={styles}>
      <h1>{title}</h1>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}

export default ModalHeader;
