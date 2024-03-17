"use client";

import { useGetProductById } from "@/api/product/useGetProductById";
import EditProductForm from "@/components/products/EditProductForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
const Page = () => {
  const { productId } = useParams();
  const { data, isLoading } = useGetProductById(productId.toString());
  console.log(data);
  if (isLoading)
    return (
      <div className="p-5 grid grid-cols-2 gap-5">
        <Skeleton className="h-16 " />
        <Skeleton className="h-16 " />
        <Skeleton className="h-16 " />
        <Skeleton className="h-16 " />
        <Skeleton className="h-16 " />
        <Skeleton className="h-16 " />
        <Skeleton className="h-16 " />
        <Skeleton className="h-16 " />
      </div>
    );
  return (
    <div className="">
      <EditProductForm
        //@ts-expect-error
        product={data}
      />
    </div>
  );
};

export default Page;
