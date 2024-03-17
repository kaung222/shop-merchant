"use client";

import ProductCard from "@/components/commons/ProductCard";
import ProductDetail from "@/components/products/ProductDetail";
import { Product } from "@/types/product";
import Loading from "./loading";
import { useGetProductById } from "@/api/product/useGetProductById";

type productDetailProps = {
  params: { productId: string };
};
const Page = ({ params }: productDetailProps) => {
  const id = params.productId;
  const { data, isLoading } = useGetProductById(id);
  console.log(data);
  if (isLoading) return <Loading />;
  if (!data) return <div className="">Product is not found.</div>;
  return (
    <div className="">
      <ProductDetail product={data as Product} />
    </div>
  );
};

export default Page;
