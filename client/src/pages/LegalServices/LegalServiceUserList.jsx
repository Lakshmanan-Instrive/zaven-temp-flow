import React, { useCallback, useEffect, useState } from "react";
import UserListComponent from "../../reusable/UserListComponent";
import { Box, Button, Container, Typography } from "@mui/material";
import UserInviteComponent from "../../reusable/UserInviteComponent";
import {
  get_legal_users_call,
  invite_legal_user_call,
  update_legal_user_status_call,
} from "../../store/slices/LegalServiceSlice";
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

const LegalServiceUserList = () => {
  const dispatch = useDispatch();

  const { legalUsers, total, page, limit, search, sort, filter } = useSelector(
    (state) => state.legal.legalUsers
  );

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [inviteModel, setInviteModel] = useState(false);

  const fetchLegalUsers = useCallback(
    ({ page, limit, search, sort, filter }) => {
      dispatch(get_legal_users_call({ page, limit, search, sort, filter }));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchLegalUsers({ page, limit, search, sort, filter });
  }, [fetchLegalUsers]);

  const handlePageChange = (event, newPage) => {
    fetchLegalUsers({ page: newPage, limit, search, sort, filter });
  };

  const legalViewModalClose = () => {
    setOpenModal(false);
  };
  const legalUserInviteOpen = () => {
    setInviteModel(true);
  };
  const LegalUserInviteClose = () => {
    setInviteModel(false);
  };

  const onSubmit = async (values) => {
    const response = await dispatch(invite_legal_user_call(values));
    if (response.payload) {
      alert("User Invited Successfully");
      LegalUserInviteClose();
      fetchLegalUsers({ page, limit });
    }
  };

  const pageLimitChange = (limit) => {
    fetchLegalUsers({ page: 0, limit, search, sort, filter });
  };

  const acceptOrRejectUser = (userId, status) => {
    dispatch(update_legal_user_status_call({ userId, status }));
  };

  const handleLegalUserSort = (value) => {
    let sortValue;
    if (sort && sort[value]) {
      sortValue = sort[value] === 1 ? { [value]: -1 } : { [value]: 1 };
    } else {
      sortValue = { [value]: 1 };
    }
    fetchLegalUsers({ page, limit, search, sort: sortValue, filter });
  };

  const handleLegalUserSearch = (value) => {
    fetchLegalUsers({ page, limit, search: value, sort, filter });
  };

  const handleLegalUserFilter = (value) => {
    let filterValue = undefined;
    if ((value && value !== -1) || value === 0) {
      filterValue = {
        status: value,
      };
    }
    fetchLegalUsers({ page, limit, search, sort, filter: filterValue });
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
            Welcome to Zaven - Legal Service
          </Typography>
          <Button variant="contained" onClick={legalUserInviteOpen}>
            Invite Legal Service Providers
          </Button>
        </Box>
        <UserListComponent
          handlePageChange={handlePageChange}
          handleClose={legalViewModalClose}
          page={page}
          limit={limit}
          total={total}
          openModal={openModal}
          selected={selected}
          usersData={legalUsers}
          setOpenModal={setOpenModal}
          setSelected={setSelected}
          pageLimitChange={pageLimitChange}
          acceptOrRejectUser={acceptOrRejectUser}
          handleSort={handleLegalUserSort}
          handleFilter={handleLegalUserFilter}
          handleSearch={handleLegalUserSearch}
          search={search}
          sort={sort}
          filter={filter}
        />
        <UserInviteComponent
          inviteModel={inviteModel}
          handleInviteClose={LegalUserInviteClose}
          onSubmit={onSubmit}
          formStructure={formStructure}
        />
      </Box>
    </Container>
  );
};

export default LegalServiceUserList;
