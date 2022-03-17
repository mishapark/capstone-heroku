import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "../../components/Input/TextInput";
import { Button } from "@material-ui/core";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleConfirmChange = (event) => {
    setName(event.target.value);
  };

  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          required={false}
          label="New Password"
          placeholder="Enter New Password"
          name="new_password"
        />
        <TextInput
          required={false}
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirm_password"
          // value={confirm}
          handleChange={handleConfirmChange}
        />
        <Button type="submit" color="primary" variant="contained">
          Change Password
        </Button>
      </form>
    </FormProvider>
  );
}

export default ResetPassword;
