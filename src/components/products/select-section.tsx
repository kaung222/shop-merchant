import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Section } from "@/types/category";
import useSetUrlQuery from "@/lib/useSetUrlQuery";

type Props = {
  options: Section[] | undefined;
};
const SelectSection = ({ options }: Props) => {
  const { setQuery } = useSetUrlQuery();
  return (
    <div>
      <label htmlFor="" className=" text-sm mb-3 block">
        Select section
      </label>
      <Select
        onValueChange={(value) =>
          setQuery({ key: "section", value, backToFirstPage: false })
        }
      >
        <SelectTrigger className="border-2 border-blue-500">
          <SelectValue placeholder="Select section" />
        </SelectTrigger>
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
    </div>
  );
};

export default SelectSection;
