"use client";
import Link from "next/link";
import { navbarLinks } from "@/data/Navbar.data";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import IconBack from "@/assets/icons/IconBack";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
const Sidebar = () => {
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    router.push("/login");
    toast.success("Logout successfully!", { position: "top-center" });
  };
  return (
    <div
      className={cn("duration-200 h-full", isOpen ? "w-[300px]" : "w-[85px]")}
    >
      <div className="flex min-h-screen space-y-2 bg-slate-200 justify-start  h-full flex-col text-gray-800 dark:bg-gray-700 dark:text-white items-center p-3 relative">
        <div className="w-14 h-14 bg-slate-600 rounded-lg"></div>
        {navbarLinks.map((navlink) => {
          return (
            <Link
              href={`${navlink.to}`}
              key={navlink.id}
              className={cn(
                "flex items-center justify-start w-full py-3 px-5 space-x-5 rounded-md hover:bg-blue-500 hover:text-white",
                path === navlink.name.toLowerCase() && "bg-blue-500 text-white"
              )}
            >
              {navlink.icon}
              <p className={cn("ml-9", !isOpen && "hidden")}>{navlink.name}</p>
            </Link>
          );
        })}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "top-1 p-2 absolute right-1 duration-200 rounded-full dark:text-white dark:bg-blue-500",
            isOpen && "-rotate-180"
          )}
          variant="ghost"
        >
          <IconBack />
        </Button>
        <Button onClick={handleLogout} className=" absolute bottom-2 w-[90%]">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
