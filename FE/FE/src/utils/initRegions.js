// Initialize regions data - auto-seed on first load
// This will automatically seed data into localStorage on first app load

import { seedAllRegions } from "./seedRegions";

// Check if regions data already exists in localStorage
function hasRegionsData() {
	try {
		const raw = localStorage.getItem("RegionsData");
		if (!raw) return false;
		const data = JSON.parse(raw);
		// Check if we have data for at least one region
		const regions = ["Northern Vietnam", "Central Vietnam", "Southern Vietnam"];
		const categories = ["destinations", "food", "culture", "nature", "beaches"];
		
		for (const region of regions) {
			for (const category of categories) {
				const key = `${region.toLowerCase().replace(/\s+/g, "-")}_${category}`;
				if (data[key] && Array.isArray(data[key]) && data[key].length > 0) {
					return true;
				}
			}
		}
		return false;
	} catch {
		return false;
	}
}

// Function to initialize/seed regions data
export function initRegionsData(showAlert = false) {
	const result = seedAllRegions();
	
	if (result.success) {
		if (showAlert) {
			alert(`✅ Đã lưu dữ liệu vào localStorage thành công!\n\n` +
				`Northern Vietnam: ${result.regions["Northern Vietnam"].destinations} destinations, ${result.regions["Northern Vietnam"].food} food, ${result.regions["Northern Vietnam"].culture} culture, ${result.regions["Northern Vietnam"].nature} nature, ${result.regions["Northern Vietnam"].beaches} beaches\n` +
				`Central Vietnam: ${result.regions["Central Vietnam"].destinations} destinations, ${result.regions["Central Vietnam"].food} food, ${result.regions["Central Vietnam"].culture} culture, ${result.regions["Central Vietnam"].nature} nature, ${result.regions["Central Vietnam"].beaches} beaches\n` +
				`Southern Vietnam: ${result.regions["Southern Vietnam"].destinations} destinations, ${result.regions["Southern Vietnam"].food} food, ${result.regions["Southern Vietnam"].culture} culture, ${result.regions["Southern Vietnam"].nature} nature, ${result.regions["Southern Vietnam"].beaches} beaches\n\n` +
				`Tổng cộng: ${result.totalItems} items đã được lưu vào localStorage.`);
		} else {
			console.log("✅ Regions data initialized:", result.totalItems, "items");
		}
		return result;
	} else {
		if (showAlert) {
			alert(`❌ Lỗi khi lưu dữ liệu: ${result.error}`);
		} else {
			console.error("❌ Error initializing regions data:", result.error);
		}
		return result;
	}
}

// Auto-initialize on first load
if (typeof window !== 'undefined') {
	// Check if data already exists
	if (!hasRegionsData()) {
		// Auto-seed on first load
		initRegionsData(false);
	}
	
	// Make it available globally for manual calls
	window.initRegionsData = (showAlert = true) => initRegionsData(showAlert);
}

