import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
} from '@mui/material';
import {
  Engineering,
  Assignment,
  PriorityHigh,
} from '@mui/icons-material';
import Topbar from './Topbar';
import Overview from './Overview';
import TaskList from './TaskList';
import MapView from './MapView';
import KanbanBoard from './KanbanBoard';
import GanttView from './GanttView';
import CalendarView from './CalendarView';
import Analytics from './Analytics';
import Teams from './Teams';
import { Routes, Route, Navigate } from 'react-router-dom';

const DashboardRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

const Main = styled('main')({
  flexGrow: 1,
  padding: '24px',
  backgroundColor: '#0A1929',
  minHeight: '100vh',
  marginTop: '64px', // Height of the Topbar
});

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const Dashboard = () => {
  const stats = {
    totalTasks: 12,
    highPriority: 3,
    availableEngineers: 5,
  };

  return (
    <DashboardRoot>
      <Topbar />
      <Main>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <StatsCard>
              <Assignment sx={{ fontSize: 40, color: 'primary.main' }} />
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalTasks}</Box>
                <Box sx={{ color: 'text.secondary' }}>Total Tasks</Box>
              </Box>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard>
              <PriorityHigh sx={{ fontSize: 40, color: 'error.main' }} />
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.highPriority}</Box>
                <Box sx={{ color: 'text.secondary' }}>High Priority</Box>
              </Box>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard>
              <Engineering sx={{ fontSize: 40, color: 'success.main' }} />
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Box sx={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.availableEngineers}</Box>
                <Box sx={{ color: 'text.secondary' }}>Available Engineers</Box>
              </Box>
            </StatsCard>
          </Grid>
          <Grid item xs={12}>
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/kanban" element={<KanbanBoard />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/gantt" element={<GanttView />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/teams" element={<Teams />} />
            </Routes>
          </Grid>
        </Grid>
      </Main>
    </DashboardRoot>
  );
};

export default Dashboard;
