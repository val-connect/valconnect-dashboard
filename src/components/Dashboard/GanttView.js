import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { engineersData } from '../../data/engineersData';
import { addDays, format } from 'date-fns';

// Function to get all tasks with timeline data
const getTasksWithTimeline = () => {
  const tasks = [];
  const today = new Date();
  let taskId = 1;

  Object.values(engineersData).forEach(region => {
    region.engineers.forEach(engineer => {
      if (engineer.currentTasks.count > 0) {
        // Create a task for each count
        for (let i = 0; i < engineer.currentTasks.count; i++) {
          const startDate = addDays(today, taskId - 1); // Stagger start dates
          
          // Calculate duration based on priority and complexity
          const baselineDuration = engineer.currentTasks.priority === 'Critical' ? 2 :
                                 engineer.currentTasks.priority === 'High' ? 3 :
                                 engineer.currentTasks.priority === 'Medium' ? 4 : 5;
          
          // Adjust duration based on engineer's experience level
          const experienceMultiplier = engineer.experienceLevel === 'Senior' ? 0.8 :
                                     engineer.experienceLevel === 'Mid' ? 1 :
                                     1.2; // Junior
          
          const duration = Math.round(baselineDuration * experienceMultiplier);
          
          // Calculate progress based on engineer's status and time elapsed
          let progress = 0;
          if (engineer.availability === 'Busy') {
            // If engineer is busy, calculate progress based on time elapsed
            const daysElapsed = Math.max(0, Math.floor((today - startDate) / (1000 * 60 * 60 * 24)));
            progress = Math.min(100, Math.round((daysElapsed / duration) * 100));
          } else if (Math.random() < 0.7) { // Add random progress to some tasks
            progress = Math.floor(Math.random() * 100);
          }
          
          tasks.push({
            id: taskId,
            task: `${engineer.skills[0]} Task ${i + 1}`,
            engineer: engineer.name,
            priority: engineer.currentTasks.priority || 'Low',
            start: format(startDate, 'yyyy-MM-dd'),
            duration: duration,
            completion: progress,
            region: region.name,
            experienceLevel: engineer.experienceLevel
          });
          taskId++;
        }
      }
    });
  });
  return tasks;
};

const priorityColors = {
  Critical: '#ff1744',
  High: '#ff9100',
  Medium: '#2196f3',
  Low: '#4caf50',
  None: '#9e9e9e',
};

const GanttView = () => {
  const tasks = getTasksWithTimeline();
  
  // Transform tasks for the chart
  const chartData = tasks.map(task => ({
    name: `${task.task} (${task.completion}%)`,
    engineer: task.engineer,
    duration: task.duration,
    priority: task.priority,
    completion: task.completion,
    start: task.start,
    experienceLevel: task.experienceLevel
  }));

  return (
    <Card sx={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Project Timeline
        </Typography>
        <Typography variant="caption" color="textSecondary" paragraph>
          Duration is estimated in days based on priority and engineer's experience level. Progress shows task completion percentage for active tasks.
        </Typography>
        <Box sx={{ height: Math.max(400, tasks.length * 50) }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              layout="vertical"
              barSize={20}
              margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                domain={[0, 'dataMax']} 
                tickFormatter={(value) => `${value}d`}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={180}
                tick={props => (
                  <g transform={`translate(${props.x},${props.y})`}>
                    <text x={0} y={0} dy={4} textAnchor="end" fill="#666">
                      {props.payload.value.split(' (')[0]}
                    </text>
                    <text 
                      x={-5} 
                      y={16} 
                      textAnchor="end" 
                      fill={
                        chartData[props.index].completion >= 80 ? '#4caf50' :
                        chartData[props.index].completion >= 50 ? '#ff9100' :
                        chartData[props.index].completion > 0 ? '#2196f3' : '#666'
                      }
                      style={{ fontWeight: 'bold' }}
                    >
                      {`${chartData[props.index].completion}%`}
                    </text>
                  </g>
                )}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  if (name === 'duration') {
                    return [`${value} days (${props.payload.experienceLevel} Engineer)`, 'Duration'];
                  }
                  if (name === 'completion') {
                    return [`${value}%`, 'Progress'];
                  }
                  return [value, name];
                }}
                labelFormatter={(label) => {
                  const taskName = label.split(' (')[0];
                  const task = tasks.find(t => t.task === taskName);
                  return `${taskName}\nEngineer: ${task.engineer}\nStart: ${task.start}\nPriority: ${task.priority}`;
                }}
              />
              <Legend />
              <Bar dataKey="duration" name="Duration">
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={priorityColors[tasks[index].priority]}
                    fillOpacity={0.8}
                  />
                ))}
              </Bar>
              <Bar 
                dataKey="completion" 
                name="Progress" 
                fill="#8e24aa"
                fillOpacity={0.9}
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GanttView;
