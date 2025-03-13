import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const TaskCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'transform 0.2s',
  },
}));

const Column = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 'calc(100vh - 300px)',
  overflowY: 'auto',
}));

const initialTasks = {
  todo: [
    { id: 1, title: 'Server Maintenance', priority: 'High' },
    { id: 2, title: 'Network Setup', priority: 'Medium' },
  ],
  inProgress: [
    { id: 3, title: 'Security Audit', priority: 'Critical' },
  ],
  done: [
    { id: 4, title: 'Hardware Installation', priority: 'Low' },
  ],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, sourceColumn }));
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const { task, sourceColumn } = JSON.parse(e.dataTransfer.getData('task'));
    
    if (sourceColumn === targetColumn) return;

    setTasks(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(t => t.id !== task.id),
      [targetColumn]: [...prev[targetColumn], task],
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return '#f44336';
      case 'high':
        return '#ff9800';
      case 'medium':
        return '#2196f3';
      case 'low':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const renderColumn = (title, columnId) => (
    <Grid item xs={12} md={4}>
      <Column
        onDrop={(e) => handleDrop(e, columnId)}
        onDragOver={handleDragOver}
      >
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {tasks[columnId].map((task) => (
          <TaskCard
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task, columnId)}
            elevation={2}
          >
            <Typography variant="subtitle1">{task.title}</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 1,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: getPriorityColor(task.priority),
                }}
              />
              <Typography variant="caption" color="textSecondary">
                {task.priority}
              </Typography>
            </Box>
          </TaskCard>
        ))}
      </Column>
    </Grid>
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Task Board
        </Typography>
        <Grid container spacing={3}>
          {renderColumn('To Do', 'todo')}
          {renderColumn('In Progress', 'inProgress')}
          {renderColumn('Done', 'done')}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default KanbanBoard;
