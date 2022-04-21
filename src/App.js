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
import makeStyles from "@mui/styles/makeStyles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
  adaptV4Theme,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ColorModeContext from "./context/ColorModeContext";

const messages = {
  en: English,
  fr: French,
};

const ROLES = {
  User: "Viewer",
  Super_Admin: "Super_Admin",
  Approver: "Approver",
  Admin: "Admin",
  Author: "Author",
  Reviever: "Reviewer",
};

function App() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const [language, setLanguage] = React.useState("en");

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: "#0024FF",
            },
            secondary: {
              main: "#101637",
            },
            background: {
              default: "#fcfcfc",
              paper: "#f6f7f8",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#2947ff",
            },
            secondary: {
              main: "#101637",
            },
            background: {
              default: "#242424 !important",
              paper: "#292929",
            },
          }),
    },
    ".MuiButtonBase-root": {
      color: "#fcfcfc",
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
  });

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <LanguageProvider.Provider
      value={{ language: "en", setLanguage: setLanguage }}
    >
      <IntlProvider locale={language} messages={messages[language]}>
        <ColorModeContext.Provider value={colorMode}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
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
                            ROLES.Admin,
                            ROLES.Author,
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
          </StyledEngineProvider>
        </ColorModeContext.Provider>
      </IntlProvider>
    </LanguageProvider.Provider>
  );
}

export default App;
