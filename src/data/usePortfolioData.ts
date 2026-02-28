import { useState, useCallback } from "react";
import { PortfolioData, defaultData } from "./portfolio";

const STORAGE_KEY = "portfolio-data";

function loadData(): PortfolioData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // corrupted data — fall back
  }
  return defaultData;
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(loadData);

  const updateData = useCallback((newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  }, []);

  const resetData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  }, []);

  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  return { data, updateData, resetData, exportJSON };
}
