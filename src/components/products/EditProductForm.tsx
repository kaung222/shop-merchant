"use client";
import { EditProductSchema } from "@/validators/prodcut-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import { categories } from "@/data/category.data";
import { Product } from "@/types/product";
import { useUpdateProduct } from "@/api/product/useUpdateProduct";
import { toast } from "sonner";
import Link from "next/link";
import FormTextarea from "../commons/FormTextarea";
import { getItemFromLocalStorage } from "@/lib/utils";

export default function EditProduct({ product }: { product: Product }) {
  const form = useForm<z.infer<typeof EditProductSchema>>({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      title: product?.title,
      description: product?.description,
      category: product?.category,
      price: product?.price,
      discountPercentage: product?.discountPercentage,
      images: undefined,
      moq: product.moq,
    },
  });
  const { mutate, error } = useUpdateProduct();
  const user = getItemFromLocalStorage("user");
  function onSubmit(values: z.infer<typeof EditProductSchema>) {
    const formData = new FormData();
    if (values.images) {
      Array.from(values.images).map((image) => {
        formData.append("images", image as Blob);
      });
    }
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    // formData.append("ownerId", user.id);
    formData.append("price", values.price.toString());
    formData.append("discountPercentage", values.discountPercentage.toString());
    formData.append("moq", values.moq.toString());
    mutate(
      { id: product.id, data: formData },
      {
        onSuccess() {
          toast.success("Update product successfully");
        },
        onError() {
          //@ts-expect-error
          toast.error(error.response.data.message);
        },
      }
    );
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-2 gap-5 p-5">
            <FormInput
              placeholder="Title"
              form={form}
              type="text"
              name="title"
              label="Title"
              defaultValue={product?.title}
            />

            <FormSelect
              form={form}
              name="category"
              options={categories}
              label="Category"
              placeholder="All Categories"
              defaultValue={product?.category}
            />
            <FormInput
              form={form}
              type="number"
              placeholder="Price"
              name="price"
              label="Price"
              defaultValue={product?.price}
            />
            <FormInput
              type="file"
              form={form}
              name="images"
              label="Product Image"
            />
            <FormInput
              form={form}
              type="number"
              name="discountPercentage"
              label="Discount Percentage (optional)"
              defaultValue={product?.discountPercentage}
            />
            <FormInput
              type="number"
              placeholder="Minimun of quantity"
              form={form}
              name="moq"
              defaultValue={product.moq}
              label="MOQ (optional)"
            />
            <FormTextarea
              placeholder="Enter product description ..."
              form={form}
              name="description"
              label="Product Description (optional)"
            />
          </div>

          <div className="p-5 space-x-5">
            <Link href="/products?page=1&limit=10&category=all&sort=asc">
              <Button type="reset" className=" bg-red-500">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className=" bg-blue-500">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
