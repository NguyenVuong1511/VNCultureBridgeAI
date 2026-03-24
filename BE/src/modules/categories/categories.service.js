const categoriesRepository = require('./categories.repository');
const { AppError } = require('../../utils/appError');

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

async function getCategoryById(id, language) {
  const category = await categoriesRepository.findById(id, language);

  if (!category) {
    throw new AppError('Không tìm thấy danh mục', 404);
  }

  return category;
}

async function getCategoryArticles({ id, language, page, pageSize, offset }) {
  const category = await categoriesRepository.findById(id, language);

  if (!category) {
    throw new AppError('Không tìm thấy danh mục', 404);
  }

  const items = await categoriesRepository.findArticles({
    categoryId: id,
    language,
    offset,
    pageSize
  });
  const total = await categoriesRepository.countArticles(id, language);

  return {
    category,
    items,
    meta: {
      page,
      pageSize,
      total
    }
  };
}

module.exports = {
  getCategories,
  getCategoryTree,
  getCategoryById,
  getCategoryArticles
};
