import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as TaskIcon,
  Map as MapIcon,
  ViewKanban as KanbanIcon,
  Timeline as GanttIcon,
  CalendarToday as CalendarIcon,
  Analytics as AnalyticsIcon,
  Group as TeamIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { id: 'overview', text: 'Overview', icon: DashboardIcon },
  { id: 'tasks', text: 'Tasks', icon: TaskIcon },
  { id: 'map', text: 'Map View', icon: MapIcon },
  { id: 'kanban', text: 'Kanban Board', icon: KanbanIcon },
  { id: 'gantt', text: 'Gantt Chart', icon: GanttIcon },
  { id: 'calendar', text: 'Calendar', icon: CalendarIcon },
  { id: 'analytics', text: 'Analytics', icon: AnalyticsIcon },
  { id: 'team', text: 'Team', icon: TeamIcon },
];

const Sidebar = ({ open, onViewChange }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#132F4C',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 180, 216, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'primary.main' }}>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
    </Drawer>
  );
};

export default Sidebar;
