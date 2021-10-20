import React, { useState, useEffect } from "react";
import { API_SERVICE } from "../../../config";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import { Animation } from "@devexpress/dx-react-chart";

const Reports = () => {
  const data = [
    { year: "1950", population: 2.525 },
    { year: "1960", population: 3.018 },
    { year: "1970", population: 3.682 },
    { year: "1980", population: 4.44 },
    { year: "1990", population: 5.31 },
    { year: "2000", population: 6.127 },
    { year: "2010", population: 6.93 },
  ];

  const [chartData, setChartData] = useState(data);

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

  console.log(forms);

  return (
    <div>
      <Paper>
        <Chart data={forms}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="noOfResponses" argumentField="title" />
          <Title text="Responses" />
          <Animation />
        </Chart>
      </Paper>
    </div>
  );
};

export default Reports;
