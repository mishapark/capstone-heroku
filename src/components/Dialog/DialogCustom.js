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
import { FormattedMessage } from "react-intl";
import useAuth from "../../hooks/useAuth";
import { getComplianceWithToken } from "../../api/compliances";

function DialogCustom({ title, onClose, editContent, setRequestData }) {
  const [standards, setStandards] = useState([]);
  const [countries, setCountries] = useState([]);
  const [compliances, setCompliances] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    getStandards().then((data) => setStandards(data));
    getCountries().then((data) => setCountries(data));
    getComplianceWithToken(auth.accessToken).then((data) =>
      setCompliances(data)
    );
  }, []);

  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
    let product;

    uploadFile(data.marking_plate, data.warning_mark).then((files) => {
      product = useProduct(data, files);
      console.log(product);

      axios
        .post(
          `https://humber-capstone-backend.herokuapp.com/products/add`,
          product,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": auth.accessToken,
            },
          }
        )
        .then(() => {
          setRequestData(new Date());
        });
    });
  };

  const onEdit = (data) => {
    let product;

    uploadFile(data.marking_plate, data.warning_mark).then((files) => {
      product = useProduct(data, files);

      axios
        .put(
          `https://humber-capstone-backend.herokuapp.com/products/update?product_id=${editContent.product_id}`,
          product
        )
        .then(() => {
          setRequestData(new Date());
        });
    });
  };

  const uploadFile = async (markingFiles, warningFiles) => {
    const filesArr = [{ marking_plate: [] }, { warning_mark: [] }];

    for (let i = 0; i < markingFiles.length; i++) {
      const formData = new FormData();
      formData.append("file", markingFiles[i]);
      const res = await axios.post(
        `https://humber-capstone-backend.herokuapp.com/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      filesArr[0].marking_plate.push({
        name: res.data.file.originalname,
        file_location: res.data.file.filename,
      });
    }

    for (let i = 0; i < warningFiles.length; i++) {
      const formData = new FormData();
      formData.append("file", warningFiles[i]);
      const res = await axios.post(
        `https://humber-capstone-backend.herokuapp.com/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      filesArr[1].warning_mark.push({
        name: res.data.file.originalname,
        file_location: res.data.file.filename,
      });
    }

    return filesArr;
  };

  return (
    <FormProvider {...methods}>
      {console.log(compliances)}
      <form
        onSubmit={
          title === "Add Product"
            ? methods.handleSubmit(onSubmit)
            : methods.handleSubmit(onEdit)
        }
      >
        <DialogTitle id="scroll-dialog-title">
          <FormattedMessage id={title} />
        </DialogTitle>
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
          <Button onClick={onClose}>
            <FormattedMessage id={"Cancel"} />
          </Button>
          <Button
            type="submit"
            onClick={onClose}
            color="primary"
            variant="contained"
          >
            <FormattedMessage id={"Submit"} />
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
}

export default DialogCustom;
