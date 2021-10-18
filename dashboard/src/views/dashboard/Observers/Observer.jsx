import React, { useState, useEffect, Suspense } from "react";
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
import { Form } from "antd";
import FormBuilder from "antd-form-builder";
import { v4 as uuid } from "uuid";

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
  const initialState = { type: "", label: "" };
  const [formData, setFormData] = useState(initialState);

  const addField = () => {
    var newData = {
      label: formData.label,
      type: formData.type,
      required: true,
      value: "",
      id: uuid(),
      options: formData?.options?.split(",") || "",
      optionType:
        formData.type === "Select"
          ? 2
          : formData.type === "CheckBox"
          ? 3
          : formData.type === "Radio"
          ? 4
          : 1,
      selected: formData.type === "CheckBox" && [],
    };
    console.log(newData);
    setFields((prev) => [...prev, newData]);
    setFormData(initialState);
  };

  const [forms, setForms] = useState([]);
  const [title, setTitle] = useState("");

  const saveForm = async () => {
    const fieldData = {
      fields,
      observerId: id,
      title,
    };
    await axios
      .post(`${API_SERVICE}/saveform`, fieldData)
      .then((res) => {
        handleCloseForm();
        getForms();
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
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mt: 2 }}
            />
            <hr />

            <FormControl fullWidth sx={{ mt: 1 }}>
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
                <MenuItem value={"Select"}>Select</MenuItem>
                <MenuItem value={"CheckBox"}>CheckBox</MenuItem>
                <MenuItem value={"Radio"}>Radio</MenuItem>
              </Select>
            </FormControl>
            {formData.type === "Select" && (
              <TextField
                fullWidth
                label="Options"
                value={formData?.options}
                onChange={(e) =>
                  setFormData({ ...formData, options: e.target.value })
                }
                placeholder="Type all the options seperated by commas(,)"
                sx={{ mt: 2 }}
              />
            )}
            {formData.type === "CheckBox" && (
              <TextField
                fullWidth
                label="Options"
                value={formData?.options}
                onChange={(e) =>
                  setFormData({ ...formData, options: e.target.value })
                }
                placeholder="Type all the options seperated by commas(,)"
                sx={{ mt: 2 }}
              />
            )}
            {formData.type === "Radio" && (
              <TextField
                fullWidth
                label="Options"
                value={formData?.options}
                onChange={(e) =>
                  setFormData({ ...formData, options: e.target.value })
                }
                placeholder="Type all the options seperated by commas(,)"
                sx={{ mt: 2 }}
              />
            )}
            <TextField
              fullWidth
              label="Name"
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
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row?.fields?.length}</TableCell>
                  <TableCell align="center">
                    <Button
                      // onClick={() =>
                      //   (window.location.href = `/viewresponses/${row._id}`)
                      // }
                      href={`/viewresponses/${row._id}`}
                      target="_blank"
                    >
                      View Responses
                    </Button>
                    <Button
                      // onClick={() =>
                      //   (window.location.href = `/viewform/${row._id}`)
                      // }
                      href={`/viewform/${row._id}`}
                      target="_blank"
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
