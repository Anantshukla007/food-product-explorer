"use client";

import { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchProductByBarcode,
  fetchProductsByCategory,
  fetchCategories,
} from "@/utils/api"; // Updated imports
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      let newProducts = [];

      if (selectedCategory) {
        newProducts = await fetchProductsByCategory(selectedCategory, page, 20);
      } else {
        newProducts = await fetchProducts(page, 20, searchTerm);
      }

      setProducts(newProducts);
      setLoading(false);
    };

    if (!barcode) {
      loadProducts();
    }
  }, [searchTerm, page, barcode, selectedCategory]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    loadCategories();
  }, []);

  const handleBarcodeSearch = async () => {
    if (!barcode) return;
    setLoading(true);
    const product = await fetchProductByBarcode(barcode);
    setProducts(product ? [product] : []);
    setLoading(false);
  };

  // Sorting Logic with Fix
  const sortedProducts = [...products].sort((a, b) => {
    const nameA = a.product_name || ""; // Ensure it's a string
    const nameB = b.product_name || "";
    const gradeA = a.nutrition_grades || "";
    const gradeB = b.nutrition_grades || "";

    if (sortOption === "name-asc") return nameA.localeCompare(nameB);
    if (sortOption === "name-desc") return nameB.localeCompare(nameA);
    if (sortOption === "nutrition-asc") return gradeA.localeCompare(gradeB);
    if (sortOption === "nutrition-desc") return gradeB.localeCompare(gradeA);

    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        🍽️ Food Product Explorer
      </h1>

      {/* Search Bars */}
      <div className="flex justify-center mb-4">
  <input
    type="text"
    placeholder="Search food products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full max-w-lg px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-black text-black"
  />
</div>

      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by barcode..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-black  text-black"
        />
        <button
          onClick={handleBarcodeSearch}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          Search
        </button>
      </div>

      {/* Category Dropdown */}

      {/* Sorting Dropdown */}
      <div className="relative flex justify-end mb-4">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-black"
        >
          <option value="">Sort By</option>
          <option value="name-asc">Product Name (A-Z)</option>
          <option value="name-desc">Product Name (Z-A)</option>
          <option value="nutrition-asc">Nutrition Grade (Ascending)</option>
          <option value="nutrition-desc">Nutrition Grade (Descending)</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            {loading ? "Loading..." : "No products found."}
          </p>
        )}
      </div>

      {/* Load More Button */}
      {!barcode && products.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage(page + 1)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
