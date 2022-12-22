import React from "react";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  response: true,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "minute"
      }
    }
  }
};

const fetchedData = {
  "respTimeLineData": [
      {
          "x": "2022-12-21T15:44:37.613820416Z",
          "y": 300
      },
      {
          "x": "2022-12-21T15:44:46.31656425Z",
          "y": 300
      },
      {
          "x": "2022-12-21T15:44:53.557252958Z",
          "y": 305
      },
      {
          "x": "2022-12-21T15:44:59.791679708Z",
          "y": 305
      },
      {
          "x": "2022-12-21T15:46:15.328402166Z",
          "y": 305
      },
      {
          "x": "2022-12-21T15:50:38.680448Z",
          "y": 305
      },
      {
          "x": "2022-12-21T15:52:32.66551125Z",
          "y": 305
      },
      {
          "x": "2022-12-21T15:52:45.93304325Z",
          "y": 305
      },
      {
          "x": "2022-12-21T15:52:50.435318041Z",
          "y": 305
      },
      {
          "x": "2022-12-21T15:53:14.772962958Z",
          "y": 305
      },
      {
          "x": "2022-12-21T15:53:15.736479541Z",
          "y": 305
      },
      {
          "x": "2022-12-21T16:13:49.640846625Z",
          "y": 305
      }
  ],
  "respTimeHistData": {
      "labels": [],
      "data": []
  },
  "reqFreqLineData": {
      "labels": [],
      "data": []
  },
  "statusPieData": {
      "labels": [],
      "data": []
  }
}

const values = fetchedData.respTimeLineData;

export const data = {
  datasets: [
    {
      data: values
    }
  ]
};

export default function Test() {
  return <Line options={options} data={data} />;
}
