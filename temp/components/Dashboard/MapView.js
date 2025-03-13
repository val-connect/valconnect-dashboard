import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const engineers = [
  {
    id: 1,
    name: 'John Doe',
    position: [51.505, -0.09],
    tasks: ['Server maintenance', 'Network setup'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: [51.51, -0.1],
    tasks: ['Hardware installation', 'Security audit'],
  },
];

const MapView = () => {
  return (
    <Card sx={{ height: 'calc(100vh - 200px)' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Engineer Locations
        </Typography>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: 'calc(100vh - 300px)', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {engineers.map((engineer) => (
            <Marker key={engineer.id} position={engineer.position}>
              <Popup>
                <Typography variant="subtitle1">{engineer.name}</Typography>
                <Typography variant="body2">Current Tasks:</Typography>
                <ul>
                  {engineer.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
};

export default MapView;
