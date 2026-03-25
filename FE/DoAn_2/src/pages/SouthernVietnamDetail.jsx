import { useMemo } from "react";
import DetailPage from "../components/regions/DetailPage";
import { southernVietnamData } from "./SouthernVietnam";
import { getRegionData } from "../utils/regions";

export default function SouthernVietnamDetail() {
  // Load from localStorage only
  const storedData = useMemo(() => {
    try {
      const stored = getRegionData("Southern Vietnam");
      // Use stored data and merge with overview/hero data from hardcoded
      return {
        ...southernVietnamData,
        destinations: stored.destinations,
        food: stored.food,
        culture: stored.culture,
        nature: stored.nature,
        beaches: stored.beaches,
      };
    } catch (error) {
      console.error("Error loading Southern Vietnam data:", error);
      // Fallback to hardcoded only if localStorage fails
      return southernVietnamData;
    }
  }, []);

  return <DetailPage regionData={storedData} />;
}

