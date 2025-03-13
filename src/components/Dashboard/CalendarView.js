import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Box,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Stack,
  Tooltip,
  Button
} from '@mui/material';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameMonth,
  addDays,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  getDay,
  getDaysInMonth,
  sub,
  add
} from 'date-fns';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { engineersData } from '../../data/engineersData';

const priorityColors = {
  Critical: '#ff1744',
  High: '#ff9100',
  Medium: '#2196f3',
  Low: '#4caf50',
  None: '#9e9e9e',
};

const getAllEngineers = () => {
  const engineers = [];
  let taskCounter = 0;
  const startOfMarch = new Date(2025, 2, 1); // March 1st, 2025

  Object.values(engineersData).forEach(region => {
    if (region.engineers) {
      engineers.push(...region.engineers.map(engineer => {
        const tasks = [];
        if (engineer.currentTasks && engineer.currentTasks.count > 0) {
          for (let i = 0; i < engineer.currentTasks.count; i++) {
            // Spread tasks across March (31 days)
            const taskDate = new Date(startOfMarch);
            taskDate.setDate(1 + (taskCounter % 31)); // Cycle through days 1-31
            
            tasks.push({
              id: `${engineer.name}-task-${i}`,
              description: `${engineer.skills[0]} Task ${i + 1}`,
              startDate: taskDate,
              priority: engineer.currentTasks.priority || 'Low',
              status: engineer.availability
            });
            taskCounter++;
          }
        }
        return {
          ...engineer,
          tasks
        };
      }));
    }
  });
  return engineers;
};

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const engineers = getAllEngineers();

  const handlePrevious = () => {
    setCurrentDate(sub(currentDate, { months: 1 }));
  };

  const handleNext = () => {
    setCurrentDate(add(currentDate, { months: 1 }));
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const getDaysToShow = () => {
    if (view === 'day') {
      return [currentDate];
    }
    if (view === 'week') {
      const start = startOfWeek(currentDate);
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }
    // Month view
    const start = startOfMonth(currentDate);
    const firstDayOfMonth = getDay(start);
    const daysInMonth = getDaysInMonth(currentDate);
    
    return Array.from(
      { length: firstDayOfMonth + daysInMonth },
      (_, i) => {
        if (i < firstDayOfMonth) {
          return sub(start, { days: firstDayOfMonth - i });
        }
        return add(start, { days: i - firstDayOfMonth });
      }
    );
  };

  const tasksByDate = useMemo(() => {
    const taskMap = {};
    engineers.forEach(engineer => {
      engineer.tasks.forEach(task => {
        const dateStr = format(new Date(task.startDate), 'yyyy-MM-dd');
        if (!taskMap[dateStr]) {
          taskMap[dateStr] = [];
        }
        taskMap[dateStr].push({
          ...task,
          engineer: engineer.name,
          id: task.id
        });
      });
    });
    return taskMap;
  }, [engineers]);

  const days = getDaysToShow();

  return (
    <Card sx={{ height: 'calc(100vh - 200px)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Task Calendar</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  textTransform: 'none',
                  px: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="day">Day</ToggleButton>
              <ToggleButton value="week">Week</ToggleButton>
              <ToggleButton value="month">Month</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 280px)', bgcolor: 'background.paper' }}>
          <Grid container spacing={1}>
            {view !== 'day' && (
              <Grid container item spacing={0}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <Grid item xs key={day}>
                    <Box sx={{ 
                      p: 1, 
                      textAlign: 'center',
                      borderBottom: 1,
                      borderColor: 'divider',
                      bgcolor: 'background.paper'
                    }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {day}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}

            <Grid container item spacing={1}>
              {days.map((day, index) => {
                const dateStr = format(day, 'yyyy-MM-dd');
                const dayTasks = tasksByDate[dateStr] || [];
                const isCurrentDay = isToday(day);

                return (
                  <Grid item xs={view === 'day' ? 12 : true} key={day.toString()}>
                    <Paper
                      elevation={0}
                      sx={{
                        height: '100%',
                        minHeight: 120,
                        p: 1,
                        bgcolor: isCurrentDay ? 'action.hover' : 'background.paper',
                        border: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 8,
                          color: isCurrentDay ? 'primary.main' : 'text.secondary',
                          fontWeight: isCurrentDay ? 'bold' : 'normal',
                        }}
                      >
                        {format(day, 'd')}
                      </Typography>

                      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto' }}>
                        {dayTasks.map(task => (
                          <Tooltip
                            key={task.id}
                            title={
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {task.description}
                                </Typography>
                                <Typography variant="body2">
                                  Engineer: {task.engineer}
                                </Typography>
                                <Typography variant="body2">
                                  Priority: {task.priority}
                                </Typography>
                              </Box>
                            }
                            arrow
                          >
                            <Card
                              sx={{
                                p: 1,
                                bgcolor: priorityColors[task.priority] || priorityColors.None,
                                color: 'white',
                                boxShadow: 1,
                                '&:hover': {
                                  boxShadow: 2,
                                  transform: 'translateY(-1px)',
                                },
                                transition: 'all 0.2s',
                              }}
                            >
                              <Typography variant="caption" noWrap>
                                {task.description}
                              </Typography>
                            </Card>
                          </Tooltip>
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
