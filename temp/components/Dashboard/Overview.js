import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const taskDistribution = [
  { name: 'Critical', value: 2, color: '#f44336' },
  { name: 'High', value: 4, color: '#ff9800' },
  { name: 'Medium', value: 8, color: '#2196f3' },
  { name: 'Low', value: 6, color: '#4caf50' },
];

const weeklyProgress = [
  { name: 'Mon', completed: 5, assigned: 8 },
  { name: 'Tue', completed: 7, assigned: 10 },
  { name: 'Wed', completed: 4, assigned: 6 },
  { name: 'Thu', completed: 6, assigned: 8 },
  { name: 'Fri', completed: 8, assigned: 12 },
];

const Overview = ({ stats }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Task Distribution by Priority
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {taskDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Weekly Task Progress
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" name="Completed" fill="#4caf50" />
                <Bar dataKey="assigned" name="Assigned" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {/* Add activity feed component here */}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Overview;
