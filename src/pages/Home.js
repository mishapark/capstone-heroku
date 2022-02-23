import { Button, Container } from "@mui/material";
import React from "react";
import useAuth from "../hooks/useAuth";
import {Link} from 'react-router-dom'

function Home() {
  const { auth } = useAuth();
  return <Container maxWidth="lg" sx={{mt:10}}>
  <div>
    Welcome to the Capstone Project
  </div>
    <Button >
    <Link to="/signin">
    Login
    </Link>
    </Button>
    <Button>
    <Link to="/signup">
    Sign Up
    </Link>
    </Button>
  </Container>;
}

export default Home;
