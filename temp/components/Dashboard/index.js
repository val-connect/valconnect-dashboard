import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Engineering,
  Assignment,
  PriorityHigh,
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import Overview from './Overview';
import TaskList from './TaskList';
import MapView from './MapView';
import KanbanBoard from './KanbanBoard';
import GanttView from './GanttView';
import CalendarView from './CalendarView';

const DashboardRoot = styled('div')({
  display: 'flex',
  height: '100vh',
});

const Main = styled('main')({
  flexGrow: 1,
  padding: '24px',
  backgroundColor: '#0A1929',
  height: '100vh',
  overflow: 'auto',
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('overview');

  const stats = {
    totalTasks: 12,
    highPriority: 0,
    activeEngineers: 5,
  };

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <Overview stats={stats} />;
      case 'tasks':
        return <TaskList />;
      case 'map':
        return <MapView />;
      case 'kanban':
        return <KanbanBoard />;
      case 'gantt':
        return <GanttView />;
      case 'calendar':
        return <CalendarView />;
      default:
        return <Overview stats={stats} />;
    }
  };

  return (
    <DashboardRoot>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ValConnect Manager Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onViewChange={setCurrentView} />
      <Main>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <StatsCard>
              <Assignment sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h4">{stats.totalTasks}</Typography>
              <Typography color="textSecondary">Total Tasks</Typography>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard>
              <PriorityHigh sx={{ fontSize: 40, color: 'error.main' }} />
              <Typography variant="h4">{stats.highPriority}</Typography>
              <Typography color="textSecondary">High Priority</Typography>
            </StatsCard>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard>
              <Engineering sx={{ fontSize: 40, color: 'success.main' }} />
              <Typography variant="h4">{stats.activeEngineers}</Typography>
              <Typography color="textSecondary">Active Engineers</Typography>
            </StatsCard>
          </Grid>
          <Grid item xs={12}>
            {renderView()}
          </Grid>
        </Grid>
      </Main>
    </DashboardRoot>
  );
};

export default Dashboard;
