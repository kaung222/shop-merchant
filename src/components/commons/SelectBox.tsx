import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
type SelectProps = {
  error?: string;
  name: string;
  register?: any;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  options: { value: string; name: string }[];
};
const SelectBox = (props: SelectProps) => {
  const { error, name, register, label, options, placeholder, defaultValue } =
    props;
  return (
    <div className="">
      <label htmlFor="name">{label}</label>
      <Select
        onValueChange={(value) => register(value)}
        defaultValue={defaultValue}
        name={name}
      >
        <SelectTrigger className=" border-2 border-blue-500">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p>{error}</p>
    </div>
  );
};

export default SelectBox;
