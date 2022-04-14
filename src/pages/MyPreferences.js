import { Autocomplete } from "@material-ui/lab";
import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import LanguageProvider from "../context/LanguageProvider";

function MyPreferences() {
  const [language, setLanguage] = React.useState(
    localStorage.getItem("language")
  );

  const languag = React.useContext(LanguageProvider);

  const handleSelect = (event, value) => {
    localStorage.setItem("language", value);
    setLanguage(value);
    if (value == "English") {
      languag.setLanguage("en");
    } else {
      languag.setLanguage("fr");
    }
  };

  return (
    <Box sx={{ maxWidth: "400px" }}>
      <Stack spacing={2}>
        <Typography variant="h5">
          <FormattedMessage id="myPreferences"></FormattedMessage>
        </Typography>

        <Stack spacing={2}>
          <Typography variant="subtitl1">
            <FormattedMessage id="myPreferences.language"></FormattedMessage>
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["English", "French"]}
            value={language}
            onInputChange={(e, value) => handleSelect(e, value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="language" />}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default MyPreferences;
