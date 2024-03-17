import React from "react";
import { Textarea } from "../ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface TextareaProps extends React.InputHTMLAttributes<"textarea"> {
  label?: string;
  name: string;
  form: any;
  description?: string;
  placeholder?: string;
}
const FormTextarea = (props: TextareaProps) => {
  const { label, name, form, description, placeholder, ...rest } = props;
  return (
    <div>
      <div>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Textarea
                  className="border-blue-500 border-2 outline-none"
                  {...field}
                  placeholder={placeholder}
                />
              </FormControl>
              <FormDescription>{description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default FormTextarea;
