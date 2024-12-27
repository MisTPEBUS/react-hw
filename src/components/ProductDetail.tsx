import React, { useEffect, useState } from "react";
import { ProductProps } from "@/types/Product";
import Image from "next/image";

interface ProductDetailProps {
  product: ProductProps;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectPic, setSelectedPic] = useState<string>(product.imageUrl);

  useEffect(() => {
    setSelectedPic(product.imageUrl);
  }, [product]);
  const handleSelectPic = (picture: string) => {
    setSelectedPic(picture);
  };
  return (
    <div className="flex">
      <div className="mb-4 w-1/2">
        <div className="relative w-96 h-96">
          <Image
            src={selectPic}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded"
          />
        </div>
        <div className="mt-4">
          <h4 className="font-bold">更多圖片：</h4>
          <div className="flex gap-2 mt-2 cursor-pointer">
            {product.imagesUrl.map((imgUrl) => (
              <img
                key={`${product.id}`}
                src={imgUrl}
                onClick={() => handleSelectPic(imgUrl)}
                alt={`${product.title}`}
                className="w-32  object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>
      <div className=" w-1/2">
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="mb-2">分類：{product.category}</p>
        <p className="mb-2">詳細尺寸：{product.content}</p>
        <p className="mb-2">描述：{product.description}</p>
        <p className="mb-2">
          售價：{product.price} {product.unit}
        </p>
        <p className="mb-2">庫存：{product.num}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
