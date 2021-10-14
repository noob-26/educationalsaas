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
import { useParams } from "react-router-dom";

const Trainer = () => {
  const { id } = useParams();

  const [classes, setClasses] = useState([]);
  const [open, setOpen] = useState(false);
  const initialState = {
    teacherName: "",
    teacherSubject: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [years, setYears] = useState([]);

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
      .patch(`${API_SERVICE}/edittrainingteacher`, formData)
      .then((res) => {
        getTeachers();
        handleClose();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };

  const addClass = async () => {
    await axios
      .post(`${API_SERVICE}/addtrainingteacher/${id}`, formData)
      .then((res) => {
        getTeachers();
        handleClose();
        setFormData(initialState);
      })
      .catch((err) => console.log(err));
  };

  const getClass = async () => {
    await axios
      .get(`${API_SERVICE}/gettraininglist/${id}`)
      .then((res) => setClasses(res.data[0]))
      .catch((err) => console.log(err));
  };

  const deleteRow = async (row) => {
    await axios
      .post(`${API_SERVICE}/deletetrainingteacher/${id}`, row)
      .then((res) => getTeachers())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getClass();
    getTeachers();
  }, []);

  const [isEdit, setIsEdit] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const getTeachers = async () => {
    await axios
      .get(`${API_SERVICE}/getteacherlist`)
      .then((res) => setTeachers(res.data))
      .catch((err) => console.log(err));
  };

  console.log(formData);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Total Number of Teachers : {classes?.teachers?.length}
        <Button onClick={handleClickOpen} variant="contained">
          ADD TEACHER
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{isEdit ? "Edit" : "Add"} Teacher</DialogTitle>
          <DialogContent>
            <Autocomplete
              fullWidth
              disablePortal
              options={teachers}
              sx={{ mt: 2 }}
              getOptionLabel={(option) => `${option.fName} ${option.lName}`}
              renderInput={(params) => (
                <TextField {...params} label="Teacher Name" />
              )}
              inputValue={formData.teacherName}
              onInputChange={(event, newInputValue) => {
                setFormData({ ...formData, teacherName: newInputValue });
              }}
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  teacherSubject: newValue.subject,
                  teacherName: `${newValue.fName} ${newValue.lName}`,
                });
              }}
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Teacher Name</TableCell>
                {/* <TableCell align="right">Subject</TableCell> */}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes?.teachers?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.teacherName}
                  </TableCell>
                  {/* <TableCell align="center">{row?.teacherSubject}</TableCell> */}
                  <TableCell align="right">
                    {/* <Button
                      onClick={() => {
                        setIsEdit(true);
                        setFormData(row);
                        handleClickOpen();
                      }}
                    >
                      Edit
                    </Button> */}
                    <Button onClick={() => deleteRow(row)}>Delete</Button>
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

export default Trainer;
