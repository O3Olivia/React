import React from 'react';
import ChartBar from './ChartBar';

import './Chart.css';


const Chart = (props) => {
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    const totalMaximum = Math.max(...dataPointValues);

    return (
        // dataPoint는 component로써 props를 통해 dataPoint를 얻는데 이름은 마음대로 정해도 된다.
        // map을 써서 every single dataPoint에다가 chartBar components를 매핑함 
        <div className="chart">
            {props.dataPoints.map((dataPoint) => (
                <ChartBar 
                key={dataPoint.label}
                value={dataPoint.value} 
                maxValue={totalMaximum} 
                label={dataPoint.label}
                />
            ))}
        </div>
    )
};

export default Chart;