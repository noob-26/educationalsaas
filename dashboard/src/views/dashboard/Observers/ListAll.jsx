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
} from "@material-ui/core";
import { API_SERVICE } from "../../../config";
import axios from "axios";
import { v4 as uuid } from "uuid";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ListAll = () => {
  const [forms, setForms] = useState([]);

  const getForms = async () => {
    await axios
      .get(`${API_SERVICE}/getallforms`)
      .then((res) => {
        setForms(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getForms();
  }, []);

  return (
    <div>
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
                    <Button href={`/viewresponses/${row._id}`} target="_blank">
                      View Observers
                    </Button>
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

export default ListAll;
