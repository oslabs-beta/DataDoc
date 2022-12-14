import React from 'react';
import DonutChart from './DonutChart.jsx';
import Histogram from './Histogram.jsx';

export default function Dashboard() {
    return (
        <div>
        <div>This is Dashboard</div>
        <Histogram />
        <DonutChart />
        </div>
    );
  }