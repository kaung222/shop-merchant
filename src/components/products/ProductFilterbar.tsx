import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { categories } from "@/data/category.data";
import useSetUrlQuery from "@/lib/useSetUrlQuery";
import SearchBox from "../commons/search-box";
const ProductFilterbar = () => {
  const { getQuery, setQuery } = useSetUrlQuery();
  const currentCategory = getQuery("category");
  const currentSort = getQuery("sort");

  return (
    <div className="flex items-center justify-between space-x-10">
      <SearchBox />
      <div className="flex py-3 items-center space-x-6">
        <Select
          value={currentSort}
          onValueChange={(value) =>
            setQuery({ key: "sort", value, backToFirstPage: false })
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Newest to oldest" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="desc">Newest to oldest</SelectItem>
              <SelectItem value="asc">Oldest to newest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={currentCategory}
          onValueChange={(value) =>
            setQuery({ key: "category", value, backToFirstPage: false })
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => {
                return (
                  <SelectItem
                    value={category.name.toLowerCase()}
                    key={category.id}
                  >
                    {category.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Link href={"/products/create"}>
          <Button className="w-[200px]">Create Product</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductFilterbar;
