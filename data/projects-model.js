const db = require('./dbConfig');
const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  // getDish,
  // getRecipes,
  // addRecipe,
  getProjectActions
};

function get(id) {
  let query = db('projects as p');

  if (id) {
    query.where('p.id', id).first();

    const promises = [query, this.getProjectActions(id)]; // [ project, actions ]
    
    // think this resolves both promises
    return Promise.all(promises).then(function(results) {
      let [project, actions] = results;

      if (project) {
        project.actions = actions;

        return mappers.projectToBody(project);
      } else {
        return null;
      }
    });
  }

  return query.then(projects => {
    return projects.map(project => mappers.projectToBody(project));
  });
}

function insert(project) {
  return db('projects')
  .insert(project)
  .then(ids => {
    return ids[0]
  });
}

function getProjectActions(projectId) {
  return db('actions')
    .where('project_id', projectId)
    .then(actions => actions.map(action => mappers.actionToBody(action)));
}