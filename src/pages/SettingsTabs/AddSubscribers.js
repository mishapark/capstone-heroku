import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "../../components/Input/TextInput";
import { Button } from "@material-ui/core";

function AddSubscribers() {
  const [name, setName] = useState("");

  const methods = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: 400 }}>
        <TextInput
          required={false}
          label="Subscriber Name"
          placeholder="Enter Subscriber Name"
          name="subscriber_name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />

        <Button type="submit" color="primary" variant="contained">
          Add Subscriber
        </Button>
      </form>
    </FormProvider>
  );
}

export default AddSubscribers;
