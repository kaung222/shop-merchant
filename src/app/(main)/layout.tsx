"use client";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const layout = (props: { children: React.ReactNode }) => {
  useEffect(() => {
    const access_token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (!access_token) return redirect("/login");
  }, []);
  return (
    <div>
      <div className=" dark:bg-gray-800 dark:text-white">
        <div className="flex h-screen">
          <Sidebar />
          <div className="w-full">
            <Navbar />
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
