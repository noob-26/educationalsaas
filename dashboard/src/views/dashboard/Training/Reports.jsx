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
  const [chartData, setChartData] = useState([]);

  const [classes, setClasses] = useState([]);
  const getClass = async () => {
    await axios
      .get(`${API_SERVICE}/gettraininglist`)
      .then((res) => {
        setClasses(res.data);
        let test = [];
        res.data.map((data) =>
          test.push({ name: data.name, number: data.teachers.length })
        );
        setChartData(test);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getClass();
  }, []);
  console.log(classes);

  return (
    <div>
      <Paper>
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="number" argumentField="name" />
          <Title text="Trainers" />
          <Animation />
        </Chart>
      </Paper>
    </div>
  );
};

export default Reports;
