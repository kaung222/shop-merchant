import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { OrderItem } from "@/types/order";

const OrderDetailTable = ({
  orderItems,
  total,
}: {
  orderItems: OrderItem[];
  total: number;
}) => {
  console.log(orderItems);

  return (
    <Table className=" w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Discount %</TableHead>
          <TableHead>Subtotal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderItems?.map((item) => {
          return (
            <TableRow key={item.id}>
              <TableCell>{item?.product?.title}</TableCell>
              <TableCell>
                <img
                  src={item.product?.images[0]}
                  alt=""
                  className=" w-10 h-10"
                />
              </TableCell>
              <TableCell>{item?.product?.price}</TableCell>
              <TableCell>{item?.quantity}</TableCell>
              <TableCell>{item?.product?.discountPercentage}</TableCell>
              <TableCell>{item.subTotal}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell>
            {total}
            MMK
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default OrderDetailTable;
