import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    product: {
        code: string;
        product_name: string;
        image_url: string;
        categories: string;
        ingredients_text: string;
        nutrition_grades: string;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const imageUrl =
        product.image_url && product.image_url.startsWith("http") ? product.image_url : "/placeholder.png";

    return (
        <Link href={`/product/${product.code}`} passHref>
            <div className="bg-white/60 backdrop-blur-lg border border-gray-200 shadow-md rounded-2xl p-4 transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col justify-between h-[320px]">
                {/* Image */}
                <div className="relative w-full h-44 overflow-hidden rounded-xl">
                    <Image
                        src={imageUrl}
                        alt={product.product_name || "Product Image"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                    <h2 className="text-lg font-bold mt-3 text-black truncate h-6">{product.product_name || "No Name"}</h2>
                    <p className="text-sm text-gray-600 truncate h-5">Category: {product.categories || "Unknown"}</p>
                    <p className="text-sm text-gray-500 line-clamp-2 h-10">
                        Ingredients: {product.ingredients_text || "N/A"}
                    </p>
                </div>

                {/* Nutrition Grade */}
                <p className="mt-2 text-sm font-bold bg-green-200 text-green-800 px-3 py-1 rounded-full inline-block text-center">
                    Nutrition Grade: {product.nutrition_grades ? product.nutrition_grades.toUpperCase() : "N/A"}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;
