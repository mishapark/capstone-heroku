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
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Paper } from "@mui/material";
function ResetPassword() {
  const [email, setEmail] = React.useState({
    userEmail: "",
  });

  const handleSubmit = async (e) => {
    // store the states in the form data
    e.preventDefault();
    localStorage.setItem("userEmail", email.userEmail);
    try {
      // make axios post request
      const response = await axios({
        method: "put",
        url: `https://humber-capstone-backend.herokuapp.com/users/forgetPassword`,
        data: email,
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      }).then((response) => {
        if (
          (response.data.message =
            "update the user successfully, please redirect to the reset router")
        ) {
          setIsReady(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeValue = (event) => {
    setEmail({ ...email, [event.target.name]: event.target.value });
    console.log(email);
  };

  const [isReady, setIsReady] = React.useState(false);

  const navigate = useNavigate();
  const handleReset = async (e) => {
    // store the states in the form data
    e.preventDefault();
    if (handleSame) {
      try {
        // make axios post request
        const response = await axios({
          method: "put",
          url: `https://humber-capstone-backend.herokuapp.com/users/resetPassword`,
          data: email,
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }).then((response) => {
          if ((response.data.message = "Your password has been changed!")) {
            navigate("/signin");
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("error, not the same");
    }
  };

  const [same, setSame] = React.useState(false);

  const handleSame = (e) => {
    if (e.target.value === email.newPass) {
      setSame(true);
    }
  };

  const auth = useAuth();
  return (
    <Container component="main" maxWidth="lg">
      <Paper>
        <CssBaseline />
        <br></br>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          <Typography component="subtitle1" align="center" sx={{ mt: 2 }}>
            Please, confirm your email address
          </Typography>
          {!isReady ? (
            <Box
              component="form"
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={handleChangeValue}
                value={auth.user}
                name="userEmail"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#3F50B5" }}
              >
                Reset
              </Button>
            </Box>
          ) : (
            <Box
              component="form"
              sx={{ mt: 1 }}
              onSubmit={handleReset}
              autoComplete="off"
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                autoComplete="off"
                onChange={handleChangeValue}
                name="newPass"
                inputProps={{
                  autocomplete: "new-password",
                  form: {
                    autocomplete: "off",
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="New Password"
                autoComplete="off"
                onChange={handleChangeValue}
                name="newPass"
                inputProps={{
                  autocomplete: "new-password",
                  form: {
                    autocomplete: "off",
                  },
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Repeat password"
                onChange={handleSame}
                name="newPass2"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#3F50B5" }}
              >
                Reset
              </Button>
            </Box>
          )}
        </Box>
        <br></br>
      </Paper>
    </Container>
  );
}

export default ResetPassword;
