import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Graph({ weatherData }) {
  
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // For Null return
  useEffect(() => {
    if (!weatherData) {
      return;
    }

    // Destructuring the object
    const {
      time,
      temperature2mMax,
      temperature2mMin,
      temperature2mMean,
      apparentTemperatureMax,
      apparentTemperatureMin,
      apparentTemperatureMean,
    } = weatherData;

    // Reformat time
    const formattedTime = time.map(date =>
      new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    );

    // Set label limit to improve performance
    const labelLimit = 900;  
    const labelsToUse = formattedTime.slice(0, labelLimit);

    // Settimg up data for Hraph
    const data = {
      labels: labelsToUse,
      datasets: [
        {
          label: 'Max. Temperature',
          data: temperature2mMax.slice(0, labelLimit),
          borderColor: 'red',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'Min. Temperature',
          data: temperature2mMin.slice(0, labelLimit),
          borderColor: 'blue',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: 'Mean Temperature',
          data: temperature2mMean.slice(0, labelLimit),
          borderColor: 'yellow',
          backgroundColor: 'rgba(255, 205, 86, 0.2)',
        },
        {
          label: 'Apparent Max. Temperature',
          data: apparentTemperatureMax.slice(0, labelLimit),
          borderColor: 'violet',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
        },
        {
          label: 'Apparent Min. Temperature',
          data: apparentTemperatureMin.slice(0, labelLimit),
          borderColor: 'pink',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
        },
        {
          label: 'Apparent Mean Temperature',
          data: apparentTemperatureMean.slice(0, labelLimit),
          borderColor: 'orange',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
        },
      ],
    };

    // Configuration for the data and trying to improve performance
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Temperature and Apparent Temperature Chart (°C)',
          },
        },
        animation: {
          duration: 0, 
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            min: -88.3,
            max: 56.7,
            ticks: {
              callback: value => `${value}°C`,
            },
          },
          x: {
            ticks: {
              autoSkip: true, 
              maxRotation: 0,  
              minRotation: 45, 
            },
          },
        },
      },
    };

    // Making Chart here
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, config);

    // Destroy chart instance if weatherData changes
    return () => {
      chartInstance.current.destroy(); 
    };
  }, [weatherData]);

  // If weather data not present then return this
  if (!weatherData) {
    return (
      <div className="mt-4 text-center text-lg text-gray-600">
        No data available to display.
      </div>
    );
  }

  // Return the Chart ref
  return (
    <div className="chart-container mt-4" >
      <canvas ref={chartRef} />
    </div>
  );
}
