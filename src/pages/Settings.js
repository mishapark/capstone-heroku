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
import ApartmentIcon from "@mui/icons-material/Apartment";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import useAuth from "../hooks/useAuth";

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
          { name: "Add subscribers", icon: <GroupAddIcon /> },
          //{ name: "Remove subscribers", icon: <GroupRemoveIcon /> },
          { name: "View subscribers", icon: <PeopleAltIcon /> },
        ],
        optionsColor: "#303f9f",
      },
      {
        title: "User Groups",
        color: "#9c27b0",
        icon: <GroupsIcon />,
        menuOptions: [
          { name: "Add user groups", icon: <GroupAddIcon /> },
          { name: "Remove user groups", icon: <GroupRemoveIcon /> },
        ],
        optionsColor: "#c365d3",
      },
      {
        title: "Reset Password",
        color: "#f44336",
        icon: <LockResetIcon />,
        menuOptions: [{ name: "Reset password", icon: <LockResetIcon /> }],
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
          { name: "Add users", icon: <GroupAddIcon /> },
          { name: "Remove users", icon: <GroupRemoveIcon /> },
          { name: "View users", icon: <PeopleAltIcon /> },
          { name: "Author", icon: <AccountCircleIcon /> },
        ],
        optionsColor: "#303f9f",
      },
      {
        title: "User Groups",
        color: "#9c27b0",
        icon: <GroupsIcon />,
        menuOptions: [{ name: "Edit user groups", icon: <EditIcon /> }],
        optionsColor: "#c365d3",
      },
      {
        title: "Sidebar Access",
        color: "#f44336",
        icon: <ViewSidebarIcon />,
        menuOptions: [
          { name: "Add sidebar access", icon: <AddIcon /> },
          { name: "Remove sidebar access", icon: <RemoveIcon /> },
          { name: "Edit sidebar access", icon: <EditIcon /> },
        ],
        optionsColor: "#ff7f75",
      },
      {
        title: "Company Settings",
        color: "#ffd229",
        icon: <SettingsIcon />,
        menuOptions: [
          { name: "Company", icon: <ApartmentIcon /> },
          { name: "Engineering", icon: <EngineeringIcon /> },
          { name: "Business", icon: <BusinessCenterIcon /> },
          { name: "Compliance", icon: <CheckIcon /> },
        ],
        optionsColor: "#b18c00",
      },
      {
        title: "Reset Password",
        color: "#005c07",
        icon: <LockResetIcon />,
        menuOptions: [{ name: "Reset password", icon: <LockResetIcon /> }],
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
        title: "Reset password",
        color: "#ffd229",
        icon: <LockResetIcon />,
        menuOptions: [{ name: "Reset password", icon: <LockResetIcon /> }],
        optionsColor: "#b18c00",
      },
    ],
  },
];

function Settings() {
  const { auth } = useAuth();
  const role = auth.roles[0];

  return (
    <>
      <SettingsList title={ROLES[2].title} cards={ROLES[0].cards} />
      <SettingsList title={ROLES[2].title} cards={ROLES[1].cards} />
      <SettingsList title={ROLES[2].title} cards={ROLES[2].cards} />
      {/* 
      {role === "Super Admin" ? (
        <SettingsList title={ROLES[2].title} cards={ROLES[0].cards} />
      ) : null}
      {role === "Admin" ? (
        <SettingsList title={ROLES[2].title} cards={ROLES[1].cards} />
      ) : null}
      {role === "Viewer" ? (
        <SettingsList title={ROLES[2].title} cards={ROLES[2].cards} />
      ) : null} */}
    </>
  );
}

export default Settings;
