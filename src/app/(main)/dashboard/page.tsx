"use client";
import { ConfirmDialog } from "@/components/commons/alert-dialog";
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
      <ConfirmDialog
        onConfirm={() => console.log("deleted")}
        title="heloo"
        description="are you sure to delete"
      >
        <button>delete</button>
      </ConfirmDialog>
    </div>
  );
};

export default Page;
