# Food Product Explorer

Food Product Explorer is a web application built using **Next.js, Tailwind CSS**, and the **OpenFoodFacts API** to help users search and explore food products based on categories, barcodes, and nutritional values.

## Features

### ✅ Homepage
- Displays a list of food products fetched from the OpenFoodFacts API.
- Each product displays key information such as:
  - Product name
  - Image
  - Category
  - Ingredients (if available)
  - Nutrition Grade (A, B, C, D, E)
- Users can paginate through the product list using a **Load More** button.

### ✅ Search Functionality
- Users can search for food products by name.
- The search filters the product list dynamically based on the query.

### ✅ Barcode Search Functionality
- Users can search for food products by barcode.

### ✅ Category Filter
- Includes a dropdown where users can filter products by category (e.g., beverages, dairy, snacks).
- Fetches the list of categories from the OpenFoodFacts API.

### ✅ Sort Functionality
- Allows users to sort the product list by:
  - Product name (A-Z, Z-A)
  - Nutrition grade (ascending/descending)

### ✅ Product Detail Page
- Clicking on a product redirects users to a detailed product page.
- Displays:
  - Product image
  - Full list of ingredients
  - Nutritional values (energy, fat, carbs, proteins, etc.)
  - Labels (vegan, gluten-free, etc.)

### ✅ Responsive Design
- Fully responsive design that works well on mobile and desktop screens.

## Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **API:** OpenFoodFacts API

## Installation & Running the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/food-product-explorer.git
   cd food-product-explorer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## License
This project is open-source and available under the **MIT License**.

---
Let me know if you'd like any refinements! 🚀

