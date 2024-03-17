import { Product } from "@/types/product";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { ConfirmDialog } from "./alert-dialog";
import IconDelete from "@/assets/icons/IconDelete";

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    console.log(`Deleting item with ID: ${id}`);
  };
  return (
    <div className=" h-auto w-full md:w-[300px] bg-slate-100 shadow-md shadow-gray-600 rounded-xl  hover:shadow-xl ">
      <img
        src={product.images[0]}
        alt=""
        className="w-full aspect-square object-contained"
      />
      <div className="flex items-center p-3 justify-between py-3">
        <p>{product.title.slice(0, 10)}...</p>
        <span>$ {product.price}</span>
      </div>
      {/* <div className="">{product.rating.rate}</div> */}
      <div className="flex items-center p-3 justify-between">
        <ConfirmDialog
          title="alert title"
          description="Are you sure to delete?"
          onConfirm={() => handleDelete(product.id)}
        >
          <Button className=" bg-red-500">Delete</Button>
        </ConfirmDialog>
        <Link href={`products/edit/${product.id}`}>
          <Button className=" bg-orange-500">Edit</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
