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
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
  adaptV4Theme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { CssBaseline } from "@mui/material";
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
  const [user, setUser] = useState(null);
  const [mode, setMode] = React.useState("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [language, setLanguage] = React.useState("en");

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

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
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#0024FF",
            },
            secondary: {
              main: "#101637",
            },
            background: {
              default: "#2e2e2e",
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

  // const darkTheme2 = React.useMemo(
  //   () =>
  //     createTheme(
  //       adaptV4Theme({
  //         typography: {
  //           fontFamily: ["Poppins", "sans-serif"].join(","),
  //         },
  //         palette: {
  //           mode: prefersDarkMode ? "dark" : "light",
  //           primary: {
  //             main: "#0024FF",
  //           },
  //           secondary: {
  //             main: "#101637",
  //           },
  //           background: {
  //             default: "#2e2e2e",
  //           },
  //         },

  //       })
  //     ),
  //   [prefersDarkMode]
  // );

  // const theme = createTheme(
  //   adaptV4Theme({
  //     typography: {
  //       fontFamily: ["Poppins", "sans-serif"].join(","),
  //     },
  //     palette: {
  //       primary: {
  //         main: "#0024FF",
  //       },
  //       secondary: {
  //         main: "#101637",
  //       },
  //       background: {
  //         default: "#fcfcfc",
  //       },
  //     },
  //     ".MuiButtonBase-root": {
  //       color: "#fcfcfc",
  //     },
  //   })
  // );

  return (
    <LanguageProvider.Provider
      value={{ language: "en", setLanguage: setLanguage }}
    >
      <IntlProvider locale={language} messages={messages[language]}>
        <StyledEngineProvider injectFirst>
          <ColorModeContext.Provider value={colorMode}>
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
          </ColorModeContext.Provider>
        </StyledEngineProvider>
      </IntlProvider>
    </LanguageProvider.Provider>
  );
}

export default App;
