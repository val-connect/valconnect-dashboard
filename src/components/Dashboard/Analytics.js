import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { engineersData } from '../../data/engineersData';

// Function to get all engineers
const getAllEngineers = () => {
  return Object.values(engineersData).reduce((acc, team) => {
    return [...acc, ...team.engineers];
  }, []);
};

// Function to get task completion data
const getTaskCompletionData = () => {
  const engineers = getAllEngineers();
  const priorityCount = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
    None: 0,
  };

  engineers.forEach(engineer => {
    if (engineer.currentTasks.priority) {
      priorityCount[engineer.currentTasks.priority] += engineer.currentTasks.count;
    } else {
      priorityCount.None += engineer.currentTasks.count;
    }
  });

  return Object.entries(priorityCount).map(([priority, count]) => ({
    priority,
    tasks: count,
  }));
};

// Function to get engineer performance data
const getEngineerPerformanceData = () => {
  return getAllEngineers().map(engineer => ({
    name: engineer.name,
    tasks: engineer.currentTasks.count,
    skills: engineer.skills.length,
    location: engineer.location,
    availability: engineer.availability,
  }));
};

// Function to get task distribution by region
const getTaskDistributionData = () => {
  return Object.entries(engineersData).map(([region, data]) => {
    const totalTasks = data.engineers.reduce((sum, engineer) => 
      sum + engineer.currentTasks.count, 0
    );
    return {
      name: data.name,
      value: totalTasks,
    };
  });
};

// Function to calculate SLA metrics
const getSLAMetrics = () => {
  const engineers = getAllEngineers();
  const totalEngineers = engineers.length;
  const availableEngineers = engineers.filter(eng => eng.availability === 'Available').length;
  const busyEngineers = engineers.filter(eng => eng.availability === 'Busy').length;
  const totalTasks = engineers.reduce((sum, eng) => sum + eng.currentTasks.count, 0);
  
  return [
    {
      metric: 'Engineer Availability Rate',
      target: '> 70%',
      actual: `${Math.round((availableEngineers / totalEngineers) * 100)}%`,
      status: (availableEngineers / totalEngineers) > 0.7 ? 'Met' : 'Not Met',
    },
    {
      metric: 'Average Tasks per Engineer',
      target: '< 3',
      actual: (totalTasks / totalEngineers).toFixed(1),
      status: (totalTasks / totalEngineers) < 3 ? 'Met' : 'Not Met',
    },
    {
      metric: 'Resource Utilization',
      target: '> 80%',
      actual: `${Math.round((busyEngineers / totalEngineers) * 100)}%`,
      status: (busyEngineers / totalEngineers) > 0.8 ? 'Met' : 'Not Met',
    },
  ];
};

const COLORS = {
  Critical: '#ff1744', // Red
  High: '#ff9100',     // Orange
  Medium: '#2196f3',   // Blue
  Low: '#4caf50',      // Green
  None: '#9e9e9e',     // Grey
  'North India Engineers': '#8884d8', // Purple
  'South India Engineers': '#82ca9d', // Light Green
  'Global Engineers': '#ffc658',     // Yellow
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Analytics = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const taskCompletionData = getTaskCompletionData();
  const engineerPerformanceData = getEngineerPerformanceData();
  const taskDistributionData = getTaskDistributionData();
  const slaMetrics = getSLAMetrics();

  return (
    <Card sx={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Analytics Dashboard
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Task Priority Distribution" />
            <Tab label="Engineer Performance" />
            <Tab label="Regional Distribution" />
            <Tab label="SLA Metrics" />
          </Tabs>
        </Box>

        {/* Task Priority Distribution Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasks" name="Number of Tasks">
                  {taskCompletionData.map((entry) => (
                    <Cell key={entry.priority} fill={COLORS[entry.priority]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </TabPanel>

        {/* Engineer Performance Tab */}
        <TabPanel value={tabValue} index={1}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Engineer Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Current Tasks</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Availability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {engineerPerformanceData.map((engineer) => (
                  <TableRow key={engineer.name}>
                    <TableCell>{engineer.name}</TableCell>
                    <TableCell>{engineer.location}</TableCell>
                    <TableCell>{engineer.tasks}</TableCell>
                    <TableCell>{engineer.skills}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          color: engineer.availability === 'Available' ? 'success.main' : 'error.main',
                          fontWeight: 'medium',
                        }}
                      >
                        {engineer.availability}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Regional Distribution Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={taskDistributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {taskDistributionData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </TabPanel>

        {/* SLA Metrics Tab */}
        <TabPanel value={tabValue} index={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell>Target</TableCell>
                  <TableCell>Actual</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slaMetrics.map((metric) => (
                  <TableRow key={metric.metric}>
                    <TableCell>{metric.metric}</TableCell>
                    <TableCell>{metric.target}</TableCell>
                    <TableCell>{metric.actual}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          color: metric.status === 'Met' ? 'success.main' : 'error.main',
                          fontWeight: 'medium',
                        }}
                      >
                        {metric.status}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default Analytics;
