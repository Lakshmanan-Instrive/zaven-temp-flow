import React, { useCallback, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
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
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  get_legal_call,
  update_legal_status_call,
} from "../../store/slices/LegalServiceSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../reusable/SearchBar";
import FilterBar from "../../reusable/FilterBar";

const LegalServicesList = ({ role }) => {
  const dispatch = useDispatch();

  const { legal, page, limit, total, search, filter, sort } = useSelector(
    (state) => state.legal.legal
  );
  console.log("legal", legal, page, limit, total);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState({});

  const legalFetch = useCallback(
    ({ page, limit, search, filter, sort }) => {
      dispatch(get_legal_call({ page, limit, search, filter, sort }));
    },
    [dispatch]
  );

  useEffect(() => {
    legalFetch({ page, limit, search, filter, sort });
  }, [legalFetch]);

  const approveRejectLegalService = async (id, status) => {
    await dispatch(update_legal_status_call({ id, status }));
  };

  const handleLegalPageChange = (event, newPage) => {
    legalFetch({ page: newPage, limit, search, filter, sort });
  };

  const handleLegalViewClose = () => {
    setOpenModal(false);
  };
  const handleLegalSearchChange = (value) => {
    legalFetch({ page, limit, search: value, filter, sort });
  };

  const handleLegalFilterChange = (value) => {
    let filterValue = undefined;
    if ((value && value !== -1) || value === 0) {
      filterValue = {
        status: value,
      };
    }
    legalFetch({ page, limit, search, filter: filterValue, sort });
  };

  const handleLegalSortChange = (value) => {
    let sortValue;
    if (sort[value]) {
      sortValue = sort[value] === 1 ? { [value]: -1 } : { [value]: 1 };
    } else {
      sortValue = { [value]: 1 };
    }
    legalFetch({ page, limit, search, filter, sort: sortValue });
  };

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
        <SearchBar searchQuery={handleLegalSearchChange} search={search} />
        <FilterBar
          filter={filter?.status}
          changeFilter={handleLegalFilterChange}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort["companyName"]}
                  direction={sort["companyName"] === 1 ? "asc" : "desc"}
                  onClick={() => handleLegalSortChange("companyName")}
                >
                  Company Name
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort["contactPerson"]}
                  direction={sort["contactPerson"] === 1 ? "asc" : "desc"}
                  onClick={() => handleLegalSortChange("contactPerson")}
                >
                  Contact Person
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort["phoneNumber"]}
                  direction={sort["phoneNumber"] === 1 ? "asc" : "desc"}
                  onClick={() => handleLegalSortChange("phoneNumber")}
                >
                  Phone Number
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort["companyAddress"]}
                  direction={sort["companyAddress"] === 1 ? "asc" : "desc"}
                  onClick={() => handleLegalSortChange("companyAddress")}
                >
                  Company Address
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort["zipCode"]}
                  direction={sort["zipCode"] === 1 ? "asc" : "desc"}
                  onClick={() => handleLegalSortChange("zipCode")}
                >
                  Zip Code
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort["status"]}
                  direction={sort["status"] === 1 ? "asc" : "desc"}
                  onClick={() => handleLegalSortChange("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              {!role && (
                <TableCell style={{ textTransform: "uppercase" }}>
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {legal.length > 0 &&
              legal.map((legal) => (
                <TableRow key={legal._id}>
                  <TableCell>{legal.companyName}</TableCell>
                  <TableCell>{legal.contactPerson}</TableCell>
                  <TableCell>{legal.phoneNumber}</TableCell>
                  <TableCell>{legal.companyAddress}</TableCell>
                  <TableCell>{legal.zipCode}</TableCell>
                  <TableCell>
                    <Box
                      style={{
                        backgroundColor:
                          legal.status === 0
                            ? "yellow"
                            : legal.status === 1
                            ? "green"
                            : "red",
                        textAlign: "center",
                        padding: "5px",
                        borderRadius: "5px",
                        color: legal.status === 0 ? "inherit" : "white",
                      }}
                    >
                      {legal.status === 0 && "Pending"}
                      {legal.status === 1 && "Active"}
                      {legal.status === 2 && "Inactive"}
                    </Box>
                  </TableCell>
                  {!role && (
                    <TableCell>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          console.log(legal, "legal");
                          setOpenModal(true);
                          setSelected(legal);
                        }}
                      >
                        <Tooltip title="View" placement="top">
                          <VisibilityIcon />
                        </Tooltip>
                      </span>
                      {legal.status === 0 && (
                        <Tooltip title="Approve" placement="top">
                          <IconButton
                            onClick={() =>
                              approveRejectLegalService(legal._id, 1)
                            }
                          >
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {legal.status === 0 && (
                        <Tooltip title="Reject" placement="top">
                          <IconButton
                            onClick={() =>
                              approveRejectLegalService(legal._id, 2)
                            }
                          >
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleLegalPageChange}
          onRowsPerPageChange={(event) => {
            legalFetch({
              page,
              limit: event.target.value,
              search,
              filter,
              sort,
            });
          }}
        />
      </TableContainer>
      <Modal
        open={openModal}
        onClose={handleLegalViewClose}
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
            Legal Service Details
          </Typography>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "150px" }}>Company Name:</strong>
            <span>{selected.companyName}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "150px" }}>Contact Person:</strong>
            <span>{selected.contactPerson}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "150px" }}>Phone Number:</strong>
            <span>{selected.phoneNumber}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "150px" }}>Company Address:</strong>
            <span>{selected.companyAddress}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "150px" }}>Zip Code:</strong>
            <span>{selected.zipCode}</span>
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
              onClick={handleLegalViewClose}
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

export default LegalServicesList;
