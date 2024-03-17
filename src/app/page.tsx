"use client";
import Login from "@/components/auth/Login";
import { redirect } from "next/navigation";
const Page = () => {
  const access_token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  console.log(access_token);
  if (!access_token) return redirect("/login");

  return (
    <div className="">
      {/* <Login /> */}
      hello
    </div>
  );
};

export default Page;
