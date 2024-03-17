"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DropdownMenuDemo } from "../commons/DropDownMenu";
import { Product } from "@/types/product";
import { formatDate, truncateText } from "@/lib/utils";

const ProductTable = ({ products }: { products: Product[] | undefined }) => {
  return (
    <div className=" h-[60vh] overflow-auto scroll-m-1 scroll-smooth">
      <Table className="">
        <TableHeader className=" bg-slate-200">
          <TableRow>
            <TableHead className="font-medium">Title</TableHead>
            <TableHead className="font-medium">Photo</TableHead>
            <TableHead className="font-medium">Created Date</TableHead>
            <TableHead className=" text-end">Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell>{truncateText(product.title, 20)}</TableCell>
                <TableCell>
                  <img
                    src={product.images[0]}
                    alt="product iamge"
                    className=" w-10 h-10"
                  />
                </TableCell>
                <TableCell>{formatDate(product?.createdAt)}</TableCell>
                <TableCell className=" text-end">{product?.price}</TableCell>
                <TableCell>{product?.category}</TableCell>
                <TableCell>
                  <DropdownMenuDemo id={product.id.toString()} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
