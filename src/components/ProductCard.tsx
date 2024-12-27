import React from "react";
import { ProductProps } from "@/types/Product";

interface ProductCardProps {
  product: ProductProps;
  onchange: (product: ProductProps) => void;
}

const ProductCard = ({ product, onchange }: ProductCardProps) => {
  return (
    <div
      className="border rounded p-2 cursor-pointer hover:bg-gray-500"
      onClick={() => onchange(product)}
    >
      <h3 className="font-bold text-lg mb-1">{product.title}</h3>
      <p>
        價格：{product.price}/{product.unit}
      </p>
      <p>分類：{product.category}</p>
    </div>
  );
};

export default ProductCard;
