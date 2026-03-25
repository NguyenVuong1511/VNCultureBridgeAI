// Utility functions for managing regions data in localStorage
// Regions structure: { region, category, items[] }

const REGIONS_KEY = "RegionsData";
const REGIONS_LIST = ["Northern Vietnam", "Central Vietnam", "Southern Vietnam"];
const CATEGORIES = ["destinations", "food", "culture", "nature", "beaches"];

function readRaw() {
	const raw = localStorage.getItem(REGIONS_KEY);
	try {
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}

function writeRaw(data) {
	localStorage.setItem(REGIONS_KEY, JSON.stringify(data || {}));
}

function getRegionKey(region, category) {
	return `${region.toLowerCase().replace(/\s+/g, "-")}_${category}`;
}

function slugify(text = "") {
	return String(text)
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

// Get all items for a region and category
export function getRegionItems(region, category) {
	const data = readRaw();
	const key = getRegionKey(region, category);
	return data[key] || [];
}

// Set items for a region and category
export function setRegionItems(region, category, items) {
	const data = readRaw();
	const key = getRegionKey(region, category);
	data[key] = items || [];
	writeRaw(data);
	return data[key];
}

// Upsert (insert or update) an item in a region category
export function upsertRegionItem(region, category, item) {
	const items = getRegionItems(region, category);
	
	// Generate ID if missing
	if (!item.id) {
		const nameOrTitle = item.name || item.title || "";
		item.id = slugify(nameOrTitle) || `item-${Date.now()}`;
	}
	
	// Add timestamps
	const now = new Date().toISOString();
	if (!item.created_at) item.created_at = now;
	item.updated_at = now;
	
	// Find existing item by id
	const idx = items.findIndex((i) => i.id === item.id);
	
	if (idx >= 0) {
		// Update existing
		items[idx] = { ...items[idx], ...item };
	} else {
		// Add new
		items.unshift(item);
	}
	
	setRegionItems(region, category, items);
	return items;
}

// Delete an item from a region category
export function deleteRegionItem(region, category, itemId) {
	const items = getRegionItems(region, category);
	const next = items.filter((i) => i.id !== itemId);
	setRegionItems(region, category, next);
	return next;
}

// Get all regions
export function getRegions() {
	return REGIONS_LIST;
}

// Get all categories
export function getCategories() {
	return CATEGORIES;
}

// Seed initial data from hardcoded data
export function seedRegionsData(regionsData) {
	// regionsData should be an object like:
	// { "Northern Vietnam": { destinations: [...], food: [...], ... }, ... }
	
	Object.keys(regionsData).forEach((region) => {
		const regionData = regionsData[region];
		CATEGORIES.forEach((category) => {
			if (regionData[category] && Array.isArray(regionData[category])) {
				const items = regionData[category].map((item) => {
					// Ensure each item has an id
					if (!item.id) {
						const nameOrTitle = item.name || item.title || "";
						item.id = slugify(nameOrTitle) || `item-${Date.now()}-${Math.random()}`;
					}
					// Add timestamps
					if (!item.created_at) {
						item.created_at = new Date().toISOString();
					}
					if (!item.updated_at) {
						item.updated_at = item.created_at;
					}
					return item;
				});
				setRegionItems(region, category, items);
			}
		});
	});
}

// Get all data for a region
export function getRegionData(region) {
	const data = {};
	CATEGORIES.forEach((category) => {
		data[category] = getRegionItems(region, category);
	});
	return data;
}

// Clear all regions data
export function clearRegionsData() {
	localStorage.removeItem(REGIONS_KEY);
}

