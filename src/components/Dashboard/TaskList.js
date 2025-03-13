import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Box,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { engineersData } from '../../data/engineersData';

// Function to get all tasks from engineers data
const getAllTasks = () => {
  const tasks = [];
  Object.values(engineersData).forEach(region => {
    region.engineers.forEach(engineer => {
      if (engineer.currentTasks.count > 0) {
        tasks.push({
          id: `${engineer.name}-${engineer.currentTasks.priority || 'None'}`,
          title: `${engineer.skills[0]} Task`,
          assignee: engineer.name,
          location: engineer.location,
          priority: engineer.currentTasks.priority || 'None',
          status: engineer.availability === 'Busy' ? 'In Progress' : 'Pending',
          taskCount: engineer.currentTasks.count,
        });
      }
    });
  });
  return tasks;
};

const priorityColors = {
  Critical: 'error',
  High: 'error',
  Medium: 'warning',
  Low: 'success',
  None: 'default',
};

const statusColors = {
  'In Progress': '#2196f3',
  Pending: '#ff9800',
  Completed: '#4caf50',
};

const TaskList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const tasks = getAllTasks();
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Tasks
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search tasks, assignees, or locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Task Count</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>{task.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={task.priority}
                      color={priorityColors[task.priority]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircleIcon
                        sx={{
                          fontSize: 12,
                          color: statusColors[task.status],
                        }}
                      />
                      {task.status}
                    </Box>
                  </TableCell>
                  <TableCell>{task.taskCount}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(event) => handleMenuClick(event, task)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
          <MenuItem onClick={handleMenuClose}>Edit Task</MenuItem>
          <MenuItem onClick={handleMenuClose}>Mark as Complete</MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default TaskList;
