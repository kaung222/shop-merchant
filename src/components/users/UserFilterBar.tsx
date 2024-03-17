import SearchBox from "../commons/search-box";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const UserFilterbar = () => {
  return (
    <div className="flex items-center justify-between space-x-10">
      <SearchBox />
      <div className="flex py-3 items-center space-x-6">
        <Select value="newToOld">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Newest to oldest" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="newToOld">Newest to oldest</SelectItem>
              <SelectItem value="oldToNew">Oldest to newest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="banana">Admins</SelectItem>
              <SelectItem value="blueberry">Users</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserFilterbar;
