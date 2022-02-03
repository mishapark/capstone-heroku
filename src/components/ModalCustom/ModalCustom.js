import React from "react";
import ModalForm from "./ModalForm";
import ModalHeader from "./ModalHeader";
import { Card, Button } from "@material-ui/core";

const style = {
  card: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#f6f7f8",
    height: "calc(100vh - 100px)",
    overflowY: "auto",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    paddingRight: 20,
    backgroundColor: "white",
    position: "absolute",
    width: "100%",
    bottom: 0,
    boxShadow: "rgb(0 0 0 / 50%) 0px -6px 6px -6px",
    zIndex: 10,
  },
};

function ModalCustom({ title, onClose }) {
  return (
    <Card style={style.card}>
      <ModalHeader title={title} onClose={onClose} />
      <form>
        <div style={{ padding: 20 }}>
          <ModalForm title="General Product Information" />
          {/* <ModalForm title="General Product Information" /> */}
        </div>
      </form>
      <div style={style.footer}>
        <Button color="primary" variant="contained">
          Submit
        </Button>
      </div>
    </Card>
  );
}

export default ModalCustom;
