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
            <TableRow style={{ backgroundColor: "rgb(251, 251, 252)" }}>
              <TableCell style={{ textTransform: "uppercase" }}>
                Company Name
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                Contact Person
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                Phone Number
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                Company Address
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                Zip Code
              </TableCell>
              <TableCell style={{ textTransform: "uppercase" }}>
                Status
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
                      {corp.status !== 1 && (
                        <Tooltip title="Approve" placement="top">
                          <IconButton
                            onClick={() => approveRejectCorporate(corp._id, 1)}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {corp.status !== 2 && (
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
        className="h-200"
      >
        <Box className="bg-white p-8 h-2/3 w-1/3 mx-auto mt-20 overflow-y-scroll">
          <Typography variant="h4" className="mb-4 text-center">
            Legal Service
          </Typography>
          <div>Company Name: {selectedCorporate.companyName} </div>
          <div>Contact Person: {selectedCorporate.contactPerson} </div>
          <div>Phone Number: {selectedCorporate.phoneNumber} </div>
          <div>Company Address: {selectedCorporate.companyAddress} </div>
          <div>Zip Code: {selectedCorporate.zipCode} </div>
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
              onClick={handleCorporateViewClose}
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

export default CorporateList;
