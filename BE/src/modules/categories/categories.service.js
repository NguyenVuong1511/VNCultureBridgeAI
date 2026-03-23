const categoriesRepository = require('./categories.repository');

async function getCategories(language) {
  return categoriesRepository.findAll(language);
}

async function getCategoryTree(language) {
  const categories = await categoriesRepository.findAll(language);
  const map = new Map();
  const roots = [];

  categories.forEach((category) => {
    map.set(category.id, { ...category, children: [] });
  });

  map.forEach((category) => {
    if (category.parentId && map.has(category.parentId)) {
      map.get(category.parentId).children.push(category);
      return;
    }

    roots.push(category);
  });

  return roots;
}

module.exports = {
  getCategories,
  getCategoryTree
};
