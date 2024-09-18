import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import ProfileComponent from "../../reusable/ProfileComponent";
import { useDispatch, useSelector } from "react-redux";
import { get_legal_profile_call } from "../../store/slices/LegalServiceSlice";

const LegalServiceHome = () => {
  const dispatch = useDispatch();

  const { legalProfile } = useSelector((state) => state.legal);

  const fetchProfileData = useCallback(() => {
    dispatch(get_legal_profile_call());
  }, [dispatch]);

  useEffect(() => {
    fetchProfileData();
  }, [dispatch]);

  return <>{legalProfile && <ProfileComponent profile={legalProfile} />}</>;
};

export default LegalServiceHome;
