import ProductList from "@/components/ProductList";
import CategoryDropdown from "@/components/CategoryDropdown";

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10">
            <div className="flex justify-end px-6">
                <CategoryDropdown />
            </div>
            <ProductList />
        </main>
    );
}
