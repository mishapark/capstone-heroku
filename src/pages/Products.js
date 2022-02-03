import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { Modal } from "@material-ui/core";
import ModalCustom from "../components/ModalCustom/ModalCustom";

function Products() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        color="primary"
        aria-label="Add"
      >
        <AddIcon />
        Add Product
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalCustom title="Add Product" onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}

export default Products;
