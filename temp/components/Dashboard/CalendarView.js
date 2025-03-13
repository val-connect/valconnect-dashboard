import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { format } from 'date-fns';

const CalendarView = () => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  const generateCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card sx={{ height: 'calc(100vh - 200px)' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {format(today, 'MMMM yyyy')}
        </Typography>
        <Grid container spacing={1}>
          {weekDays.map((day) => (
            <Grid item xs={12/7} key={day}>
              <Typography
                align="center"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  py: 1,
                }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          {generateCalendarDays().map((day, index) => (
            <Grid item xs={12/7} key={index}>
              {day && (
                <Card
                  sx={{
                    height: 80,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                    backgroundColor: day === today.getDate() ? 'primary.dark' : 'background.paper',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Typography align="center">{day}</Typography>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
