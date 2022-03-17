import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      ["https://humber-capstone-backend.herokuapp.com/users/register"],
      requestOptions
    );
    const jsonData = await response.json();

    console.log(jsonData);
  };
  const navigate = useNavigate();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            axios
              .post(
                "https://humber-capstone-backend.herokuapp.com/users/register",
                data,
                { withCredentials: true }
              )
              .then(function (response) {
                navigate("/app", { replace: true });
              });
          })}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Full name"
            name="userName"
            autoComplete="name"
            {...register("userName", {
              required: true,
            })}
            autoFocus
          />
          <Typography component="h3" variant="overline">
            {errors?.name && <span>Fill in the name</span>}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userEmail"
            label="Email"
            name="userEmail"
            {...register("userEmail", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            autoComplete="email"
          />
          <Typography component="h3" variant="overline">
            {errors?.name && <span>Put the valide email address</span>}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            {...register("password", {
              required: true,
              min: 8,
            })}
            id="password"
            autoComplete="current-password"
          />
          <Typography component="h3" variant="overline">
            {errors?.name && (
              <span>Password should have minimum eight characters</span>
            )}
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#3F50B5" }}
          >
            Sign Up
          </Button>
          <Link to="/signin" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
