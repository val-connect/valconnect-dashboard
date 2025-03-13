import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { engineersData } from '../../data/engineersData';

const PriorityCard = () => {
  // Calculate high priority tasks
  const highPriorityCount = Object.values(engineersData).reduce((count, region) => {
    return count + region.engineers.reduce((engineerCount, engineer) => {
      if (engineer.currentTasks.priority === 'High' || engineer.currentTasks.priority === 'Critical') {
        return engineerCount + engineer.currentTasks.count;
      }
      return engineerCount;
    }, 0);
  }, 0);

  return (
    <Card sx={{ 
      bgcolor: '#1e3c72', 
      color: 'white',
      height: '100%',
      borderRadius: 2,
      boxShadow: 3
    }}>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <Typography 
          variant="h1" 
          component="div" 
          sx={{ 
            fontSize: '4rem',
            fontWeight: 'bold',
            mb: 2
          }}
        >
          {highPriorityCount}
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)',
            letterSpacing: 1
          }}
        >
          High Priority
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PriorityCard;
