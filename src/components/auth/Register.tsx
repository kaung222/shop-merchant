"use client";
import FormInput from "../commons/FormInput";
import Button from "@/components/commons/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  LoginValidationSchema,
  RegisterValidationSchema,
} from "@/validators/auth_validator";
import { useAppDispatch } from "@/store/hooks";
import { storeEmail } from "@/store/slices/emailSlice";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "@/api/auth/useLogin";
import { useRegister } from "@/api/auth/useRegister";

export default function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterValidationSchema>>({
    resolver: zodResolver(RegisterValidationSchema),
    defaultValues: {
      email: "thirdgodiswinning@gmail.com",
      password: "password",
      phone: "09797961628",
      address: "",
      name: "sport glory",
      company: "",
    },
  });
  const { mutate, error, data } = useRegister();

  const submitHandler = (values: z.infer<typeof RegisterValidationSchema>) => {
    console.log(values);
    mutate(values, {
      onSuccess(res) {
        toast.success("Welcome to merchant dashboard");
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("access_token", JSON.stringify(res.accessToken));
        router.push("dashboard");
      },
      onError() {
        //@ts-expect-error
        toast.error(error.response.data.message);
      },
    });
  };

  return (
    <div className="flex items-center  justify-center relative h-screen">
      <div className=" w-full min-h-[500px] md:w-[400px] mt-12 p-3 md:p-5">
        <h1 className=" text-center font-bold text-3xl py-5">Register</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className=" mt-7 space-y-3"
          >
            <FormInput
              type="text"
              name="name"
              placeholder="Your Name"
              form={form}
              label="Name"
            />
            <FormInput
              type="text"
              name="email"
              placeholder="Email"
              form={form}
              label="Email"
            />
            <FormInput
              type="text"
              name="address"
              placeholder="Enter Address"
              form={form}
              label="Address"
            />
            <FormInput
              type="text"
              name="phone"
              placeholder="09...."
              form={form}
              label="Phone"
            />
            <FormInput
              type="text"
              name="company"
              placeholder="Company"
              form={form}
              label="Company (optional)"
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              form={form}
              label="Password"
              defaultValue="password"
            />
            <Button variant="contained" className=" mt-7">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
