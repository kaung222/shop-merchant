import React from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SearchBox from "../commons/search-box";
import useSetUrlQuery from "@/lib/useSetUrlQuery";

const OrderFilterbar = () => {
  // const { register } = useForm();
  const { setQuery, getQuery } = useSetUrlQuery();
  return (
    <div className="flex items-center justify-between space-x-10">
      <SearchBox />
      <div className="flex py-3 items-center space-x-6">
        <Select
          value={getQuery("sort")}
          onValueChange={(value) =>
            setQuery({ key: "sort", value, backToFirstPage: true })
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
        {/* filter by status */}
        <Select
          value={getQuery("status")}
          onValueChange={(value) =>
            setQuery({ key: "status", value, backToFirstPage: true })
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrderFilterbar;
