"use client";

import { useGetProducts } from "@/api/product/useGetProducts";
import PaginationBar from "@/components/commons/Pagination";
import ProductFilterbar from "@/components/products/ProductFilterbar";
import ProductTable from "@/components/products/ProductTable";
import useSetUrlQuery from "@/lib/useSetUrlQuery";

const Page = () => {
  const { getQuery } = useSetUrlQuery();
  const page = getQuery("page");
  const sort = getQuery("sort");
  const search = getQuery("search");
  const limit = getQuery("limit");
  const category = getQuery("category");

  const { data, isLoading } = useGetProducts({
    page,
    search,
    sort,
    limit,
    category,
  });

  return (
    <div className="p-3">
      <ProductFilterbar />
      <ProductTable products={data?.products} />
      <PaginationBar total={data?.total} pageCount={data?.lastPage || 0} />
    </div>
  );
};

export default Page;
