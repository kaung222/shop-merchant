"use client";
import { test } from "@/lib/utils";
import axios from "axios";

const Page = () => {
  const handleClick = async () => {
    const { data } = await axios.get(
      "http://localhost:5050/api/v1/status/income"
    );
    console.log(data);
  };

  return (
    <div>
      <button onClick={handleClick}>add</button>
    </div>
  );
};

export default Page;
