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

const port = 5001;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});