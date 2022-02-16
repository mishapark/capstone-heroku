import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import "./index.css";
import SignIn from "./pages/Signin";
import { AuthContext } from "./context/AuthContext";

import {useState, useContext} from "react"

function App() {
  const authContext = useContext(AuthContext);

  return (
    <AuthContext.Provider>
    <Router>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  </AuthContext.Provider>

  );
}

export default App;
