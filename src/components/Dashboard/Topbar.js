import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MapIcon from '@mui/icons-material/Map';
import TimelineIcon from '@mui/icons-material/Timeline';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupsIcon from '@mui/icons-material/Groups';

const COLORS = {
  overview: '#2196f3',    // Blue
  tasks: '#4caf50',       // Green
  kanban: '#ff9800',      // Orange
  calendar: '#9c27b0',    // Purple
  map: '#f44336',         // Red
  gantt: '#795548',       // Brown
  analytics: '#009688',   // Teal
  teams: '#673ab7',       // Deep Purple
};

const menuItems = [
  { 
    text: 'Overview', 
    path: '/overview', 
    icon: <DashboardIcon sx={{ color: COLORS.overview }} />, 
    color: COLORS.overview 
  },
  { 
    text: 'Tasks', 
    path: '/tasks', 
    icon: <ListAltIcon sx={{ color: COLORS.tasks }} />, 
    color: COLORS.tasks 
  },
  { 
    text: 'Kanban', 
    path: '/kanban', 
    icon: <ViewKanbanIcon sx={{ color: COLORS.kanban }} />, 
    color: COLORS.kanban 
  },
  { 
    text: 'Calendar', 
    path: '/calendar', 
    icon: <CalendarTodayIcon sx={{ color: COLORS.calendar }} />, 
    color: COLORS.calendar 
  },
  { 
    text: 'Map', 
    path: '/map', 
    icon: <MapIcon sx={{ color: COLORS.map }} />, 
    color: COLORS.map 
  },
  { 
    text: 'Gantt', 
    path: '/gantt', 
    icon: <TimelineIcon sx={{ color: COLORS.gantt }} />, 
    color: COLORS.gantt 
  },
  { 
    text: 'Analytics', 
    path: '/analytics', 
    icon: <AnalyticsIcon sx={{ color: COLORS.analytics }} />, 
    color: COLORS.analytics 
  },
  { 
    text: 'Teams', 
    path: '/teams', 
    icon: <GroupsIcon sx={{ color: COLORS.teams }} />, 
    color: COLORS.teams 
  },
];

const Topbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const isCurrentPath = (path) => {
    const currentPath = location.pathname.replace('/valconnect-dashboard', '');
    if (path === '/overview' && (currentPath === '/' || currentPath === '/overview')) return true;
    if (path !== '/overview' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ mr: 4 }}>
          ValConnect Manager
        </Typography>
        
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item) => {
                const isSelected = isCurrentPath(item.path);
                return (
                  <MenuItem
                    key={item.text}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      color: isSelected ? item.color : 'inherit',
                      bgcolor: isSelected ? `${item.color}15` : 'inherit',
                      '&:hover': {
                        bgcolor: `${item.color}25`,
                      },
                    }}
                  >
                    <Box sx={{ mr: 1 }}>
                      {item.icon}
                    </Box>
                    {item.text}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {menuItems.map((item) => {
              const isSelected = isCurrentPath(item.path);
              return (
                <Button
                  key={item.text}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                  sx={{
                    mr: 2,
                    color: isSelected ? item.color : 'inherit',
                    borderBottom: isSelected ? `3px solid ${item.color}` : '3px solid transparent',
                    borderRadius: 0,
                    '&:hover': {
                      bgcolor: `${item.color}25`,
                      borderBottom: `3px solid ${item.color}`,
                    },
                    '& .MuiButton-startIcon': {
                      color: item.color,
                    },
                  }}
                >
                  {item.text}
                </Button>
              );
            })}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
