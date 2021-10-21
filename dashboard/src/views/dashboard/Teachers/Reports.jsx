import React, { useState, useEffect } from "react";

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
import { API_SERVICE } from "../../../config";
import axios from "axios";

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

  const [teachers, setTeachers] = useState([]);
  const getTeachers = async () => {
    await axios
      .get(`${API_SERVICE}/getteacheryears`)
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTeachers();
  }, []);

  console.log(teachers);

  return (
    <div>
      <Paper>
        <Chart data={teachers}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="total" argumentField="yearOfJoining" />
          <Title text="Reports" />
          <Animation />
        </Chart>
      </Paper>
    </div>
  );
};

export default Reports;
