import React, { useEffect, useState } from "react";
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

const LegalServicesList = ({ role }) => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [legalServices, setLegalServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/legal-services?page=${
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
        console.log(data.detail.data, "data");
        setLegalServices(data.detail.data);
        setTotal(data.detail.total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, limit]);

  const approveRejectLegalService = async (id, status) => {
    console.log(id, status, "id, status");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/legal-services/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.error) {
        alert(data.error);
        if (data.error === "Unauthorized") {
          localStorage.clear();
          window.location.href = "/login";
        }
      } else {
        const newLegalServices = legalServices.map((legalService) =>
          legalService._id === id ? { ...legalService, status } : legalService
        );
        setLegalServices(newLegalServices);
      }
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
            {legalServices.length > 0 &&
              legalServices.map((legal) => (
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

export default LegalServicesList;
