import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toolbar, Typography, Tooltip } from "@mui/material";
import { Button, Dialog } from "@mui/material";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import DialogCustom from "../components/Dialog/DialogCustom";
import CustomTable from "../components/CustomTable/CustomTable";
import { FormattedMessage } from "react-intl";
import useAuth from "../hooks/useAuth";

function Products() {
  const [open, setOpen] = React.useState(false);
  const [requestData, setRequestData] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const { auth, setAuth } = useAuth();

  const sendGetRequest = () => {
    axios
      .get("https://humber-capstone-backend.herokuapp.com/products", {
        headers: { "x-auth-token": auth.accessToken },
      })
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
    <>
      {!isLoading ? (
        <Card>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div" sx={{ flex: "1 1 100%" }}>
              <FormattedMessage id={"Products"}></FormattedMessage>
            </Typography>
            <Tooltip title="Add Product">
              <Button onClick={() => setOpen(true)} variant="contained">
                <AddIcon />
                <FormattedMessage id={"Create"} />
              </Button>
            </Tooltip>
          </Toolbar>
          <CustomTable tableData={tableData} setRequestData={setRequestData} />
        </Card>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={80} />
        </div>
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
    </>
  );
}

export default Products;
