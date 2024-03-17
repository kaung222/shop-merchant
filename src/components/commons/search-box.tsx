import { Input } from "../ui/input";
import IconSearch from "@/assets/icons/IconSearch";
import useSetUrlQuery from "@/lib/useSetUrlQuery";
import { useDebouncedCallback } from "use-debounce";

const SearchBox = () => {
  const { setQuery, getQuery, deleteQuery } = useSetUrlQuery();
  const search = getQuery("search");
  const debounced = useDebouncedCallback(
    (value) => setQuery({ key: "search", value, backToFirstPage: true }),
    1000
  );
  return (
    <div className=" flex px-3 items-center dark:bg-black rounded-md justify-center border-2 border-blue-500">
      <IconSearch />
      <Input
        defaultValue={search}
        placeholder="Search"
        className=" border-none outline-none"
        onChange={(e) => debounced(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
