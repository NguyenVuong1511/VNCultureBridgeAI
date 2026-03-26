export const TOPICS = ["Food", "Culture", "Nature", "City", "Beach", "Beaches", "Cities"]; // include existing labels used in UI

export function toKey(topic) {
	return `${String(topic || "").toLowerCase()}Topics`;
}

export function normalizeTopic(topic) {
	if (!topic) return "";
	const t = String(topic).toLowerCase();
	// map plural variants used in UI
	if (t === "beaches") return "beach";
	if (t === "cities") return "city";
	return t;
}

