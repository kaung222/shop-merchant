"use client";
import { useGetOrderDetail } from "@/api/orders/useGetOrderDetail";
import OrderDetailTable from "@/components/order/OrderDetailTable";
import { useParams } from "next/navigation";

const page = () => {
  const { orderId } = useParams();
  const { data: order } = useGetOrderDetail(orderId as string);
  console.log(order);
  const description = order?.description && JSON.parse(order?.description);
  return (
    <div>
      <div className="p-3 md:p-5">
        <div className="">
          <OrderDetailTable
            total={order?.total}
            orderItems={order?.orderItems}
          />
        </div>
        <p className="">Email : {description?.email}</p>
        <p className="">Phone : {description?.phone}</p>
        <p className="">Address : {description?.address}</p>
        <p>Note : {description?.note}</p>
      </div>
    </div>
  );
};

export default page;
