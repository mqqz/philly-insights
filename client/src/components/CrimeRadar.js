import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function CrimeRadar({violence}){
    
        const [data, setPoints] = useState([]);

        const endpoint = process.env.API_ENDPOINT || 'http://localhost:8000';
        useEffect(() => {
            fetch(endpoint + '/api/crimeByType?isViolent=' + violence)
                .then(res => res.json())
              .then(data => {
                    setPoints(data);
                });
        }, []);
  return (
      <ResponsiveContainer height={250}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="crime_type" />
          <PolarRadiusAxis />
          <Radar name="crime_count" dataKey="crime_count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
}
