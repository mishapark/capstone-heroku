import React, { useState, useEffect } from "react";
import { Button, Dialog } from "@material-ui/core";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import DialogCustom from "../components/Dialog/DialogCustom";
import CustomTable from "../components/CustomTable/CustomTable";

function Products() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("http://humber-capstone-backend.herokuapp.com/products")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Card
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
          aria-label="Add"
        >
          <AddIcon />
          Add Product
        </Button>
      </Card>

      {!isLoading ? (
        <Card>
          <CustomTable tableData={tableData} />
        </Card>
      ) : (
        <CircularProgress />
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="xl"
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
