import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Chip, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { engineersData } from '../../data/engineersData';

// Fix for default marker icons in React-Leaflet
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icons for different availability states
const availableIcon = new L.Icon({
  ...defaultIcon.options,
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const busyIcon = new L.Icon({
  ...defaultIcon.options,
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'critical':
      return 'error';
    case 'high':
      return 'warning';
    case 'medium':
      return 'info';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

// Flatten engineers data for map
const getAllEngineers = () => {
  return Object.values(engineersData).reduce((acc, team) => {
    return [...acc, ...team.engineers];
  }, []);
};

// Map controller component for programmatic zoom
const MapController = ({ selectedEngineer }) => {
  const map = useMap();
  
  React.useEffect(() => {
    if (selectedEngineer) {
      map.setView(selectedEngineer.coordinates, 8);
    } else {
      // Reset to show all engineers
      const engineers = getAllEngineers();
      const center = engineers.reduce(
        (acc, eng) => {
          return [acc[0] + eng.coordinates[0] / engineers.length, acc[1] + eng.coordinates[1] / engineers.length];
        },
        [0, 0]
      );
      map.setView(center, 2);
    }
  }, [selectedEngineer, map]);

  return null;
};

const MapEvents = ({ setSelectedEngineer }) => {
  useMapEvents({
    click: () => {
      setSelectedEngineer(null);
    },
  });
  return null;
};

const MapView = () => {
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const engineers = getAllEngineers();
  
  // Calculate center point (average of all coordinates)
  const center = engineers.reduce(
    (acc, eng) => {
      return [acc[0] + eng.coordinates[0] / engineers.length, acc[1] + eng.coordinates[1] / engineers.length];
    },
    [0, 0]
  );

  const handleEngineerSelect = (event) => {
    if (event.target.value === '') {
      setSelectedEngineer(null);
    } else {
      const selected = engineers.find(eng => eng.name === event.target.value);
      setSelectedEngineer(selected);
    }
  };

  return (
    <Card sx={{ height: 'calc(100vh - 200px)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
          <Typography variant="h6">
            Engineer Locations
          </Typography>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Engineer</InputLabel>
            <Select
              value={selectedEngineer?.name || ''}
              onChange={handleEngineerSelect}
              label="Select Engineer"
              size="small"
            >
              <MenuItem value="">Show All Engineers</MenuItem>
              {engineers.map((engineer) => (
                <MenuItem key={engineer.name} value={engineer.name}>
                  {engineer.name} ({engineer.location})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <MapContainer
          center={center}
          zoom={2}
          style={{ height: 'calc(100vh - 300px)', width: '100%' }}
        >
          <MapEvents setSelectedEngineer={setSelectedEngineer} />
          <MapController selectedEngineer={selectedEngineer} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {engineers.map((engineer) => (
            <Marker
              key={engineer.name}
              position={engineer.coordinates}
              icon={engineer.availability === 'Available' ? availableIcon : busyIcon}
              eventHandlers={{
                click: () => setSelectedEngineer(engineer),
              }}
            >
              <Popup>
                <Box sx={{ minWidth: 200, p: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {engineer.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    📍 {engineer.location}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    🛠️ Skills: {engineer.skills.join(', ')}
                  </Typography>
                  <Box sx={{ mt: 1, mb: 1 }}>
                    <Chip
                      label={engineer.availability}
                      color={engineer.availability === 'Available' ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2">
                    📋 Tasks: {engineer.currentTasks.count}
                    {engineer.currentTasks.priority && (
                      <Chip
                        label={engineer.currentTasks.priority}
                        color={getPriorityColor(engineer.currentTasks.priority)}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                </Box>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </CardContent>
    </Card>
  );
};

export default MapView;
