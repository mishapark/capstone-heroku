import React from "react";
import "./index.css";
import Navbar from "./components/navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import * as ROUTES from "./constant/routes";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Compliance from "./pages/Compliance";
import Analytics from "./pages/Analytics";
import CE from "./pages/CE";
import FDA from "./pages/FDA";
import BIS from "./pages/BIS";

import Login from "./pages/Login";
import SignUp from "./pages/Signup";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />
        <Route path={ROUTES.COMPLIANCE} element={<Compliance />} />
        <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
        <Route path={ROUTES.CE} element={<CE />} />
        <Route path={ROUTES.FDA} element={<FDA />} />
        <Route path={ROUTES.BIS} element={<BIS />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
