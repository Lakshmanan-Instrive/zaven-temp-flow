import React from "react";
import CorporateHome from "../pages/Corporate/CorporateHome";
import LegalServiceHome from "../pages/LegalServices/LegalServiceHome";
import AdminCorporate from "../pages/Admin/AdminCorporate";
import AdminLegalServices from "../pages/Admin/AdminLegalServices";

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
      link: "/legal-services",
      element: <LegalServiceHome />,
      text: "Legal Services",
    },
  ],
  LS: [{ link: "/", element: <LegalServiceHome />, text: "Legal Services" }],
};
