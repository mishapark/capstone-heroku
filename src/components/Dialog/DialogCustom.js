import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogForm from "./DialogForm";
import { getCountries } from "../../api/countries";
import { getStandards } from "../../api/standards";
import useProduct from "../../hooks/useProduct";
import axios from "axios";

function DialogCustom({ title, onClose, editContent, setRequestData }) {
  const [standards, setStandards] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getStandards().then((data) => setStandards(data));
    getCountries().then((data) => setCountries(data));
  }, []);

  const methods = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    const product = useProduct(data);
    console.log(product);

    axios
      .post(
        `https://humber-capstone-backend.herokuapp.com/products/add`,
        product,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setRequestData(new Date())
      });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={true} style={{ backgroundColor: "#f6f7f8" }}>
          <DialogForm
            title="General Product Information"
            standards={standards}
            countries={countries}
            editContent={editContent}
          />
          <DialogForm
            title="Product Technical Information"
            editContent={editContent}
          />
          <DialogForm
            title="Product Environmental Information"
            editContent={editContent}
          />
          <DialogForm
            title="Marking and Documentations"
            editContent={editContent}
          />
          <DialogForm title="Compliance Reports" editContent={editContent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={onClose}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
}

export default DialogCustom;
