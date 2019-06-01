const db = require('./dbConfig');

module.exports = {
  get,
  // addDish,
  // getDish,
  // getRecipes,
  // addRecipe
};

function get() {
  return db('projects');
}