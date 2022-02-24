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

function DialogCustom({ title, onClose, editContent }) {
  const [standards, setStandards] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getStandards().then((data) => setStandards(data));
    getCountries().then((data) => setCountries(data));
  }, []);

  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("file", data.marking_plate[0]);

    const product = useProduct(data);
    console.log(product);

    axios
      .post(
        `https://humber-capstone-backend.herokuapp.com/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        product.marking_and_doc.marking_plate.push({
          // name: res.data.file.originalname,
          // file_location: "files/" + res.data.file.filename,
        });
        // product.marking_and_doc.warning_mark.push({
        //   name: res.data.file.originalname,
        //   file_location: "files/" + res.data.file.filename,
        // });

        console.log(product);
        // axios
        //   .post(`http://localhost:5000/products/add`, product)
        //   .then((result) => {
        //     console.log(result);
        //   });
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
