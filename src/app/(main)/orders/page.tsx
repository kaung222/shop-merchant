"use client";
import { useGetOrders } from "@/api/orders/useGetOrders";
import PaginationBar from "@/components/commons/Pagination";
import OrderFilterbar from "@/components/order/OrderFilterbar";
import OrderTable from "@/components/order/OrderTable";

const page = () => {
  const { data } = useGetOrders();
  return (
    <div className="p-3">
      <OrderFilterbar />
      <OrderTable
        //@ts-expect-error
        orders={data}
      />
      {/* <PaginationBar total={data?.total} pageCount={data?.lastPage || 1} /> */}
    </div>
  );
};

export default page;
