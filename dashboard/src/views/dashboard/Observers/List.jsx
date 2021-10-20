import React, { useState, useEffect } from "react";
import { API_SERVICE } from "../../../config";
import axios from "axios";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
} from "@material-ui/core";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const List = () => {
  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const initialState = { name: "", description: "" };
  const [formData, setFormData] = useState(initialState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData(initialState);
    setOpen(false);
    setIsEdit(false);
  };

  const editClass = async () => {
    await axios
      .patch(`${API_SERVICE}/editobserver`, formData)
      .then((res) => {
        getClass();
        handleClose();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };

  const addClass = async () => {
    await axios
      .post(`${API_SERVICE}/addobserver`, formData)
      .then((res) => {
        getClass();
        handleClose();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };

  const getClass = async () => {
    await axios
      .get(`${API_SERVICE}/getobserver`)
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  };
  const deleteRow = async (id) => {
    await axios
      .delete(`${API_SERVICE}/deleteobserver/${id}`)
      .then((res) => getClass())
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getClass();
  }, []);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Total Number of Observers : {classes?.length}
        <Button onClick={handleClickOpen} variant="contained">
          ADD OBSERVER
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{isEdit ? "Edit" : "Add"} Class</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              sx={{ mt: 3 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={formData?.description}
              multiline
              rows={3}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              sx={{ mt: 3 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => (isEdit ? editClass() : addClass())}
              autoFocus
            >
              {isEdit ? "Edit" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Container sx={{ mt: 5 }} maxWidth="lg">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download as XLS"
          />
        </div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            id="table-to-xls"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Description</TableCell>
                {/* <TableCell align="right">Batch</TableCell> */}

                <TableCell align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    onClick={() => {
                      window.location.href = `/dashboard/observer/list/${row._id}`;
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  {/* <TableCell align="right">{row.batch}</TableCell> */}

                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        setIsEdit(true);
                        setFormData(row);
                        handleClickOpen();
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => deleteRow(row._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default List;
