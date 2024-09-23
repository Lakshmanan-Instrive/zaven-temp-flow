import React, { useCallback, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  Modal,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
  TableSortLabel,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  get_corporate_call,
  update_corporate_status_call,
} from "../../store/slices/CorporateSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../reusable/SearchBar";
import FilterBar from "../../reusable/FilterBar";

const CorporateList = ({ role }) => {
  const dispatch = useDispatch();

  const { corporate, page, limit, total, search, filter, sort } = useSelector(
    (state) => state.corporate.corporate
  );
  const [openCorporateViewModal, setOpenCorporateViewModal] = useState(false);
  const [selectedCorporate, setSelectedCorporate] = useState({});

  const corporateFetch = useCallback(
    ({ page, limit, search, filter, sort }) => {
      dispatch(get_corporate_call({ page, limit, search, filter, sort }));
    },
    [dispatch]
  );

  useEffect(() => {
    corporateFetch({ page, limit, search, filter, sort });
  }, [corporateFetch]);

  const approveRejectCorporate = async (id, status) => {
    await dispatch(update_corporate_status_call({ id, status }));
  };

  const handleCorporatePageChange = (event, newPage) => {
    corporateFetch({ page: newPage, limit, search, filter, sort });
  };

  const handleCorporateViewClose = () => {
    setOpenCorporateViewModal(false);
  };

  const handleCorporateSearchChange = (value) => {
    corporateFetch({ page, limit, search: value, filter, sort });
  };

  const handleCorporateFilterChange = (value) => {
    let filterValue = undefined;
    if ((value && value !== -1) || value === 0) {
      filterValue = {
        status: value,
      };
    }
    corporateFetch({ page, limit, search, filter: filterValue, sort });
  };

  const handleCorporateSortChange = (value) => {
    let sortValue;
    if (sort && sort[value]) {
      sortValue = sort[value] === 1 ? { [value]: -1 } : { [value]: 1 };
    } else {
      sortValue = { [value]: 1 };
    }
    corporateFetch({ page, limit, search, filter, sort: sortValue });
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
        <SearchBar searchQuery={handleCorporateSearchChange} search={search} />
        <FilterBar
          filter={filter?.status}
          changeFilter={handleCorporateFilterChange}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort && sort["companyName"]}
                  direction={sort && sort["companyName"] === 1 ? "asc" : "desc"}
                  onClick={() => handleCorporateSortChange("companyName")}
                >
                  Company Name
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort && sort["contactPerson"]}
                  direction={
                    sort && sort["contactPerson"] === 1 ? "asc" : "desc"
                  }
                  onClick={() => handleCorporateSortChange("contactPerson")}
                >
                  Contact Person
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort && sort["phoneNumber"]}
                  direction={sort && sort["phoneNumber"] === 1 ? "asc" : "desc"}
                  onClick={() => handleCorporateSortChange("phoneNumber")}
                >
                  Phone Number
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort && sort["companyAddress"]}
                  direction={
                    sort && sort["companyAddress"] === 1 ? "asc" : "desc"
                  }
                  onClick={() => handleCorporateSortChange("companyAddress")}
                >
                  Company Address
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort && sort["zipCode"]}
                  direction={sort && sort["zipCode"] === 1 ? "asc" : "desc"}
                  onClick={() => handleCorporateSortChange("zipCode")}
                >
                  Zip Code
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                <TableSortLabel
                  active={sort && sort["status"]}
                  direction={sort && sort["status"] === 1 ? "asc" : "desc"}
                  onClick={() => handleCorporateSortChange("status")}
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
            {corporate.length > 0 &&
              corporate.map((corp) => (
                <TableRow key={corp._id}>
                  <TableCell>{corp.companyName}</TableCell>
                  <TableCell>{corp.contactPerson}</TableCell>
                  <TableCell>{corp.phoneNumber}</TableCell>
                  <TableCell>{corp.companyAddress}</TableCell>
                  <TableCell>{corp.zipCode}</TableCell>
                  <TableCell>
                    <Box
                      style={{
                        backgroundColor:
                          corp.status === 0
                            ? "yellow"
                            : corp.status === 1
                            ? "green"
                            : "red",
                        textAlign: "center",
                        padding: "5px",
                        borderRadius: "5px",
                        color: corp.status === 0 ? "inherit" : "white",
                      }}
                    >
                      {corp.status === 0 && "Pending"}
                      {corp.status === 1 && "Active"}
                      {corp.status === 2 && "Inactive"}
                    </Box>
                  </TableCell>
                  {!role && (
                    <TableCell>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          console.log(corp, "corp");
                          setOpenCorporateViewModal(true);
                          setSelectedCorporate(corp);
                        }}
                      >
                        <Tooltip title="View" placement="top">
                          <VisibilityIcon />
                        </Tooltip>
                      </span>
                      {corp.status === 0 && (
                        <Tooltip title="Approve" placement="top">
                          <IconButton
                            onClick={() => approveRejectCorporate(corp._id, 1)}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {corp.status === 0 && (
                        <Tooltip title="Reject" placement="top">
                          <IconButton
                            onClick={() => approveRejectCorporate(corp._id, 2)}
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
          onPageChange={handleCorporatePageChange}
          onRowsPerPageChange={(event) =>
            corporateFetch({
              page: 0,
              limit: event.target.value,
              search,
              filter,
              sort,
            })
          }
        />
      </TableContainer>
      <Modal
        open={openCorporateViewModal}
        onClose={handleCorporateViewClose}
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
            Corporate Details
          </Typography>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "150px" }}>Company Name:</strong>
            <span>{selectedCorporate.companyName}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "150px" }}>Contact Person:</strong>
            <span>{selectedCorporate.contactPerson}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "150px" }}>Phone Number:</strong>
            <span>{selectedCorporate.phoneNumber}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "150px" }}>Company Address:</strong>
            <span>{selectedCorporate.companyAddress}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <strong style={{ minWidth: "150px" }}>Zip Code:</strong>
            <span>{selectedCorporate.zipCode}</span>
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
              onClick={handleCorporateViewClose}
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

export default CorporateList;
