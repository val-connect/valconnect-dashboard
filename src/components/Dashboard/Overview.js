import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { engineersData } from '../../data/engineersData';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Color constants
const COLORS = {
  Critical: '#ff1744',
  High: '#ff9100',
  Medium: '#2196f3',
  Low: '#4caf50',
  None: '#9e9e9e',
  northIndia: '#8884d8',
  southIndia: '#82ca9d',
  global: '#ffc658',
};

const Overview = () => {
  const calculateMetrics = () => {
    let totalTasks = 0;
    let highPriorityTasks = 0;
    let activeEngineers = 0;
    let busyEngineers = 0;
    let tasksByPriority = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
      None: 0
    };

    Object.values(engineersData).forEach(region => {
      region.engineers.forEach(engineer => {
        const taskCount = engineer.currentTasks?.count || 0;
        totalTasks += taskCount;

        const priority = engineer.currentTasks?.priority || 'None';
        if (priority === 'High' || priority === 'Critical') {
          highPriorityTasks += taskCount;
        }

        if (engineer.availability === 'Available') {
          activeEngineers++;
        } else if (engineer.availability === 'Busy') {
          busyEngineers++;
        }

        tasksByPriority[priority] = (tasksByPriority[priority] || 0) + taskCount;
      });
    });

    return {
      totalTasks,
      highPriorityTasks,
      activeEngineers,
      busyEngineers,
      tasksByPriority
    };
  };

  const metrics = calculateMetrics();

  const statCards = [
    {
      title: 'Available Engineers',
      value: metrics.activeEngineers,
      subtitle: `of ${metrics.activeEngineers + metrics.busyEngineers} total`,
      color: '#e8f5e9',
      textColor: '#2e7d32'
    },
    {
      title: 'Busy Engineers',
      value: metrics.busyEngineers,
      subtitle: 'currently engaged',
      color: '#ffebee',
      textColor: '#c62828'
    },
    {
      title: 'Total Tasks',
      value: metrics.totalTasks,
      subtitle: `${metrics.highPriorityTasks} high priority`,
      color: '#e3f2fd',
      textColor: '#1565c0'
    },
    {
      title: 'Team Coverage',
      value: Object.keys(engineersData).length,
      subtitle: 'global regions',
      color: '#fff3e0',
      textColor: '#e65100'
    }
  ];

  const taskPriorityData = Object.entries(metrics.tasksByPriority)
    .filter(([_, count]) => count > 0)
    .map(([priority, count]) => ({
      priority,
      Tasks: count
    }));

  const regionData = Object.entries(engineersData).map(([key, region]) => ({
    name: region.name,
    value: region.engineers.length,
    color: COLORS[key]
  }));

  return (
    <Grid container spacing={3}>
      {statCards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent sx={{ bgcolor: card.color }}>
              <Typography variant="h6" sx={{ color: card.textColor, mb: 1 }}>
                {card.title}
              </Typography>
              <Typography variant="h3" sx={{ color: card.textColor, mb: 1 }}>
                {card.value}
              </Typography>
              <Typography variant="body2" sx={{ color: card.textColor }}>
                {card.subtitle}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Task Priority Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={taskPriorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="priority" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Tasks">
                    {taskPriorityData.map((entry) => (
                      <Cell 
                        key={`cell-${entry.priority}`}
                        fill={COLORS[entry.priority]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Engineer Distribution by Region
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={regionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {regionData.map((entry) => (
                      <Cell 
                        key={`cell-${entry.name}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Overview;
