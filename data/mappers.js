module.exports = {
  intToBoolean,
  booleanToint,
  projectToBody,
  actionToBody,
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function projectToBody(project) {
  const result = {
    ...project,
    completed: intToBoolean(project.completed),
  };

  if (project.actions) {
    result.actions = project.actions.map(action => ({
      ...action,
      completed: intToBoolean(action.completed),
    }));
  }

  return result;
}

function actionToBody(action) {
  // destructure because we don't want project_id in the final results
  const { project_id, ...otherProps } = action;

  return {
    ...otherProps,
    completed: intToBoolean(action.completed),
  };
}
