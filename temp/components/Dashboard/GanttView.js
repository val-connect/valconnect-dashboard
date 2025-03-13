import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Gantt } from '@dhtmlx/trial-react-gantt';

const tasks = {
  data: [
    {
      id: 1,
      text: 'Server Maintenance',
      start_date: '2025-03-01',
      duration: 3,
      progress: 0.6,
    },
    {
      id: 2,
      text: 'Network Setup',
      start_date: '2025-03-02',
      duration: 2,
      progress: 0.3,
    },
  ],
  links: [
    { id: 1, source: 1, target: 2, type: '0' }
  ]
};

const GanttView = () => {
  return (
    <Card sx={{ height: 'calc(100vh - 200px)' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Task Timeline
        </Typography>
        <div style={{ height: 'calc(100vh - 300px)', width: '100%' }}>
          <Gantt tasks={tasks} />
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttView;
