import { useEffect, useState } from "react";
import ProfileComponent from "../../reusable/ProfileComponent";

const LegalServiceHome = () => {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/corporate/profile`,
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
