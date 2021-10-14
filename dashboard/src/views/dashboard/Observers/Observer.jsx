import React, { useState, useEffect } from "react";
import { useGeneratedForm } from "react-form-dynamic";
import {
  Button,
  Container,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";
import { API_SERVICE } from "../../../config";
import axios from "axios";
import { useParams } from "react-router-dom";

const Observer = () => {
  const { id } = useParams();
  const [openForm, setOpenForm] = useState(false);
  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const [fields, setFields] = useState([]);
  const initialState = { type: "", name: "", label: "" };
  const [formData, setFormData] = useState(initialState);

  const addField = () => {
    var newData = {
      name: formData.name,
      label: formData.label,
      type:
        formData.type === "Textfield"
          ? "text"
          : formData.type === "Email"
          ? "email"
          : "password",
      validations: [
        {
          rule: "required",
          params: ["Required"],
        },
      ],
    };

    setFields((prev) => [...prev, newData]);
    // fields.push(newData);
    setFormData(initialState);
  };

  const [forms, setForms] = useState([]);

  const saveForm = async () => {
    const fieldData = {
      fields: [
        ...fields,
        {
          name: "submit",
          label: "Submit",
          type: "element",
          element: <button>submit</button>,
        },
      ],
      observerId: id,
    };
    await axios
      .post(`${API_SERVICE}/saveform`, fieldData)
      .then((res) => {
        handleCloseForm();
      })
      .catch((err) => console.log(err));
  };

  const getForms = async () => {
    await axios
      .get(`${API_SERVICE}/getforms/${id}`)
      .then((res) => {
        setForms(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteRow = async (id) => {
    await axios
      .delete(`${API_SERVICE}/deleteform/${id}`)
      .then((res) => getForms())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getForms();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => {
            handleClickOpenForm();
          }}
        >
          Add Forms
        </Button>
        <Dialog
          open={openForm}
          onClose={handleCloseForm}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Add Form</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                fullWidth
                value={formData.type}
                label="Field"
                onChange={(e) => {
                  setFormData({ ...formData, type: e.target.value });
                }}
              >
                <MenuItem value={"Textfield"}>Textfield</MenuItem>
                <MenuItem value={"Email"}>Email</MenuItem>
                <MenuItem value={"Password"}>Password</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Name"
              value={formData?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Label"
              value={formData?.label}
              onChange={(e) =>
                setFormData({ ...formData, label: e.target.value })
              }
              sx={{ mt: 2 }}
            />
            <center>
              <Button onClick={addField} variant="contained" sx={{ mt: 3 }}>
                ADD
              </Button>
            </center>
            <h5>Number Of Fields in Form : {fields.length}</h5>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button onClick={saveForm} autoFocus>
              Save to Database
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Container sx={{ mt: 5 }} maxWidth="lg">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">No. Of Fields</TableCell>
                <TableCell align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell align="right">{row?.fields?.length}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() =>
                        (window.location.href = `/viewform/${row._id}`)
                      }
                    >
                      Preview
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

export default Observer;
