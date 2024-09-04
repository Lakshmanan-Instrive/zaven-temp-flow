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
  Modal,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const CorporateList = ({ role }) => {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [corporate, setCorporate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_ENDPOINT}/corporate?page=${
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
        if (data.error) {
          alert(data.error);
          if (data.error === "Unauthorized") {
            localStorage.clear();
            window.location.href = "/login";
          }
        }
        console.log(data.detail.data, "data");
        setCorporate(data.detail.data);
        setTotal(data.detail.total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [limit, page]);

  const approveRejectCorporate = async (id, status) => {
    console.log(id, status, "id, status");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/corporate/${id}`,
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
        const newCorporate = corporate.map((corp) =>
          corp._id === id ? { ...corp, status } : corp
        );
        setCorporate(newCorporate);
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
                    {corp.status === 0 && (
                      <HourglassBottomIcon color="warning" />
                    )}
                    {corp.status === 1 && <CheckIcon color="success" />}
                    {corp.status === 2 && <CloseIcon color="error" />}
                  </TableCell>
                  {!role && (
                    <TableCell>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          console.log(corp, "corp");
                          setOpenModal(true);
                          setSelected(corp);
                        }}
                      >
                        <VisibilityIcon />
                      </span>
                      {corp.status !== 1 && (
                        <IconButton
                          onClick={() => approveRejectCorporate(corp._id, 1)}
                        >
                          <CheckIcon />
                        </IconButton>
                      )}
                      {corp.status !== 2 && (
                        <IconButton
                          onClick={() => approveRejectCorporate(corp._id, 2)}
                        >
                          <CloseIcon />
                        </IconButton>
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
          onRowsPerPageChange={(event) => setLimit(event.target.value)}
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

export default CorporateList;
