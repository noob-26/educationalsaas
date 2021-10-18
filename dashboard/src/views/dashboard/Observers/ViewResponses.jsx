import React, { useState, useEffect } from "react";
import { API_SERVICE } from "../../../config";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Typography, Paper } from "@material-ui/core";

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
