import React from 'react';
import DonutChart from './DonutChart.jsx';
import Histogram from './Histogram.jsx';

export default function Chart() {
    return (
        <div>
        <Histogram />
        <DonutChart />
        </div>
    );
  }