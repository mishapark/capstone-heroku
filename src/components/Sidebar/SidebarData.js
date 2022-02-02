import React from "react";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io5";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <MdIcons.MdSpaceDashboard />,
  },
  {
    title: "Products",
    path: "/products",
    icon: <BsIcons.BsBoxSeam />,
  },
  {
    title: "Compliance Central",
    path: "/compliance",
    icon: <AiIcons.AiOutlineFileDone />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <IoIcons.IoAnalyticsOutline />,
  },
  {
    title: "Submissions",
    icon: <GiIcons.GiPaperTray />,
    iconClosed: <RiIcons.RiArrowDownSLine />,
    iconOpened: <RiIcons.RiArrowUpSLine />,
    subNav: [
      {
        title: "CE",
        path: "/submissions/ce",
        icon: <MdIcons.MdOutlineSubdirectoryArrowRight />,
      },
      {
        title: "FDA",
        path: "/submissions/fda",
        icon: <MdIcons.MdOutlineSubdirectoryArrowRight />,
      },
      {
        title: "BIS",
        path: "/submissions/bis",
        icon: <MdIcons.MdOutlineSubdirectoryArrowRight />,
      },
    ],
  },
];
