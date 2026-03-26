import { useMemo } from "react";
import DetailPage from "../components/regions/DetailPage";
import { centralVietnamData } from "./CentralVietnam";
import { getRegionData } from "../utils/regions";

export default function CentralVietnamDetail() {
  // Load from localStorage only
  const storedData = useMemo(() => {
    try {
      const stored = getRegionData("Central Vietnam");
      // Use stored data and merge with overview/hero data from hardcoded
      return {
        ...centralVietnamData,
        destinations: stored.destinations,
        food: stored.food,
        culture: stored.culture,
        nature: stored.nature,
        beaches: stored.beaches,
      };
    } catch (error) {
      console.error("Error loading Central Vietnam data:", error);
      // Fallback to hardcoded only if localStorage fails
      return centralVietnamData;
    }
  }, []);

  return <DetailPage regionData={storedData} />;
}

