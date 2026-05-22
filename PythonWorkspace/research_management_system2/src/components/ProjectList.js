import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';
import { 
  Container, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  CircularProgress 
} from '@mui/material';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Research Projects
        </Typography>
        <List>
          {projects.map((project) => (
            <ListItem key={project.id}>
              <ListItemText
                primary={project.title}
                secondary={project.description}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ProjectList; 