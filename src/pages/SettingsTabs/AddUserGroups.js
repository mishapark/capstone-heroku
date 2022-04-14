import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "../../components/Input/TextInput";
import { Button } from "@material-ui/core";

// api
import { getCompany } from "../../api/companies";

function AddUserGroups() {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");

    const methods = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} style={{ width: 400 }}>
                <TextInput
                    required={false}
                    label="User Group Name"
                    placeholder="Enter User Group Name"
                    name="user_group_name"
                    value={name}
                    handleChange={(e) => setName(e.target.value)}
                />

                <Button type="submit" color="primary" variant="contained">
                    Add User Group
                </Button>
            </form>
        </FormProvider>
    );
}

export default AddUserGroups;
