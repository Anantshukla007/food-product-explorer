"use client";

import { useEffect, useState } from "react";
import { fetchCategories } from "@/utils/api";

const CategoryDropdown = ({
  onSelect,
}: {
  onSelect: (category: string) => void;
}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        console.log("Categories from API:", data); // ✅ Debug API response
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 text-black"
    >
      <option value="">Select Category</option>
      {categories.length > 0 ? (
        categories.map((cat, index) => (
          <option key={index} value={cat.name}>
            {cat.name}
          </option>
        ))
      ) : (
        <option disabled>No Categories Found</option>
      )}
    </select>
  );
};

export default CategoryDropdown;
