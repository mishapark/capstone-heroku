import React from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import LockResetIcon from "@mui/icons-material/LockReset";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import SettingsIcon from "@mui/icons-material/Settings";

import SettingsList from "../components/SettingsList/SettingsList";

const ROLES = [
  {
    title: "Super Admins",
    cards: [
      {
        title: "Subscribers",
        color: "#3f51b5",
        icon: <PeopleAltIcon />,
        menuOptions: [
          { name: "Add", icon: <GroupAddIcon /> },
          { name: "Remove", icon: <GroupRemoveIcon /> },
          { name: "View", icon: <PeopleAltIcon /> },
        ],
        optionsColor: "",
      },
      {
        title: "User Groups",
        color: "#9c27b0",
        icon: <GroupsIcon />,
        menuOptions: [
          { name: "Add", icon: <GroupAddIcon /> },
          { name: "Remove", icon: <GroupRemoveIcon /> },
        ],
        optionsColor: "#c365d3",
      },
      {
        title: "Reset Password",
        color: "#f44336",
        icon: <LockResetIcon />,
        menuOptions: [{ name: "Reset", icon: <LockResetIcon /> }],
        optionsColor: "#ff7f75",
      },
    ],
  },
  {
    title: "Admins",
    cards: [
      {
        title: "Users",
        color: "#3f51b5",
        icon: <PeopleAltIcon />,
        menuOptions: [
          { name: "Add", icon: <GroupAddIcon /> },
          { name: "Remove", icon: <GroupRemoveIcon /> },
          { name: "View", icon: <PeopleAltIcon /> },
          { name: "Author", icon: <AccountCircleIcon /> },
        ],
        optionsColor: "",
      },
      {
        title: "User Groups",
        color: "#9c27b0",
        icon: <GroupsIcon />,
        menuOptions: [
          { name: "Add", icon: <GroupAddIcon /> },
          { name: "Remove", icon: <GroupRemoveIcon /> },
          { name: "Edit", icon: <EditIcon /> },
        ],
        optionsColor: "#c365d3",
      },
      {
        title: "Sidebar Access",
        color: "#f44336",
        icon: <ViewSidebarIcon />,
        menuOptions: [
          { name: "Add", icon: <GroupAddIcon /> },
          { name: "Remove", icon: <GroupRemoveIcon /> },
          { name: "Edit", icon: <EditIcon /> },
        ],
        optionsColor: "#ff7f75",
      },
      {
        title: "Company Settings",
        color: "#ffd229",
        icon: <SettingsIcon />,
        menuOptions: [
          { name: "Add", icon: <GroupAddIcon /> },
          { name: "Remove", icon: <GroupRemoveIcon /> },
          { name: "Edit", icon: <EditIcon /> },
        ],
        optionsColor: "#b18c00",
      },
      {
        title: "Reset Password",
        color: "#005c07",
        icon: <LockResetIcon />,
        menuOptions: [{ name: "Reset", icon: <LockResetIcon /> }],
        optionsColor: "#00bd0f",
      },
    ],
  },
  {
    title: "Anyone",
    cards: [
      {
        title: "User Rights",
        color: "#3f51b5",
        icon: <PeopleAltIcon />,
        info: "Assigned access",
      },
      {
        title: "User Groups",
        color: "#9c27b0",
        icon: <GroupsIcon />,
        info: "Assigned user group",
      },
      {
        title: "Sidebar Access",
        color: "#f44336",
        icon: <ViewSidebarIcon />,
        info: "Sidebar access",
      },
      {
        title: "Change Password",
        color: "#ffd229",
        icon: <LockResetIcon />,
        menuOptions: [{ name: "Change Password", icon: <LockResetIcon /> }],
        optionsColor: "#b18c00",
      },
    ],
  },
];

function Settings() {
  return (
    <>
      <SettingsList title={ROLES[0].title} cards={ROLES[0].cards} />
      <SettingsList title={ROLES[1].title} cards={ROLES[1].cards} />
      <SettingsList title={ROLES[2].title} cards={ROLES[2].cards} />
    </>
  );
}

export default Settings;
