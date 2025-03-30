"use client";

import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "@/utils/api";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const categoryProducts = await fetchProductsByCategory(category as string);
            setProducts(categoryProducts);
            setLoading(false);
        };
        if (category) {
            loadProducts();
        }
    }, [category]);

    return (
        <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
                {decodeURIComponent(category as string)}
            </h1>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">
                        {loading ? "Loading..." : "No products found."}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
