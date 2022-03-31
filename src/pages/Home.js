import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function Home() {
  const { auth } = useAuth();
  return (
    <Container>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://unsplash.com/photos/doplSDELX7E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8ZG9jdW1lbnRzfGVufDB8fHx8MTY0ODA0MTAwNg&force=true&w=1920)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome to The Daily Compliance
            </Typography>
            <br></br>
            <Stack component="form" noValidate sx={{ mt: 1 }} spacing={3}>
              <Button variant="contained">
                <Link to="/signin">Login</Link>
              </Button>
              <Button variant="contained">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
