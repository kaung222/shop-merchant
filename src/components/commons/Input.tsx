"use client";
import { UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type InputProps = {
  id?: string;
  placeholder: string;
  type: string;
  className?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  label?: string;
};

export const InputBox = (props: InputProps) => {
  const { id, placeholder, register, error, type, name, label, className } =
    props;
  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <label htmlFor={id}>{label}</label>
        <Input
          id={id}
          {...register(name)}
          type={type}
          placeholder={placeholder}
          className={cn("border-blue-500 border-2", className)}
        />
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
