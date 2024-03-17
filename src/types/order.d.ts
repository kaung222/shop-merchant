import { Order } from "@/types/order";
import { Product } from "./product";
import { User } from "./user";

export type Order = {
  id: string;
  status: string;
  description: string;
  createdAt: string;
  user?: User;
  total: number;
};

export type OrderItem = {
  id: string;
  product?: Product;
  quantity: number;
  subTotal: number;
  order?: Order;
};
