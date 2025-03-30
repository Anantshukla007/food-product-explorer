// src/utils/api.ts

// Fetch products with optional search term
export const fetchProducts = async (
    page: number = 1,
    pageSize: number = 20,
    searchTerm: string = ""
) => {
    try {
        const searchQuery = searchTerm ? `&search_terms=${encodeURIComponent(searchTerm)}` : "";
        const url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&page=${page}&page_size=${pageSize}${searchQuery}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data.products || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

// Fetch product details by barcode
export const fetchProductByBarcode = async (barcode: string) => {
    try {
        const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data.product ?? null; // Return product details or null if not found
    } catch (error) {
        console.error("Error fetching product by barcode:", error);
        return null;
    }
};

// Fetch product categories
export const fetchCategories = async () => {
    try {
        const url = `https://world.openfoodfacts.org/facets/categories.json`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Categories:", data); // ✅ Debugging API response

        return data?.categories || []; // ✅ Ensure it returns an array
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
};



// ✅ New: Fetch products by category
export const fetchProductsByCategory = async (category: string, page: number = 1, pageSize: number = 20) => {
    try {
        const url = `https://world.openfoodfacts.org/category/${encodeURIComponent(category)}.json?page=${page}&page_size=${pageSize}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data.products || [];
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }
};
