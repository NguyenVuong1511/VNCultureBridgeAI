const categoriesService = require('./src/modules/categories/categories.service');
const ethnicGroupsService = require('./src/modules/ethnic-groups/ethnicGroups.service');

async function test() {
  try {
    const cats = await categoriesService.getCategories('vi');
    console.log("CATEGORIES SAMPLE:", cats.slice(0, 2));

    const groups = await ethnicGroupsService.getEthnicGroups('vi');
    console.log("\nETHNIC GROUPS SAMPLE:", groups.slice(0, 2));

  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}

test();
