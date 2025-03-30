import { useEffect, useState } from "react";
import { fetchCategories } from "@/utils/api";

export default function CategoryFilter({ onCategorySelect }: { onCategorySelect: (category: string) => void }) {
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            setLoading(true);
            const categoryList = await fetchCategories();
            console.log("Categories List in State:", categoryList); // ✅ Debugging
            setCategories(categoryList);
            setLoading(false);
        };

        loadCategories();
    }, []);

    return (
        <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Filter by Category:</label>
            <select
                onChange={(e) => onCategorySelect(e.target.value)}
                className="w-full p-2 border rounded-md shadow-md"
            >
                <option value="">All Categories</option>
                {loading ? (
                    <option disabled>Loading categories...</option>
                ) : (
                    categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
}
