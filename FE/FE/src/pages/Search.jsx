import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/navDetail/Navbar";
import FooterDetail from "../components/footer/FooterDetail";
import { northernVietnamData } from "./NorthernVietnam";
import { centralVietnamData } from "./CentralVietnam";
import { southernVietnamData } from "./SouthernVietnam";

export default function Search() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const allResults = [];

    const regions = [
      { data: northernVietnamData, slug: "northern-vietnam" },
      { data: centralVietnamData, slug: "central-vietnam" },
      { data: southernVietnamData, slug: "southern-vietnam" }
    ];

    regions.forEach(({ data, slug }) => {
      data.destinations?.forEach((item) => {
        if (item.name?.toLowerCase().includes(searchTerm) || item.description?.toLowerCase().includes(searchTerm)) {
          allResults.push({
            type: "destination",
            category: "destinations",
            region: data.title,
            regionSlug: slug,
            item,
            title: item.name,
            description: item.description,
            image: item.image
          });
        }
      });

      data.food?.forEach((item) => {
        if (item.title?.toLowerCase().includes(searchTerm) || item.description?.toLowerCase().includes(searchTerm)) {
          allResults.push({
            type: "food",
            category: "food",
            region: data.title,
            regionSlug: slug,
            item,
            title: item.title,
            description: item.description,
            image: item.image
          });
        }
      });

      data.culture?.forEach((item) => {
        if (item.title?.toLowerCase().includes(searchTerm) || item.description?.toLowerCase().includes(searchTerm)) {
          allResults.push({
            type: "culture",
            category: "culture",
            region: data.title,
            regionSlug: slug,
            item,
            title: item.title,
            description: item.description,
            image: item.image
          });
        }
      });

      data.nature?.forEach((item) => {
        if (item.title?.toLowerCase().includes(searchTerm) || item.description?.toLowerCase().includes(searchTerm)) {
          allResults.push({
            type: "nature",
            category: "nature",
            region: data.title,
            regionSlug: slug,
            item,
            title: item.title,
            description: item.description,
            image: item.image
          });
        }
      });

      data.beaches?.forEach((item) => {
        if (item.title?.toLowerCase().includes(searchTerm) || item.description?.toLowerCase().includes(searchTerm)) {
          allResults.push({
            type: "beach",
            category: "beaches",
            region: data.title,
            regionSlug: slug,
            item,
            title: item.title,
            description: item.description,
            image: item.image
          });
        }
      });
    });

    setResults(allResults);
  }, [query]);

  const getItemSlug = (item) => {
    return item.name?.toLowerCase().replace(/\s+/g, "-") || item.title?.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "80px" }}>
      <Navbar />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ marginBottom: "30px", fontSize: "28px", fontWeight: "600" }}>
          {query ? t("search.title_with_query", { query }) : t("search.title")}
        </h1>

        {!query ? (
          <p style={{ color: "#666", fontSize: "16px" }}>
            {t("search.empty_prompt")}
          </p>
        ) : results.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: "#666", fontSize: "18px", marginBottom: "20px" }}>
              {t("search.no_results", { query })}
            </p>
            <Link
              to="/"
              style={{
                color: "#C8201C",
                textDecoration: "none",
                fontWeight: "500"
              }}
            >
              ← {t("search.back_home")}
            </Link>
          </div>
        ) : (
          <>
            <p style={{ color: "#666", marginBottom: "30px" }}>
              {t("search.results_count", { count: results.length })}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "30px"
              }}
            >
              {results.map((result, index) => (
                <Link
                  key={index}
                  to={`/places-to-go/${result.regionSlug}/${result.category}/${getItemSlug(result.item)}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
                    <img
                      src={result.image}
                      alt={result.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#C8201C",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        fontWeight: "600"
                      }}
                    >
                      {result.region} • {result.category}
                    </div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "10px",
                        color: "#222"
                      }}
                    >
                      {result.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#666",
                        lineHeight: "1.5",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {result.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <FooterDetail />
    </div>
  );
}
