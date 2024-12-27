"use client";
import { useState, useEffect } from "react";

import { ProductProps } from "@/types/Product";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/mock/getProducts";
import ProductDetail from "@/components/ProductDetail";

export default function HomePage() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  const handleSelectProduct = (product: ProductProps) => {
    setSelectedProduct(product);
  };

  return (
    <div className=" p-4 gap-2 max-w-[1296px] mx-auto md:flex ">
      <div className=" flex md:w-1/3 md:block">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onchange={handleSelectProduct}
          />
        ))}
      </div>

      <div className="flex-1 border rounded p-4">
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} />
        ) : (
          <p className="text-gray-500">請從左側卡片選擇商品查看詳情</p>
        )}
      </div>
    </div>
  );
}
