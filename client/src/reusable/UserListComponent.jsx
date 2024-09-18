import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  IconButton,
  Modal,
  Box,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UserListComponent = ({
  usersData,
  total,
  page,
  limit,
  pageLimitChange,
  handlePageChange,
  openModal,
  setOpenModal,
  selected,
  setSelected,
  handleClose,
  acceptOrRejectUser,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Sur Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.length > 0 &&
              usersData.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.surName}</TableCell>
                  <TableCell>
                    <Box
                      style={{
                        backgroundColor:
                          user.status === 0
                            ? "yellow"
                            : user.status === 1
                            ? "green"
                            : "red",
                        textAlign: "center",
                        padding: "5px",
                        borderRadius: "5px",
                        width: "80%",
                        color: user.status === 0 ? "inherit" : "white",
                      }}
                    >
                      {user.status === 0 && "Pending"}
                      {user.status === 1 && "Active"}
                      {user.status === 2 && "Inactive"}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setOpenModal(true);
                        setSelected(user);
                      }}
                    >
                      <Tooltip title="View" placement="top">
                        <VisibilityIcon />
                      </Tooltip>
                    </IconButton>
                    {user.status !== 1 && (
                      <Tooltip title="Approve" placement="top">
                        <IconButton
                          onClick={() => acceptOrRejectUser(user._id, 1)}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {user.status !== 2 && (
                      <Tooltip title="Reject" placement="top">
                        <IconButton
                          onClick={() => acceptOrRejectUser(user._id, 2)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          rowsPerPage={limit}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={(event) => {
            pageLimitChange(event.target.value);
          }}
        />
      </TableContainer>
      <Modal open={openModal} onClose={handleClose} className="h-200">
        <Box className="bg-white p-8 h-2/3 w-1/3 mx-auto mt-20 overflow-y-scroll">
          <Typography variant="h4" className="mb-4 text-center">
            Details
          </Typography>
          <div>First Name: {selected.firstName} </div>
          <div>Sur Name : {selected.surName} </div>
          <div>Email: {selected.email} </div>
          <div>Status: {selected.status} </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={handleClose}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 ml-2"
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UserListComponent;
