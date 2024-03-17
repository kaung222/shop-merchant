import useSetUrlQuery from "@/lib/useSetUrlQuery";
import ReactPaginate from "react-paginate";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";

type PageProps = {
  total?: number;
  pageCount: number;
};

const PaginationBar = ({ pageCount, total }: PageProps) => {
  const { setQuery, getQuery } = useSetUrlQuery();
  const HandlePageChange = (selectedItem: { selected: number }) => {
    setQuery({
      key: "page",
      value: String(selectedItem.selected + 1),
      backToFirstPage: false,
    });
  };

  const itemPerView = getQuery("limit");
  const HandlePageLimitChange = (value: string) => {
    setQuery({
      key: "limit",
      value: value,
      backToFirstPage: true,
    });
  };
  const currentPage = Number(getQuery("page")) - 1;

  return (
    <div className="paginate space-x-12 p-3 flex items-center justify-between">
      <ReactPaginate
        pageCount={pageCount}
        breakLabel="..."
        activeClassName="bg-primary p-2 text-white dark:text-slate-800 rounded-full"
        pageLinkClassName="p-2"
        initialPage={currentPage}
        nextLabel="next >"
        onPageChange={HandlePageChange}
        pageRangeDisplayed={2}
        breakClassName="px-3 py-1"
        className="flex items-center justify-center gap-3 "
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      <p className=" text-xl text-primary">Total : {total}</p>
      <div className="">
        <Select onValueChange={HandlePageLimitChange} value={itemPerView}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PaginationBar;
