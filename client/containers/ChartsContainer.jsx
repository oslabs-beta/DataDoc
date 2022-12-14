import React from 'react';
import DonutChart from '../components/DonutChart.jsx';
import Histogram from '../components/Histogram.jsx';

const ChartsContainer = (props) => {
    return (
        <div>
        <div>This is Dashboard</div>
        <Histogram />
        <DonutChart />
        </div>
    );
};

export default ChartsContainer;