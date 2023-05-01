import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Label
} from 'recharts';
import { format } from 'date-fns';

const CrimeLineChart = () => {
  const [data, setPoints] = useState([]);

  const endpoint = process.env.API_ENDPOINT || 'http://localhost:8000';
  useEffect(() => {
    fetch(endpoint + '/api/crimeMonthYear')
      .then((res) => res.json())
      .then((data) => {
        setPoints(data);
      });
  }, []);

  return (
    <ResponsiveContainer  height={250}>
    <LineChart  margin={{
      top: 30,
      right: 30,
      left: 20,
      bottom: 5,
    }} data={data}>
      <XAxis dataKey="month">
          <Label value="Month" offset={0} position="insideBottom" />
      </XAxis>
      <YAxis dataKey="num_crimes">
        <Label value="# Crimes" position="left" angle={-90} />
      </YAxis>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="num_crimes" stroke="#8884d8" />
      <Tooltip />
      </LineChart>
      </ResponsiveContainer>
  );
};
  
  export default CrimeLineChart;