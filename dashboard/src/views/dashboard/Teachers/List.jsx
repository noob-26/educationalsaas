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
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const initialState = {
    fName: "",
    lName: "",
    DOB: "",
    Subject: "",
    Designation: "",
    Salary: "",
    dateOfJoining: "",
    Class: "",
    Email: "",
    Phone: "",
    Address: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData(initialState);
    setOpen(false);
    setIsEdit(false);
  };

  const editTeacher = async () => {
    await axios
      .patch(`${API_SERVICE}/editteacherlist`, formData)
      .then((res) => {
        getTeachers();
        handleClose();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };

  const addTeacher = async () => {
    await axios
      .post(`${API_SERVICE}/addteacherlist`, formData)
      .then((res) => {
        getTeachers();
        handleClose();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };

  const getTeachers = async () => {
    await axios
      .get(`${API_SERVICE}/getteacherlist`)
      .then((res) => setTeachers(res.data))
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
      .delete(`${API_SERVICE}/deleteteacher/${id}`)
      .then((res) => getTeachers())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getClass();
    getTeachers();
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
        Total Number of Teachers : {teachers?.length}
        <Button onClick={handleClickOpen} variant="contained">
          ADD TEACHER
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{isEdit ? "Edit" : "Add"} Teacher</DialogTitle>
          <DialogContent>
            <TextField
              label="First Name"
              value={formData?.fName}
              onChange={(e) =>
                setFormData({ ...formData, fName: e.target.value })
              }
              sx={{ mt: 2, width: "47%" }}
            />
            <TextField
              label="Last Name"
              value={formData?.lName}
              onChange={(e) =>
                setFormData({ ...formData, lName: e.target.value })
              }
              sx={{ mt: 2, width: "47%", ml: 3 }}
            />
            <TextField
              id="date"
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mt: 3 }}
              value={formData.DOB}
              onChange={(e) =>
                setFormData({ ...formData, DOB: e.target.value })
              }
            />
            <Autocomplete
              fullWidth
              disablePortal
              options={classes}
              sx={{ mt: 2 }}
              getOptionLabel={(option) => `${option.name}`}
              renderInput={(params) => <TextField {...params} label="Class" />}
              inputValue={formData.Class}
              onInputChange={(event, newInputValue) => {
                setFormData({ ...formData, Class: newInputValue });
              }}
            />
            <TextField
              label="Subject"
              fullWidth
              value={formData?.Subject}
              onChange={(e) =>
                setFormData({ ...formData, Subject: e.target.value })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Designation"
              fullWidth
              value={formData?.Designation}
              onChange={(e) =>
                setFormData({ ...formData, Designation: e.target.value })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Salary"
              fullWidth
              value={formData?.Salary}
              onChange={(e) =>
                setFormData({ ...formData, Salary: e.target.value })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              label="Email"
              value={formData?.Email}
              onChange={(e) =>
                setFormData({ ...formData, Email: e.target.value })
              }
              sx={{ mt: 2, width: "30%" }}
            />
            <TextField
              label="Phone"
              value={formData?.Phone}
              onChange={(e) =>
                setFormData({ ...formData, Phone: e.target.value })
              }
              sx={{ mt: 2, width: "30%", ml: 3 }}
            />
            <TextField
              label="Address"
              value={formData?.Address}
              onChange={(e) =>
                setFormData({ ...formData, Address: e.target.value })
              }
              sx={{ mt: 2, width: "30%", ml: 3 }}
            />

            <TextField
              id="date"
              label="Date of Joining"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ mt: 3 }}
              value={formData.dateOfJoining}
              onChange={(e) =>
                setFormData({ ...formData, dateOfJoining: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => (isEdit ? editTeacher() : addTeacher())}
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
                <TableCell align="right">Subject</TableCell>
                <TableCell align="right">Designation</TableCell>
                <TableCell align="right">Email</TableCell>{" "}
                <TableCell align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fName} {row.lName}
                  </TableCell>
                  <TableCell align="right">{row.Class}</TableCell>
                  <TableCell align="right">{row.Subject}</TableCell>
                  <TableCell align="right">{row.Designation}</TableCell>
                  <TableCell align="right">{row.Email}</TableCell>
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
