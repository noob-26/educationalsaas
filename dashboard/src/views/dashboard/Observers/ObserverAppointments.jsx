import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { Container, Card } from "@material-ui/core";
import MainCard from "ui-component/cards/MainCard";

import { API_SERVICE } from "../../../config";
import axios from "axios";

const ObserverAppointments = () => {
  const [appts, setAppts] = useState([]);
  const getAppts = async () => {
    await axios
      .get(`${API_SERVICE}/getappt`)
      .then((res) => {
        let sample = [];
        res.data.map((data) =>
          sample.push({ title: data.note, date: data.apptDate.split("T")[0] })
        );
        setAppts(sample);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAppts();
  }, []);

  console.log(appts);

  return (
    <Container maxWidth="md">
      <MainCard>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={appts}
        />
      </MainCard>
    </Container>
  );
};

export default ObserverAppointments;
