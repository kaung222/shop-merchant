import { Category } from "./category";

export type Product = {
  id: string;
  categories: Category[];
  images: string[];
  price: number;
  title: string;
  rating?: {
    rate: number;
    count: number;
  };
  description: string;
  quantity?: number;
  moq: number;
  discountPercentage: number;
  createdAt: string;
};

export type ProductRes = {
  data: Product[];
  status: number;
  statusText: string;
};
export type CreateProductProps = {
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  images: any[];
};
