import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className=" flex flex-col md:flex-row gap-3 md:gap-5">
      <div className="p-3 md:p-5  w-full md:w-[500px]">
        <Skeleton className="w-full aspect-square" />
        <div className="flex gap-2 items-center py-2 justify-between">
          {[1, 2, 3, 4].map((index) => {
            return <Skeleton className="w-20 h-20" key={index} />;
          })}
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Skeleton className="w-full h-12" />

          <Skeleton className=" h-12 w-full" />
        </div>
        <Skeleton className="w-full h-[100px]" />
      </div>
    </div>
  );
};

export default Loading;
