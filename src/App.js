import React, { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import "./index.css";
import SignIn from "./pages/Signin";
import { AuthContext } from "./context/AuthProvider";
import Home from "./pages/Home";
import { Missing } from "./pages/Missing";
import Layout from "./containers/Layout";
import { useState, useContext } from "react";
import Signup from "./pages/Signup";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequiredAuth";
import Forgot from "./pages/Forgot";
import Unauthorized from "./components/Unauthorized";
import { addLocaleData } from "react-intl";
import { IntlProvider } from "react-intl";
import French from "./languages/fr-CA.json";
import English from "./languages/en-US.json";
import LanguageProvider from "./context/LanguageProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const messages = {
  en: English,
  fr: French,
};

const ROLES = {
  User: "Viewer",
  Super_Admin: "Super_Admin",
  Approver: "Approver",
};

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [language, setLanguage] = React.useState("en");

  const theme = createTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    palette: {
      primary: {
        main: "#0024FF",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
  });

  return (
    <LanguageProvider.Provider
      value={{ language: "en", setLanguage: setLanguage }}
    >
      <IntlProvider locale={language} messages={messages[language]}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* public routes */}
              <Route path="/" element={<Home />} />
              <Route path="unathorized" element={<Unauthorized />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot" element={<Forgot />} />
              {/* we want to protect these routes */}
              <Route element={<PersistLogin />}>
                <Route
                  element={
                    <RequireAuth
                      allowedRoles={[
                        ROLES.User,
                        ROLES.Super_Admin,
                        ROLES.Approver,
                      ]}
                    />
                  }
                >
                  <Route path="/*" element={<Dashboard />} />
                </Route>
              </Route>

              {/* catch all */}
              <Route path="*" element={<Missing />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </IntlProvider>
    </LanguageProvider.Provider>
  );
}

export default App;
