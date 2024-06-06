import { Category } from "@/types/category";
import { ChevronDown, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type MultiSelectProps = {
  options?: Category[];
  register: any;
  setSelectedTags: Dispatch<SetStateAction<Category[]>>;
  selectedTags: Category[];
  error: any;
};
const CategoryMultiSelect = ({
  error,
  options,
  register,
  setSelectedTags,
  selectedTags,
}: MultiSelectProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<
    Category[] | undefined
  >([]);
  //   console.log(options);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toLowerCase();
    const filtered = options?.filter((option) =>
      option.name.toLowerCase().includes(inputValue)
    );
    setFilteredOptions(filtered);
    setShowOptions(true);
  };

  const handleOptionClick = (item: Category) => {
    setSelectedTags([...selectedTags, item]);
    setShowOptions(false);
  };
  const removeTag = (tagId: string) => {
    const filtered = selectedTags.filter((tag) => tag.id !== tagId);
    setSelectedTags(filtered);
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);
  return (
    <div className="relative flex w-full flex-col">
      <label htmlFor="" className="mb-2 text-sm font-semibold mt-1">
        Category
      </label>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className="flex w-full items-center justify-center text-sm rounded-md border-2 border-blue-500 p-1.5 outline-none "
      >
        <input
          type="text"
          {...register("tagIds", { onChange: handleInputChange })}
          placeholder="Enter category name..."
          autoComplete="off"
          defaultValue=""
          className="w-full rounded-xl border-none   outline-none "
        />
        <ChevronDown />
      </div>
      {/* {error && <p className=" text-red-500">Choose at least one tags!</p>} */}
      <div className=" flex flex-wrap gap-1">
        {selectedTags?.map((tag) => {
          return (
            <p
              key={tag.id}
              className=" mt-2 flex cursor-pointer gap-2 rounded-lg bg-slate-200 p-2"
              onClick={() => removeTag(tag.id)}
            >
              {tag.name}
              <X className=" rounded-full bg-white p-1 text-sm" />
            </p>
          );
        })}
      </div>
      <div
        className={`absolute top-20 z-50 max-h-[300px] w-full overflow-y-scroll rounded-md border bg-slate-300 ${
          !showOptions && "hidden"
        }`}
      >
        {filteredOptions?.map((option) => (
          <p
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={" w-full border-b bg-white p-3 hover:bg-slate-200"}
          >
            {option.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategoryMultiSelect;
