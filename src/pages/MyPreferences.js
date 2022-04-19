import { Autocomplete } from "@material-ui/lab";
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { PageHeader } from "../components/Header/PageHeader";
import LanguageProvider from "../context/LanguageProvider";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";

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

  const icon = <RoomPreferencesIcon />;

  return (
    <Container maxWidth="xl">
      <Paper square={false}>
        <Grid container style={{ padding: "16px" }}>
          <Grid item container>
            <Grid item xs={12}>
              <PageHeader
                icon={icon}
                title={<FormattedMessage id="myPreferences"></FormattedMessage>}
                description="Choose theme and language"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid
              container
              item
              style={{
                paddingLeft: "16px",
                paddingTop: "16px",
              }}
            >
              <Box sx={{ width: "400px" }}>
                <Stack spacing={2}>
                  <Stack spacing={2}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Theme</FormLabel>
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value="start"
                          control={<Switch color="primary" />}
                          label="Dark Theme"
                          labelPlacement="start"
                        />
                      </FormGroup>
                    </FormControl>
                    <Typography variant="subtitl1">
                      <FormattedMessage id="myPreferences.language"></FormattedMessage>
                    </Typography>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={["English", "French"]}
                      value={language}
                      onInputChange={(e, value) => handleSelect(e, value)}
                      sx={{ width: "300px" }}
                      renderInput={(params) => (
                        <TextField {...params} label="language" />
                      )}
                    />
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default MyPreferences;
