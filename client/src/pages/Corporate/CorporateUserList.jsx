import React, { useEffect, useState } from "react";
import UserListComponent from "../../reusable/UserListComponent";
import { Box, Button, Container, Typography } from "@mui/material";
import UserInviteComponent from "../../reusable/UserInviteComponent";

const formStructure = {
  email: {
    type: "email",
    label: "Email",
    required: true,
  },
  firstName: {
    type: "text",
    min: 3,
    max: 20,
    label: "First Name",
    required: true,
  },
  surName: {
    type: "text",
    min: 1,
    max: 20,
    label: "Surname",
    required: true,
  },
  primary: {
    type: "checkbox",
    label: "Primary",
    required: false,
  },
};
const CorporateUserList = ({ role }) => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [inviteModel, setInviteModel] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page, limit]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/corporate/user-list?page=${
          page + 1
        }&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUsersData(data.detail.data);
      setTotal(data.detail.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleInviteOpen = () => {
    setInviteModel(true);
  };
  const handleInviteClose = () => {
    setInviteModel(false);
  };

  const onSubmit = async (values) => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/corporate/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
          if (data.error === "Unauthorized") {
            localStorage.clear();
            window.location.href = "/login";
          }
        } else {
          alert("Corporate Invited Successfully");
          handleInviteClose();
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Display an error message
      });
  };

  return (
    <Container sx={{ padding: "20px", mt: "70px" }}>
      <Box sx={{ mb: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ padding: "10px" }}
            variant="h6"
            align="center"
            gutterBottom
          >
            Welcome to Zaven - Corporate
          </Typography>
          <Button variant="contained" onClick={handleInviteOpen}>
            Invite Corporate Users
          </Button>
        </Box>
        <UserListComponent
          handlePageChange={handlePageChange}
          handleClose={handleClose}
          page={page}
          limit={limit}
          total={total}
          openModal={openModal}
          selected={selected}
          usersData={usersData}
          setUsersData={setUsersData}
          setOpenModal={setOpenModal}
          setSelected={setSelected}
          setLimit={setLimit}
          setPage={setPage}
        />
        <UserInviteComponent
          inviteModel={inviteModel}
          handleInviteClose={handleInviteClose}
          onSubmit={onSubmit}
          formStructure={formStructure}
        />
      </Box>
    </Container>
  );
};

export default CorporateUserList;
