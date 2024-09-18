import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChangePasswordComponent from "../../reusable/ChangePasswordComponent";
import { change_password_call } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");

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
      const response = await dispatch(
        change_password_call({
          email: email,
          accessCode: accessCode,
          password: values.password,
        })
      );
      if (response.payload) {
        alert("Password updated successfully");
        navigate("/login");
      }
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
