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
  TableSortLabel,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";

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
  handleSort,
  handleFilter,
  handleSearch,
  sort,
  filter,
  search,
}) => {
  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        padding={"10px"}
        gap={"10px"}
        justifyContent={"space-between"}
      >
        <SearchBar searchQuery={handleSearch} search={search} />
        <FilterBar filter={filter?.status} changeFilter={handleFilter} />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sort && sort.email ? true : false}
                  direction={sort && sort.email === 1 ? "asc" : "desc"}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sort && sort.firstName ? true : false}
                  direction={sort && sort.firstName === 1 ? "asc" : "desc"}
                  onClick={() => handleSort("firstName")}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sort && sort.surName ? true : false}
                  direction={sort && sort.surName === 1 ? "asc" : "desc"}
                  onClick={() => handleSort("surName")}
                >
                  Sur Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sort && sort.status ? true : false}
                  direction={sort && sort.status === 1 ? "asc" : "desc"}
                  onClick={() => handleSort("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
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
                    {user.status == 0 && (
                      <Tooltip title="Approve" placement="top">
                        <IconButton
                          onClick={() => acceptOrRejectUser(user._id, 1)}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {user.status == 0 && (
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
      <Modal
        open={openModal}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            backgroundColor: "white",
            padding: "32px",
            maxHeight: "calc(100% - 96px)",
            overflowY: "auto",
            width: "33%",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h5"
            style={{
              marginBottom: "16px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            User Details
          </Typography>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "100px" }}>First Name:</strong>
            <span>{selected.firstName}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "100px" }}>Sur Name:</strong>
            <span>{selected.surName}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "100px" }}>Email:</strong>
            <span>{selected.email}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "100px" }}>Status:</strong>
            <span>
              {selected.status === 1
                ? "Active"
                : selected.status === 2
                ? "InActive"
                : "Pending"}
            </span>
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleClose}
              style={{
                backgroundColor: "#1976d2",
                color: "white",
                textTransform: "none",
                padding: "6px 16px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
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
