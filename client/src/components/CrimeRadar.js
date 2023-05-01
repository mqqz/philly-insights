import React, { useState, useEffect, PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function CrimeRadar(){
    
        const [data, setPoints] = useState([]);

        const endpoint = process.env.API_ENDPOINT || 'http://localhost:8000';
        useEffect(() => {
            fetch(endpoint + '/api/crimeByType')
                .then(res => res.json())
                .then(data => {
                    setPoints(data);
                });
        }, []);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="crime_type" />
          <PolarRadiusAxis />
          <Radar name="crimes" dataKey="crime_count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
}
