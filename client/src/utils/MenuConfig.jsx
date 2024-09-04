import React from "react";
import CorporateHome from "../pages/Corporate/CorporateHome";
import LegalServiceHome from "../pages/LegalServices/LegalServiceHome";
import AdminCorporate from "../pages/Admin/AdminCorporate";
import AdminLegalServices from "../pages/Admin/AdminLegalServices";
import LegalServiceUserList from "../pages/LegalServices/LegalServiceUserList";
import CorporateUserList from "../pages/Corporate/CorporateUserList";

export const menuConfig = {
  ADMIN: [
    { link: "/", element: <AdminCorporate />, text: "Corporate" },
    {
      link: "/legal-services",
      element: <AdminLegalServices />,
      text: "Legal Services",
    },
  ],
  CP: [
    { link: "/", element: <CorporateHome />, text: "Profile" },
    {
      link: "/user-list",
      element: <CorporateUserList />,
      text: "User List",
    },
  ],
  LS: [
    { link: "/", element: <LegalServiceHome />, text: "Profile" },
    {
      link: "/user-list",
      element: <LegalServiceUserList />,
      text: "User List",
    },
  ],
};
