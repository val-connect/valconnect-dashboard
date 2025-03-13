import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Chip,
  Avatar,
  Tooltip,
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { engineersData } from '../../data/engineersData';

// Function to get tasks from engineersData
const getTasksFromEngineers = () => {
  const tasksByStatus = {
    todo: [],
    inProgress: [],
    completed: []
  };
  
  let taskId = 1;
  Object.values(engineersData).forEach(region => {
    region.engineers.forEach(engineer => {
      if (engineer.currentTasks.count > 0) {
        // Create tasks based on count
        for (let i = 0; i < engineer.currentTasks.count; i++) {
          const task = {
            id: `task-${taskId}`,
            title: `${engineer.skills[0]} Task ${i + 1}`,
            assignee: engineer.name,
            priority: engineer.currentTasks.priority || 'Low',
            region: region.name,
            skills: engineer.skills,
          };

          // Assign to column based on availability
          if (engineer.availability === 'Busy') {
            tasksByStatus.inProgress.push(task);
          } else if (engineer.availability === 'Available') {
            tasksByStatus.todo.push(task);
          } else {
            tasksByStatus.completed.push(task);
          }
          
          taskId++;
        }
      }
    });
  });

  return tasksByStatus;
};

const columns = {
  todo: {
    title: 'To Do',
    color: '#ff9800',
  },
  inProgress: {
    title: 'In Progress',
    color: '#2196f3',
  },
  completed: {
    title: 'Completed',
    color: '#4caf50',
  },
};

const priorityColors = {
  Critical: '#ff1744',
  High: '#ff9100',
  Medium: '#2196f3',
  Low: '#4caf50',
  None: '#9e9e9e',
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(getTasksFromEngineers());

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      // Reorder within the same column
      const columnTasks = [...tasks[sourceCol]];
      const [removed] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [sourceCol]: columnTasks,
      });
    } else {
      // Move between columns
      const sourceTasks = [...tasks[sourceCol]];
      const destTasks = [...tasks[destCol]];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks,
      });
    }
  };

  return (
    <Card sx={{ height: 'calc(100vh - 200px)' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Kanban Board
        </Typography>
        <DragDropContext onDragEnd={onDragEnd}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 2,
              height: 'calc(100vh - 280px)',
            }}
          >
            {Object.entries(columns).map(([columnId, column]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      p: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      height: '100%',
                      overflowY: 'auto',
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: column.color,
                        }}
                      />
                      <Typography variant="subtitle1">{column.title}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          ml: 'auto',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          px: 1,
                          borderRadius: 1,
                        }}
                      >
                        {tasks[columnId].length}
                      </Typography>
                    </Box>
                    {tasks[columnId].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Tooltip
                            title={
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {task.title}
                                </Typography>
                                <Typography variant="body2">
                                  Region: {task.region}
                                </Typography>
                                <Typography variant="body2">
                                  Skills: {task.skills.join(', ')}
                                </Typography>
                              </Box>
                            }
                            arrow
                          >
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                mb: 2,
                                backgroundColor: snapshot.isDragging
                                  ? 'rgba(255, 255, 255, 0.1)'
                                  : 'background.paper',
                              }}
                            >
                              <CardContent>
                                <Typography variant="subtitle2" gutterBottom>
                                  {task.title}
                                </Typography>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    mt: 1,
                                  }}
                                >
                                  <Avatar
                                    sx={{
                                      width: 24,
                                      height: 24,
                                      fontSize: '0.875rem',
                                    }}
                                  >
                                    {task.assignee[0]}
                                  </Avatar>
                                  <Typography variant="caption">
                                    {task.assignee}
                                  </Typography>
                                  <Chip
                                    label={task.priority}
                                    size="small"
                                    sx={{
                                      ml: 'auto',
                                      backgroundColor: priorityColors[task.priority],
                                      color: 'white',
                                    }}
                                  />
                                </Box>
                              </CardContent>
                            </Card>
                          </Tooltip>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            ))}
          </Box>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};

export default KanbanBoard;
