import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChangePasswordComponent from "../../reusable/ChangePasswordComponent";

const formStructure = {
  password: {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    min: 6,
  },
  confirmPassword: {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
    match: "password",
  },
};

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    const accessCode = queryParams.get("accessCode");
    console.log(email, accessCode, "email, accessCode");
    if (email && accessCode) {
      setEmail(email);
      setAccessCode(accessCode);
    } else {
      navigate("/login");
    }
  }, [navigate, location.search]);

  const onSubmit = async (values) => {
    console.log(values);
    try {
      fetch(`${import.meta.env.VITE_API_ENDPOINT}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          accessCode: accessCode,
          password: values.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            alert("Password updated successfully");
            navigate("/login");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChangePasswordComponent
      formStructure={formStructure}
      onSubmit={onSubmit}
    />
  );
};

export default ChangePassword;
