import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogForm from "./DialogForm";
import { getCountries } from "../../api/countries";
import { getStandards } from "../../api/standards";

function DialogCustom({ title, onClose }) {
  const [standards, setStandards] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getStandards().then((data) => setStandards(data));
    getCountries().then((data) => setCountries(data));
  }, []);

  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          />
          <DialogForm title="Product Technical Information" />
          <DialogForm title="Product Environmental Information" />
          <DialogForm title="Marking and Documentations" />
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
