"use client";
import { CreateProductSchema } from "@/validators/prodcut-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import FormInput from "../commons/FormInput";
import FormSelect from "../commons/FormSelect";
// import { categories } from "@/data/category.data";
import { toast } from "sonner";
import { useCreateProduct } from "@/api/product/useCreateProduct";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { emptyUrls } from "@/store/slices/createObjUrl";
import { useRouter } from "next/navigation";
import { PreviewProduct } from "./PreviewProduct";
import FormTextarea from "../commons/FormTextarea";
import { useGetCategories } from "@/api/category/useGetCategories";
import CategoryMultiSelect from "./multi-select.category";
import { useEffect, useState } from "react";
import SelectSection from "./select-section";
import { Category } from "@/types/category";
import useSetUrlQuery from "@/lib/useSetUrlQuery";
import { useGetSections } from "@/api/category/useGetSection";

export default function CreateProductForm() {
  const { mutate, error } = useCreateProduct();
  const { getQuery } = useSetUrlQuery();
  const section = getQuery("section");
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { data: sections } = useGetSections();
  const router = useRouter();
  const { imageUrls } = useAppSelector((state) => state.previewUrls);
  const dispatcher = useAppDispatch();
  const form = useForm<z.infer<typeof CreateProductSchema>>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: [],
      price: 0,
      discountPercentage: 0,
      images: undefined,
      moq: 1,
    },
  });
  function onSubmit(values: z.infer<typeof CreateProductSchema>) {
    // console.log(values);
    // return;
    const formData = new FormData();
    Array.from(values.images).map((image) => {
      formData.append("images", image as Blob);
    });
    // for test
    selectCategories.map((category) => {
      formData.append("categories", category.id);
    });
    // formData.append("thumbnail", Array.from(values.thumbnail)[0] as Blob);
    formData.append("title", values.title);
    formData.append("description", values.description);
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

  useEffect(() => {
    section &&
      setCategories(
        //@ts-expect-error
        sections?.find((sect) => sect.id === section)?.subCategories
      );
  }, [section]);
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
            {/* <FormSelect
              form={form}
              name="section"
              options={sections}
              label="Section"
              placeholder="Select Category"
            /> */}

            <SelectSection options={sections} />
            <CategoryMultiSelect
              error={"no error"}
              register={form.register}
              options={categories}
              selectedTags={selectCategories}
              setSelectedTags={setSelectCategories}
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
