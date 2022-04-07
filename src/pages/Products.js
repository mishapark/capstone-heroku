import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Dialog } from "@material-ui/core";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import DialogCustom from "../components/Dialog/DialogCustom";
import CustomTable from "../components/CustomTable/CustomTable";
import { FormattedMessage } from "react-intl";

function Products() {
  const [open, setOpen] = React.useState(false);
  const [requestData, setRequestData] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const sendGetRequest = () => {
    axios
      .get("https://humber-capstone-backend.herokuapp.com/products")
      .then((response) => {
        setTableData(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    sendGetRequest();
  }, [requestData]);

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
          <FormattedMessage id="products.add"></FormattedMessage>
        </Button>
      </Card>

      {!isLoading ? (
        <Card>
          <CustomTable tableData={tableData} setRequestData={setRequestData} />
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
          setRequestData={setRequestData}
        />
      </Dialog>
    </div>
  );
}

export default Products;
