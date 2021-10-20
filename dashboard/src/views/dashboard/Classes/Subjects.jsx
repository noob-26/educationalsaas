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
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const initialState = { name: "", description: "", batch: "" };
  const [formData, setFormData] = useState(initialState);
  const [years, setYears] = useState([]);

  function generateYearsBetween(startYear = 2000, endYear) {
    const endDate = endYear || new Date().getFullYear();
    let year = [];
    for (var i = startYear; i <= endDate; i++) {
      year.push({ year: startYear });
      startYear++;
    }
    setYears(year);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialState);
    setIsEdit(false);
  };

  const editSubject = async () => {
    await axios
      .patch(`${API_SERVICE}/editclasssubject`, formData)
      .then((res) => {
        getSubject();
        handleClose();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };
  const addSubject = async () => {
    await axios
      .post(`${API_SERVICE}/addclasssubject`, formData)
      .then((res) => {
        getSubject();
        handleClose();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };
  const getSubject = async () => {
    await axios
      .get(`${API_SERVICE}/getclasssubject`)
      .then((res) => setSubjects(res.data))
      .catch((err) => console.log(err));
  };

  const getClass = async () => {
    await axios
      .get(`${API_SERVICE}/getclasslist`)
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  };
  const deleteRow = async (id) => {
    await axios
      .delete(`${API_SERVICE}/deleteclasssubject/${id}`)
      .then((res) => getSubject())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getClass();
    getSubject();
    generateYearsBetween();
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
        Total Number of Subjects : {subjects?.length}
        <Button onClick={handleClickOpen} variant="contained">
          ADD SUBJECT
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{isEdit ? "Edit" : "Add"} Subject</DialogTitle>
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
            <Autocomplete
              fullWidth
              disablePortal
              options={classes}
              sx={{ mt: 3 }}
              getOptionLabel={(option) => `${option.name}`}
              renderInput={(params) => <TextField {...params} label="Class" />}
              inputValue={formData?.class}
              onInputChange={(event, newInputValue) => {
                setFormData({ ...formData, class: newInputValue });
              }}
              // value={formData?.class}
              // onChange={(event, newValue) => {
              //   setFormData({ ...formData, class: newValue });
              // }}
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

            <Autocomplete
              fullWidth
              disablePortal
              options={years}
              sx={{ mt: 3 }}
              getOptionLabel={(option) => `${option.year}`}
              renderInput={(params) => <TextField {...params} label="Year" />}
              inputValue={formData?.batch}
              onInputChange={(event, newInputValue) => {
                setFormData({ ...formData, batch: newInputValue });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => (isEdit ? editSubject() : addSubject())}
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
                <TableCell align="right">Class</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Batch</TableCell>{" "}
                <TableCell align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.class}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.batch}</TableCell>
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
