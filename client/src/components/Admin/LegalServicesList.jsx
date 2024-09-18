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
  IconButton,
  Modal,
  Box,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  get_legal_call,
  update_legal_status_call,
} from "../../store/slices/LegalServiceSlice";
import { useDispatch, useSelector } from "react-redux";

const LegalServicesList = ({ role }) => {
  const dispatch = useDispatch();

  const { legal, page, limit, total } = useSelector((state) => state.legal.legal);
  console.log("legal", legal, page, limit, total);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState({});

  const legalFetch = useCallback(
    ({ page, limit }) => {
      dispatch(get_legal_call({ page, limit }));
    },
    [dispatch]
  );
  useEffect(() => {
    legalFetch({ page, limit });
  }, [legalFetch]);

  const approveRejectLegalService = async (id, status) => {
    await dispatch(update_legal_status_call({ id, status }));
  };

  const handleLegalPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLegalViewClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company Address</TableCell>
              <TableCell>Zip Code</TableCell>
              <TableCell>Status</TableCell>
              {!role && <TableCell>Action</TableCell>}
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
                      {legal.status !== 1 && (
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
                      {legal.status !== 2 && (
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
            legalFetch({ page, limit: event.target.value });
          }}
        />
      </TableContainer>
      <Modal open={openModal} onClose={handleLegalViewClose} className="h-200">
        <Box className="bg-white p-8 h-2/3 w-1/3 mx-auto mt-20 overflow-y-scroll">
          <Typography variant="h4" className="mb-4 text-center">
            Legal Service
          </Typography>
          <div>Company Name: {selected.companyName} </div>
          <div>Contact Person: {selected.contactPerson} </div>
          <div>Phone Number: {selected.phoneNumber} </div>
          <div>Company Address: {selected.companyAddress} </div>
          <div>Zip Code: {selected.zipCode} </div>
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
              onClick={handleLegalViewClose}
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

export default LegalServicesList;
