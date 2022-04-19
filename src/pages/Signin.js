import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Alert } from "@material-ui/lab";

export default function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { setAuth, persist, setPersist } = useAuth();

  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const [error, setError] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "550px",
          p: 5,
          border: "1px black solid",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error ? (
          <Alert severity="error">Incorrect email or password</Alert>
        ) : (
          <></>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            const user = data["userEmail"];
            axios
              .post(
                "https://humber-capstone-backend.herokuapp.com/users/login",
                data,
                {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                }
              )
              .then(function (response) {
                if (response["status"] === 200) {
                  console.log(response);
                  const accessToken = response["data"]["accessToken"];
                  const roles = response["data"]["role"];
                  const companyId = response["data"]["companyId"];
                  const docusignClientId = response["data"]["docusignClientId"];
                  const userId = response["data"]["userId"];
                  localStorage.setItem("role", roles);
                  localStorage.setItem("user", user);
                  localStorage.setItem("userId", userId);
                  localStorage.setItem("companyId", companyId);
                  localStorage.setItem("docusignClientId", docusignClientId);
                  setAuth({ user, roles, companyId, docusignClientId, userId, accessToken });
                  navigate("../dash", { replace: true });
                } else {
                  console.log(response.error);
                }
              })
              .catch(() => setError(true));
          })}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setUser(e.target.value)}
            {...register("userEmail", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            {...register("password", {
              required: true,
              min: 8,
            })}
            autoComplete="current-password"
          />
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist"> Trust This Device</label>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link to="/forgot">Forgot password?</Link>
          <br />
          <Link to="/signup">Sign up</Link>
        </Box>
      </Box>
    </Container>
  );
}
