"use client";
import { CreateProductSchema } from "@/validators/prodcut-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
import { categories } from "@/data/category.data";
import { toast } from "sonner";
import { useCreateProduct } from "@/api/product/useCreateProduct";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { emptyUrls } from "@/store/slices/createObjUrl";
import { useRouter } from "next/navigation";
import { PreviewProduct } from "./PreviewProduct";
import FormTextarea from "../commons/FormTextarea";
import { getItemFromLocalStorage } from "@/lib/utils";

export default function CreateProductForm() {
  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      discountPercentage: 0,
      images: undefined,
      moq: 1,
    },
  });
  const { mutate, error } = useCreateProduct();
  const router = useRouter();
  const { imageUrls } = useAppSelector((state) => state.previewUrls);
  const dispatcher = useAppDispatch();
  const user = getItemFromLocalStorage("user");
  function onSubmit(values: z.infer<typeof CreateProductSchema>) {
    const formData = new FormData();
    Array.from(values.images).map((image) => {
      formData.append("images", image as Blob);
    });
    // formData.append("thumbnail", Array.from(values.thumbnail)[0] as Blob);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("ownerId", user.id);
    formData.append("price", values.price.toString());
    formData.append("discountPercentage", values.discountPercentage.toString());
    formData.append("moq", values.moq.toString());
    dispatcher(emptyUrls(""));
    //@ts-expect-error
    mutate(formData, {
      onSuccess() {
        toast.success("Created product successfully");
      },
      onError() {
        //@ts-expect-error
        toast.error(error.response.data.message);
      },
    });
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className=" grid grid-cols-2 gap-5 p-5">
            <FormInput
              placeholder="Title"
              form={form}
              type="text"
              name="title"
              label="Title"
            />

            <FormSelect
              form={form}
              name="category"
              options={categories}
              label="Category"
              placeholder="Select Category"
            />
            <FormInput
              form={form}
              type="number"
              placeholder="Price"
              name="price"
              label="Price"
            />
            <FormInput
              type="file"
              form={form}
              name="images"
              label="Product Images"
            />
            <FormInput
              form={form}
              type="number"
              name="discountPercentage"
              label="Discount Percentage (optional)"
            />
            {/* <FormInput
              type="file"
              placeholder="Thumbnail"
              form={form}
              name="thumbnail"
              label="Thumbnail"
            /> */}
            <FormInput
              type="number"
              placeholder="Minimun of quantity"
              form={form}
              name="moq"
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
            <Button type="reset" className=" bg-red-500">
              Cancel
            </Button>
            <PreviewProduct />
            <Button type="submit" className=" bg-blue-500">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
