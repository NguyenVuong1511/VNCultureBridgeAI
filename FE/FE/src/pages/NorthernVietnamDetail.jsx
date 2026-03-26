import { useMemo } from "react";
import DetailPage from "../components/regions/DetailPage";
import { northernVietnamData } from "./NorthernVietnam";
import { getRegionData } from "../utils/regions";

export default function NorthernVietnamDetail() {
  // Load from localStorage only
  const storedData = useMemo(() => {
    try {
      const stored = getRegionData("Northern Vietnam");
      // Use stored data and merge with overview/hero data from hardcoded
      return {
        ...northernVietnamData,
        destinations: stored.destinations,
        food: stored.food,
        culture: stored.culture,
        nature: stored.nature,
        beaches: stored.beaches,
      };
    } catch (error) {
      console.error("Error loading Northern Vietnam data:", error);
      // Fallback to hardcoded only if localStorage fails
      return northernVietnamData;
    }
  }, []);

  return <DetailPage regionData={storedData} />;
}

