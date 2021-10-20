import React, { useState, useEffect } from "react";
import { API_SERVICE } from "../../../config";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Table,
  Typography,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const ViewResponses = () => {
  const { id } = useParams();

  let [responses, setResponses] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_SERVICE}/getformresponses/${id}`)
      .then((res) => {
        setResponses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`${API_SERVICE}/getformpreview/${id}`)
      .then((res) => {
        setTitle(res.data[0].title);
      })
      .catch((err) => console.log(err));
  }, []);

  const [title, setTitle] = useState("");

  console.log(responses);

  return (
    <div style={{ padding: "30px" }}>
      <Container maxWidth="sm">
        <center>
          <h2>{title}</h2>
        </center>
        <hr style={{ marginBottom: "20px" }} />
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

        <Table
          sx={{ minWidth: 650, display: "none" }}
          aria-label="simple table"
          id="table-to-xls"
        >
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responses?.map((row) => (
              <>
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                {row?.data?.map((d) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{d.question}</TableCell>
                    <TableCell>{d.response}</TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
        <h2>Responses</h2>
        {responses.map((resp) => (
          <Paper elevation={4} sx={{ p: 2, mt: 2 }}>
            {resp?.data?.map((d) => (
              <div style={{ display: "flex" }}>
                <Typography sx={{ fontWeight: "bold", minWidth: "30%" }}>
                  {d?.question} :
                </Typography>
                <Typography>{d?.response}</Typography>
              </div>
            ))}
            <Typography sx={{ mt: 2 }} align="right">
              <strong>Submitted On :</strong>
              {resp?.submittedAt.split("T")[0]} at{" "}
              {resp?.submittedAt.split("T")[1].split(".")[0]}
            </Typography>
          </Paper>
        ))}
      </Container>
    </div>
  );
};

export default ViewResponses;
