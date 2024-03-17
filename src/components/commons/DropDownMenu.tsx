import IconDelete from "@/assets/icons/IconDelete";
import IconDots from "@/assets/icons/IconDots";
import IconEdit from "@/assets/icons/IconEdit";
import IconInfo from "@/assets/icons/IconInfo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ConfirmDialog } from "./alert-dialog";
import { useDeleteProduct } from "@/api/product/useDeleteProduct";
import { toast } from "sonner";

export function DropdownMenuDemo({ id }: { id: string }) {
  const deleteProduct = useDeleteProduct();
  const handleDeleteProduct = (id: string) => {
    deleteProduct.mutate(
      { id },
      {
        onSuccess() {
          toast.success("Prodcut delete successfully");
        },
        onError() {
          //@ts-expect-error
          toast.error(deleteProduct?.error.response.data.message);
        },
      }
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <IconDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/products/${id}`}>
            <DropdownMenuItem>
              Details
              <DropdownMenuShortcut>
                <IconInfo className=" text-sm text-green-500" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={`/products/edit/${id}`}>
            <DropdownMenuItem>
              Update
              <DropdownMenuShortcut>
                <IconEdit className=" text-sm text-orange-500" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <ConfirmDialog
            title="Are you sure to delete the products?"
            description="this action can't be undone"
            onConfirm={() => handleDeleteProduct(id)}
          >
            <Button
              variant="ghost"
              className=" flex justify-between items-center w-full px-2 "
            >
              Delete <IconDelete className=" text-red-500" />
            </Button>
          </ConfirmDialog>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
