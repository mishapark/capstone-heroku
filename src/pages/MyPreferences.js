import { Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function MyPreferences() {
  const [language, setLanguage] = React.useState('English');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };
  return (
    <Box sx={{maxWidth:"800px"}}>
      <Stack spacing={2}>
      <Typography variant="h5">My Preferences</Typography>
      <Stack spacing={2}>
        <Typography variant="subtitl1">Timezone</Typography>
        <TextField></TextField>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="subtitl1">Language</Typography>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            onChange={handleChange}
          >
            <MenuItem value={10}>English</MenuItem>
            <MenuItem value={20}>French</MenuItem>
          </Select>
        </FormControl>
    </Box>
      
      </Stack>
      </Stack>
    </Box>
  );
}

export default MyPreferences;
