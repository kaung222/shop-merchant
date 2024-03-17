"use client";
import { useState } from "react";
import { Product } from "@/types/product";

import Image from "next/image";

const ProductDetail = ({ product }: { product: Product }) => {
  const [activeImage, setActiveImage] = useState<string>("");

  return (
    <div className=" flex flex-col md:flex-row gap-3 md:gap-5 p-3 md:p-5">
      <div className="p-3 md:p-5  w-full md:w-[500px]">
        <Image
          src={activeImage !== "" ? activeImage : product?.images[0]}
          alt="product iamge"
          width={500}
          height={500}
          className=" w-full aspect-square"
        />
        <div className="flex gap-2 items-center py-2 justify-between">
          {product?.images.map((image, index) => {
            return (
              <Image
                src={image}
                alt="Product Image"
                key={index}
                width={500}
                height={500}
                className=" w-20 h-20 rounded-md cursor-pointer"
                onClick={() => setActiveImage(image)}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h3 className=" text-xl font-bold py-2">
            {product?.title.toUpperCase()}
          </h3>
          <p>Tag : {product?.category}</p>
          <p className=" font-bold">{product?.price} MMK</p>
        </div>
        <p className="min-h-[100px]">{product?.description}</p>
        <div className="flex">
          <p>Available Colors</p>
          <p>Red</p>
        </div>
        <div className="flex">
          <p>Available Sizes</p>
          <p>xl</p>
        </div>
        MOQ : {product.moq}
      </div>
    </div>
  );
};

export default ProductDetail;
