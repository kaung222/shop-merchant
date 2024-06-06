import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
type FormInputProps = {
  form: any;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
  options: { name: string; id: string }[];
};
const FormSelect = (props: FormInputProps) => {
  const { form, name, label, description, placeholder, options, defaultValue } =
    props;

  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={defaultValue}>
              <FormControl className=" border-2 border-blue-500">
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options?.map((option) => {
                  return (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormDescription>
              {description}
              {/* <Link href="/examples/forms">email settings</Link>. */}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormSelect;
