import React  from 'react';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';

export default function Heatmap() {

    // get points from server api/points
    const [points, setPoints] = useState([]);

    const endpoint = process.env.API_ENDPOINT || 'http://localhost:8000';
    useEffect(() => {
        fetch(endpoint + '/api/points')
            .then(res => res.json())
            .then(data => {
                setPoints(data);
            });
    }, []);

    return (
        <div>
            <MapContainer center={[39.952583, -75.165222]} zoom={11}
            style={{ height: '100vh', width: '100wh'}}>
                <HeatmapLayer
                    points={points}
                    longitudeExtractor={m => m.lng}
                    latitudeExtractor={m => m.lat}
                    intensityExtractor={_ => 1} />
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </div>
    );
}