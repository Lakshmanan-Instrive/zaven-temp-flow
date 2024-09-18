import React, { useCallback, useEffect, useState } from "react";
import UserListComponent from "../../reusable/UserListComponent";
import { Box, Button, Container, Typography } from "@mui/material";
import UserInviteComponent from "../../reusable/UserInviteComponent";
import {
  get_corporate_users_call,
  invite_corporate_user_call,
  update_corporate_user_status_call,
} from "../../store/slices/CorporateSlice";
import { useDispatch, useSelector } from "react-redux";

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
const CorporateUserList = () => {
  const dispatch = useDispatch();

  const { corporateUsers, total, page, limit } = useSelector(
    (state) => state.corporate.corporateUsers
  );

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [inviteModel, setInviteModel] = useState(false);

  const fetchCorporateUsers = useCallback(
    ({ page, limit }) => {
      dispatch(get_corporate_users_call({ page, limit }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchCorporateUsers({ page, limit });
  }, [fetchCorporateUsers]);

  const handlePageChange = (event, newPage) => {
    fetchCorporateUsers({ page: newPage, limit });
  };

  const corporateUserViewModalClose = () => {
    setOpenModal(false);
  };
  const corporateUserInviteOpen = () => {
    setInviteModel(true);
  };
  const corporateInviteClose = () => {
    setInviteModel(false);
  };

  const onSubmit = async (values) => {
    const response = await dispatch(invite_corporate_user_call(values));
    if (response.payload) {
      alert("User Invited Successfully");
      corporateInviteClose();
    }
  };

  const pageLimitChange = (limit) => {
    fetchCorporateUsers({ page: 0, limit });
  };

  const acceptOrRejectUser = async (userId, status) => {
    dispatch(update_corporate_user_status_call({ userId, status }));
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
          <Button variant="contained" onClick={corporateUserInviteOpen}>
            Invite Corporate Users
          </Button>
        </Box>
        <UserListComponent
          handlePageChange={handlePageChange}
          handleClose={corporateUserViewModalClose}
          page={page}
          limit={limit}
          total={total}
          openModal={openModal}
          selected={selected}
          usersData={corporateUsers}
          setOpenModal={setOpenModal}
          setSelected={setSelected}
          pageLimitChange={pageLimitChange}
          acceptOrRejectUser={acceptOrRejectUser}
        />
        <UserInviteComponent
          inviteModel={inviteModel}
          handleInviteClose={corporateInviteClose}
          onSubmit={onSubmit}
          formStructure={formStructure}
        />
      </Box>
    </Container>
  );
};

export default CorporateUserList;
