"use client";

import { useEffect, useState } from "react";
import { fetchProductByBarcode } from "@/utils/api";
import { useRouter, useParams } from "next/navigation";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            try {
                const data = await fetchProductByBarcode(id as string);
                if (!data || Object.keys(data).length === 0) {
                    setError("Product not found.");
                } else {
                    setProduct(data);
                }
            } catch (err) {
                setError("Failed to fetch product.");
            }
        };

        loadProduct();
    }, [id]);

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <p className="text-red-500 text-xl font-medium">{error}</p>
                <button 
                    onClick={() => router.back()} 
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
    
    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
                <div className="animate-pulse h-8 w-32 bg-gray-300 rounded mx-auto mb-4"></div>
                <div className="animate-pulse h-64 w-full max-w-md bg-gray-300 rounded mx-auto"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-6 bg-white rounded-xl shadow-md overflow-hidden">
                <button 
                    onClick={() => router.back()} 
                    className="mt-6 mb-4 px-4 py-2 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Products
                </button>

                <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/2">
                        <img
                            src={product.image_url || "/placeholder.png"}
                            alt={product.product_name || "Product Image"}
                            className="h-96 w-full object-cover md:h-full rounded-lg"
                            onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                        />
                    </div>
                    <div className="p-8 md:w-1/2">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {product.brands || "Unknown Brand"}
                        </div>
                        <h1 className="mt-2 text-3xl font-bold text-gray-900 leading-tight">
                            {product.product_name || "No Name"}
                        </h1>
                        
                        {product.nutrition_grade_fr && (
                            <div className="mt-4">
                                <span className="text-sm font-medium text-gray-700">Nutrition Grade:</span>
                                <span className={`ml-2 px-3 py-1 inline-flex text-sm font-bold rounded-full ${
                                    product.nutrition_grade_fr === 'a' ? 'bg-green-100 text-green-800' :
                                    product.nutrition_grade_fr === 'b' ? 'bg-blue-100 text-blue-800' :
                                    product.nutrition_grade_fr === 'c' ? 'bg-yellow-100 text-yellow-800' :
                                    product.nutrition_grade_fr === 'd' ? 'bg-orange-100 text-orange-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {product.nutrition_grade_fr?.toUpperCase() || "N/A"}
                                </span>
                            </div>
                        )}
                        
                        {product.categories && (
                            <div className="mt-4">
                                <span className="text-sm font-medium text-gray-700">Categories:</span>
                                <p className="text-gray-600">{product.categories}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-8 pb-8">
                    <div className="mt-6">
                        <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Ingredients</h2>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            {product.ingredients_text || "Information not available"}
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Nutritional Values</h2>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-900">Energy</h3>
                                <p className="text-lg font-bold text-black">{product.nutriments?.energy || "N/A"} 
                                {product.nutriments?.energy_unit && ` ${product.nutriments.energy_unit}`}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-900">Fat</h3>
                                <p className="text-lg font-bold text-black">{product.nutriments?.fat || "N/A"}
                                {product.nutriments?.fat_unit && ` ${product.nutriments.fat_unit}`}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-900">Carbohydrates</h3>
                                <p className="text-lg font-bold text-black">{product.nutriments?.carbohydrates || "N/A"}
                                {product.nutriments?.carbohydrates_unit && ` ${product.nutriments.carbohydrates_unit}`}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-900">Proteins</h3>
                                <p className="text-lg font-bold text-black">{product.nutriments?.proteins || "N/A"}
                                {product.nutriments?.proteins_unit && ` ${product.nutriments.proteins_unit}`}</p>
                            </div>
                        </div>
                    </div>

                    {product.allergens && (
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Allergens</h2>
                            <p className="mt-4 text-gray-700">{product.allergens}</p>
                        </div>
                    )}

                    {product.labels && (
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Labels</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {product.labels.split(',').map((label: string, index: number) => (
                                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                        {label.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}