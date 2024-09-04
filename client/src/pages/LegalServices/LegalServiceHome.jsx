import React, { useEffect, useState } from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import ProfileComponent from "../../reusable/ProfileComponent";

const LegalServiceHome = () => {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState();

  useEffect(() => {
    // Fetch the user details from the backend

    const fetchProfileData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/legal-services/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.error) {
        alert(data.error);
        if (data.error === "Unauthorized") {
          localStorage.clear();
          window.location.href = "/login";
        }
      } else {
        console.log(data.detail, "data");
        setProfile(data.detail[0]);
      }
    };
    fetchProfileData();

    // setFirstName(response.firstName);
    // setSurName(response.surName);
  }, []);

  return <>{profile && <ProfileComponent profile={profile} />}</>;
};

export default LegalServiceHome;
