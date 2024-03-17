"use client";
import Login from "@/components/auth/Login";
import { redirect } from "next/navigation";

const Page = () => {
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (access_token) return redirect("/dashboard");
  return (
    <div className="">
      <Login />
    </div>
  );
};

export default Page;
