const db = require('./dbConfig');
const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  insertAction,
  remove,
  getProjectActions
};

function get(id) {
  let query = db('projects');

  if (id) {
    query.where({id}).first();

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

function insertAction(action) {
  return db('actions')
  .insert(action)
  .then(ids => {
    return ids[0]
  });
}

function remove(id) {
  return db('projects')
    .where({ id })
    .del();
}

function getProjectActions(projectId) {
  return db('actions')
    .where('project_id', projectId)
    .then(actions => actions.map(action => mappers.actionToBody(action)));
}