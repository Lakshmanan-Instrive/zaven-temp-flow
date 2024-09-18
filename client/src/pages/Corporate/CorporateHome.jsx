import { useCallback, useEffect, useState } from "react";
import ProfileComponent from "../../reusable/ProfileComponent";
import { get_corporate_profile_call } from "../../store/slices/CorporateSlice";
import { useDispatch, useSelector } from "react-redux";

const LegalServiceHome = () => {
  const dispatch = useDispatch();

  const { corporateProfile } = useSelector((state) => state.corporate);

  const fetchProfileData = useCallback(() => {
    dispatch(get_corporate_profile_call());
  }, [dispatch]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return (
    <>{corporateProfile && <ProfileComponent profile={corporateProfile} />}</>
  );
};

export default LegalServiceHome;
