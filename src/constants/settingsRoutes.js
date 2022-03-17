// Pages
import AddSubscribers from "../pages/SettingsTabs/AddSubscribers";
import RemoveSubscribers from "../pages/SettingsTabs/RemoveSubscribers";
import ViewSubscribers from "../pages/SettingsTabs/ViewSubscribers";
import AddUserGroups from "../pages/SettingsTabs/AddUserGroups";
import RemoveUserGroups from "../pages/SettingsTabs/RemoveUserGroups";
import EditUserGroups from "../pages/SettingsTabs/EditUserGroups";
import AddUsers from "../pages/SettingsTabs/AddUsers";
import RemoveUsers from "../pages/SettingsTabs/RemoveUsers";
import ViewUsers from "../pages/SettingsTabs/ViewUsers";
import Author from "../pages/SettingsTabs/Author";
import AddSidebarAccess from "../pages/SettingsTabs/AddSidebarAccess";
import RemoveSidebarAccess from "../pages/SettingsTabs/RemoveSidebarAccess";
import EditSidebarAccess from "../pages/SettingsTabs/EditSidebarAccess";
import Company from "../pages/SettingsTabs/Company";
import Engineering from "../pages/SettingsTabs/Engineering";
import Business from "../pages/SettingsTabs/Business";
import Compliance from "../pages/SettingsTabs/Compliance";
import ResetPassword from "../pages/SettingsTabs/ResetPassword";

export default [
  {
    path: "addsubscribers",
    component: <AddSubscribers />,
  },
  {
    path: "removesubscribers",
    component: <RemoveSubscribers />,
  },
  {
    path: "viewsubscribers",
    component: <ViewSubscribers />,
  },
  {
    path: "addusergroups",
    component: <AddUserGroups />,
  },
  {
    path: "removeusergroups",
    component: <RemoveUserGroups />,
  },
  {
    path: "editusergroups",
    component: <EditUserGroups />,
  },
  {
    path: "addusers",
    component: <AddUsers />,
  },
  {
    path: "removeusers",
    component: <RemoveUsers />,
  },
  {
    path: "viewusers",
    component: <ViewUsers />,
  },
  {
    path: "author",
    component: <Author />,
  },
  {
    path: "addsidebaraccess",
    component: <AddSidebarAccess />,
  },
  {
    path: "removesidebaraccess",
    component: <RemoveSidebarAccess />,
  },
  {
    path: "editsidebaraccess",
    component: <EditSidebarAccess />,
  },
  {
    path: "company",
    component: <Company />,
  },
  {
    path: "engineering",
    component: <Engineering />,
  },
  {
    path: "business",
    component: <Business />,
  },
  {
    path: "compliance",
    component: <Compliance />,
  },
  {
    path: "resetpassword",
    component: <ResetPassword />,
  },
];
