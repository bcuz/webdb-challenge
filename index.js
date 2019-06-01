const express = require('express');

const Projects = require('./data/projects-model');

const server = express();

server.use(express.json());

server.get('/projects', async (req, res) => {
  try {
      const projects = await Projects.get();
      res.status(200).json(projects);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the projects',
    });
  }
});
server.get('/projects/:id', async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'project not found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the project',
    });
  }
});

server.post('/projects', async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the project',
    });
  }
});

server.delete('/projects/:id', async (req, res) => {
  try {
    let removed = await Projects.remove(req.params.id);    
    
    if (removed) {
      res.status(200).json({ message: 'The project has been nuked' });
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the project',
    });
  }
});

const port = 5001;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});