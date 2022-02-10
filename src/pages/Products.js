import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogCustom from "../components/Dialog/DialogCustom";
import Compliance from "./Compliance";

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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogCustom
          title="Add Product"
          content="addProduct"
          onClose={() => setOpen(false)}
        />
      </Dialog>
    </div>
  );
}

export default Products;
