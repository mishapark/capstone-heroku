import React from "react";
import { Toolbar, Typography } from "@mui/material";

function CustomTableToolbar({ title }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        variant="h6"
        id="tableTitle"
        component="div"
        color={"primary"}
      >
        {title}
      </Typography>
    </Toolbar>
  );
}

export default CustomTableToolbar;
