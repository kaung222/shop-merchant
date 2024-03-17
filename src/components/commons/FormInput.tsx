import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useAppDispatch } from "@/store/hooks";
import { setPreviewUrls } from "@/store/slices/createObjUrl";
type FormInputProps = {
  form: any;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  type: string;
  defaultValue?: string | number;
};
const FormInput = (props: FormInputProps) => {
  const { form, name, label, description, type, placeholder, defaultValue } =
    props;
  const dispatcher = useAppDispatch();
  const getInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    switch (inputType) {
      case "number":
        return e?.target?.valueAsNumber;

      case "file":
        return e?.target?.files;

      default:
        return e?.target.value;
    }
  };

  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                defaultValue={defaultValue}
                onChange={(e) => {
                  field.onChange(getInputValue(e, type));
                  //to preview file uploaded ==> storing obj urls in redux state
                  if (e.target.files) {
                    Array.from(e.target.files).map((image) => {
                      const url = URL.createObjectURL(image as Blob);
                      dispatcher(setPreviewUrls(url));
                    });
                  }
                }}
                placeholder={placeholder}
                type={type}
                // {...field}
                accept="image/*"
                multiple={name !== "thumbnail"}
                className="border-blue-500 border-2"
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormInput;
