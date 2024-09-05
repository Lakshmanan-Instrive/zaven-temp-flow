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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const UserListComponent = ({
  usersData,
  total,
  page,
  limit,
  setLimit,
  setPage,
  handlePageChange,
  openModal,
  setOpenModal,
  selected,
  setSelected,
  handleClose,
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
                  <TableCell>{user.status === 1 ? "Active" : "Inactive"}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setOpenModal(true);
                        setSelected(user);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
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
            setLimit(event.target.value);
            setPage(0);
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
