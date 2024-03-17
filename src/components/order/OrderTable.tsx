import React, { memo } from "react";
import IconButton from "../commons/IconButton";
import IconEdit from "@/assets/icons/IconEdit";
import IconInfo from "@/assets/icons/IconInfo";
import Link from "next/link";
import IconDelete from "@/assets/icons/IconDelete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Order } from "@/types/order";
import { useUpdateOrderStatus } from "@/api/orders/useUpdateOrderStatus";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";

const OrderTable = memo(({ orders }: { orders: Order[] }) => {
  const { mutate } = useUpdateOrderStatus();
  const handleAcceptOrder = (id: string, status: string) => {
    mutate({ id, data: { status } });
  };
  return (
    <div className="h-[70vh] overflow-auto scroll-m-1 scroll-smooth">
      <Table>
        <TableHeader className=" bg-slate-200">
          <TableRow>
            <TableHead>Customer Email</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead className="text-end">Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => {
            return (
              <TableRow key={order.id}>
                <TableCell>{order?.user?.email} </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="text-end">${order?.total}</TableCell>
                <TableCell className=" space-x-2">
                  <Button
                    onClick={() => handleAcceptOrder(order.id, "accepted")}
                    className=" bg-green-500"
                  >
                    Accept
                  </Button>
                  <Button
                    className=" bg-red-500"
                    onClick={() => handleAcceptOrder(order.id, "rejected")}
                  >
                    Reject
                  </Button>
                  <Link href={`/orders/${order.id}`}>
                    <Button className=" bg-gray-500">Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
});

export default OrderTable;
