import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  Box,
  Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BuildIcon from '@mui/icons-material/Build';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import AssignmentIcon from '@mui/icons-material/Assignment';

const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case 'critical':
      return 'error';
    case 'high':
      return 'warning';
    case 'medium':
      return 'info';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const getAvailabilityColor = (availability) => {
  return availability.toLowerCase() === 'available' ? 'success' : 'error';
};

const EngineerCard = ({ engineer }) => (
  <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </Grid>
      <Grid item xs>
        <Typography variant="h6">{engineer.name}</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">{engineer.location}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BuildIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">{engineer.skills.join(', ')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EventBusyIcon sx={{ mr: 1, fontSize: 20 }} />
              <Chip 
                label={engineer.availability}
                size="small"
                color={getAvailabilityColor(engineer.availability)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AssignmentIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                Tasks: {engineer.currentTasks.count}
                {engineer.currentTasks.priority && (
                  <Chip 
                    label={engineer.currentTasks.priority}
                    size="small"
                    color={getPriorityColor(engineer.currentTasks.priority)}
                    sx={{ ml: 1 }}
                  />
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

const Teams = () => {
  const teams = {
    northIndia: {
      name: 'North India Engineers',
      engineers: [
        {
          name: 'Rajesh Kumar',
          location: 'Delhi',
          skills: ['Networking', 'Server Maintenance'],
          availability: 'Available',
          currentTasks: { count: 2, priority: 'Medium' }
        },
        {
          name: 'Priya Sharma',
          location: 'Mumbai',
          skills: ['Cloud Computing', 'DevOps'],
          availability: 'Busy',
          currentTasks: { count: 3, priority: 'High' }
        },
        {
          name: 'Amit Singh',
          location: 'Jaipur',
          skills: ['Cybersecurity', 'Firewall Configuration'],
          availability: 'Available',
          currentTasks: { count: 1, priority: 'Low' }
        }
      ]
    },
    southIndia: {
      name: 'South India Engineers',
      engineers: [
        {
          name: 'Karthik Raj',
          location: 'Bangalore',
          skills: ['AI/ML', 'Data Analytics'],
          availability: 'Available',
          currentTasks: { count: 2, priority: 'Medium' }
        },
        {
          name: 'Ananya Reddy',
          location: 'Hyderabad',
          skills: ['Software Development', 'Python'],
          availability: 'Busy',
          currentTasks: { count: 1, priority: 'Critical' }
        },
        {
          name: 'Suresh Kumar',
          location: 'Chennai',
          skills: ['Database Management', 'SQL'],
          availability: 'Available',
          currentTasks: { count: 0 }
        }
      ]
    },
    global: {
      name: 'Global Engineers',
      engineers: [
        {
          name: 'John Smith',
          location: 'New York, USA',
          skills: ['Project Management', 'Agile'],
          availability: 'Available',
          currentTasks: { count: 1, priority: 'High' }
        },
        {
          name: 'Maria Garcia',
          location: 'Madrid, Spain',
          skills: ['UI/UX Design', 'Frontend Development'],
          availability: 'Busy',
          currentTasks: { count: 2, priority: 'Medium' }
        }
      ]
    }
  };

  return (
    <Card sx={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Team Management
        </Typography>
        {Object.values(teams).map((team) => (
          <Accordion key={team.name} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{team.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {team.engineers.map((engineer) => (
                <EngineerCard key={engineer.name} engineer={engineer} />
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
};

export default Teams;
