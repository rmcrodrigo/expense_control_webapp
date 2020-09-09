/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Chart from 'chart.js';

const CreateChart = ({
  chartColors,
  chartLabels,
  chartType,
  chartValues,
  title,
}) => {
  const myChart = useRef(null);

  useEffect(() => {
    new Chart(myChart.current, {
      type: chartType,
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: title || '',
            data: chartValues,
            backgroundColor: chartColors,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              offset: true,
            },
          ],
        },
      },
    });
  }, []);

  return <canvas ref={myChart} height="400" width="400" />;
};

CreateChart.propTypes = {
  chartColors: PropTypes.array,
  chartLabels: PropTypes.array.isRequired,
  chartType: PropTypes.string.isRequired,
  chartValues: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default React.memo(CreateChart);
