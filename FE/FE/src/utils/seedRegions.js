// Seed script to import regions data from hardcoded files into localStorage
import { seedRegionsData } from "./regions";
import { northernVietnamData } from "../pages/NorthernVietnam";
import { centralVietnamData } from "../pages/CentralVietnam";
import { southernVietnamData } from "../pages/SouthernVietnam";

// Transform the data structure to match what seedRegionsData expects
export function seedAllRegions() {
	try {
		const regionsData = {
			"Northern Vietnam": {
				destinations: Array.isArray(northernVietnamData.destinations) ? northernVietnamData.destinations : [],
				food: Array.isArray(northernVietnamData.food) ? northernVietnamData.food : [],
				culture: Array.isArray(northernVietnamData.culture) ? northernVietnamData.culture : [],
				nature: Array.isArray(northernVietnamData.nature) ? northernVietnamData.nature : [],
				beaches: Array.isArray(northernVietnamData.beaches) ? northernVietnamData.beaches : []
			},
			"Central Vietnam": {
				destinations: Array.isArray(centralVietnamData.destinations) ? centralVietnamData.destinations : [],
				food: Array.isArray(centralVietnamData.food) ? centralVietnamData.food : [],
				culture: Array.isArray(centralVietnamData.culture) ? centralVietnamData.culture : [],
				nature: Array.isArray(centralVietnamData.nature) ? centralVietnamData.nature : [],
				beaches: Array.isArray(centralVietnamData.beaches) ? centralVietnamData.beaches : []
			},
			"Southern Vietnam": {
				destinations: Array.isArray(southernVietnamData.destinations) ? southernVietnamData.destinations : [],
				food: Array.isArray(southernVietnamData.food) ? southernVietnamData.food : [],
				culture: Array.isArray(southernVietnamData.culture) ? southernVietnamData.culture : [],
				nature: Array.isArray(southernVietnamData.nature) ? southernVietnamData.nature : [],
				beaches: Array.isArray(southernVietnamData.beaches) ? southernVietnamData.beaches : []
			}
		};
		
		// Count items before seeding
		let totalItems = 0;
		Object.values(regionsData).forEach(region => {
			Object.values(region).forEach(category => {
				totalItems += category.length;
			});
		});
		
		seedRegionsData(regionsData);
		
		const result = {
			success: true,
			totalItems,
			regions: {
				"Northern Vietnam": {
					destinations: regionsData["Northern Vietnam"].destinations.length,
					food: regionsData["Northern Vietnam"].food.length,
					culture: regionsData["Northern Vietnam"].culture.length,
					nature: regionsData["Northern Vietnam"].nature.length,
					beaches: regionsData["Northern Vietnam"].beaches.length
				},
				"Central Vietnam": {
					destinations: regionsData["Central Vietnam"].destinations.length,
					food: regionsData["Central Vietnam"].food.length,
					culture: regionsData["Central Vietnam"].culture.length,
					nature: regionsData["Central Vietnam"].nature.length,
					beaches: regionsData["Central Vietnam"].beaches.length
				},
				"Southern Vietnam": {
					destinations: regionsData["Southern Vietnam"].destinations.length,
					food: regionsData["Southern Vietnam"].food.length,
					culture: regionsData["Southern Vietnam"].culture.length,
					nature: regionsData["Southern Vietnam"].nature.length,
					beaches: regionsData["Southern Vietnam"].beaches.length
				}
			}
		};
		
		console.log("✅ Regions data seeded successfully!");
		console.log(`   - Northern Vietnam: ${result.regions["Northern Vietnam"].destinations} destinations, ${result.regions["Northern Vietnam"].food} food, ${result.regions["Northern Vietnam"].culture} culture, ${result.regions["Northern Vietnam"].nature} nature, ${result.regions["Northern Vietnam"].beaches} beaches`);
		console.log(`   - Central Vietnam: ${result.regions["Central Vietnam"].destinations} destinations, ${result.regions["Central Vietnam"].food} food, ${result.regions["Central Vietnam"].culture} culture, ${result.regions["Central Vietnam"].nature} nature, ${result.regions["Central Vietnam"].beaches} beaches`);
		console.log(`   - Southern Vietnam: ${result.regions["Southern Vietnam"].destinations} destinations, ${result.regions["Southern Vietnam"].food} food, ${result.regions["Southern Vietnam"].culture} culture, ${result.regions["Southern Vietnam"].nature} nature, ${result.regions["Southern Vietnam"].beaches} beaches`);
		console.log(`   - Total items: ${totalItems}`);
		
		return result;
	} catch (error) {
		console.error("❌ Error seeding regions data:", error);
		return {
			success: false,
			error: error.message
		};
	}
}

// Auto-seed on import (optional - can be called manually)
// Uncomment the line below to auto-seed when this file is imported
// seedAllRegions();

