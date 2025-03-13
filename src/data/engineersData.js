export const engineersData = {
  northIndia: {
    name: 'North India Engineers',
    engineers: [
      {
        name: 'Rajesh Kumar',
        location: 'Delhi',
        coordinates: [28.6139, 77.2090],
        skills: ['Networking', 'Server Maintenance'],
        availability: 'Available',
        currentTasks: { count: 2, priority: 'Medium' }
      },
      {
        name: 'Priya Sharma',
        location: 'Mumbai',
        coordinates: [19.0760, 72.8777],
        skills: ['Cloud Computing', 'DevOps'],
        availability: 'Busy',
        currentTasks: { count: 3, priority: 'High' }
      },
      {
        name: 'Amit Singh',
        location: 'Jaipur',
        coordinates: [26.9124, 75.7873],
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
        coordinates: [12.9716, 77.5946],
        skills: ['AI/ML', 'Data Analytics'],
        availability: 'Available',
        currentTasks: { count: 2, priority: 'Medium' }
      },
      {
        name: 'Ananya Reddy',
        location: 'Hyderabad',
        coordinates: [17.3850, 78.4867],
        skills: ['Software Development', 'Python'],
        availability: 'Busy',
        currentTasks: { count: 1, priority: 'Critical' }
      },
      {
        name: 'Suresh Kumar',
        location: 'Chennai',
        coordinates: [13.0827, 80.2707],
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
        coordinates: [40.7128, -74.0060],
        skills: ['Project Management', 'Agile'],
        availability: 'Available',
        currentTasks: { count: 1, priority: 'High' }
      },
      {
        name: 'Maria Garcia',
        location: 'Madrid, Spain',
        coordinates: [40.4168, -3.7038],
        skills: ['UI/UX Design', 'Frontend Development'],
        availability: 'Busy',
        currentTasks: { count: 2, priority: 'Medium' }
      }
    ]
  }
};
