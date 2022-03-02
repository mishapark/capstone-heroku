import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

function SettingsCard({ title, color, icon, menuOptions, optionsColor, info }) {
  return (
    <Card
      sx={{
        padding: 1,
        background: color,
        flex: "1 0 160px",
        margin: "10px",
        minWidth: "fit-content",
        maxWidth: "fit-content",
      }}
    >
      <CardContent sx={{ display: "flex", color: "white" }}>
        {icon}
        <h1 style={{ marginLeft: 10 }}>{title}</h1>
      </CardContent>
      <CardActions>
        <div style={{ color: "white" }}>
          {info === "Assigned access" ? (
            <span>
              {info}: <Chip label="Regular" style={{ color: "white" }} />
            </span>
          ) : null}
          {info === "Assigned user group" ? (
            <span>
              {info}: <Chip label="General Users" style={{ color: "white" }} />
            </span>
          ) : null}
          {info === "Sidebar access" ? (
            <span>
              {info}: <Chip label="Open" style={{ color: "white" }} />
            </span>
          ) : null}
        </div>
        {menuOptions &&
          menuOptions.map((o) => (
            <Button
              key={o.name}
              variant="contained"
              color="primary"
              aria-label="Add"
              sx={{
                minWidth: "fit-content",
                background: optionsColor,
                "&:hover": {
                  backgroundColor: "#fff",
                  color: color,
                },
              }}
            >
              <div style={{ marginRight: 10 }}>{o.icon}</div>
              {o.name}
            </Button>
          ))}
      </CardActions>
    </Card>
  );
}

export default SettingsCard;
