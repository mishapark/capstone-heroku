import React, {useMemo} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import "./index.css";
import SignIn from "./pages/Signin";
import { AuthContext } from "./context/AuthProvider";
import Home from "./pages/Home";
import { Missing } from "./pages/Missing";
import Layout from "./containers/Layout";
import {useState, useContext} from "react"
import Signup from "./pages/Signup";
import RequireAuth from "./components/RequiredAuth";
import Forgot from "./pages/Forgot";

const ROLES = {
  'User': 'Viewer',
  'Editor': 1984,
  'Admin': 5150
}


function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot" element={<Forgot />} />

         {/* we want to protect these routes */}
         <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="app/*" element={<Dashboard />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
