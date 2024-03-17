"use client";
import FormInput from "../commons/FormInput";
import Button from "@/components/commons/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginValidationSchema } from "@/validators/auth_validator";
import { useAppDispatch } from "@/store/hooks";
import { storeEmail } from "@/store/slices/emailSlice";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "@/api/auth/useLogin";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginValidationSchema>>({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      emailOrPhone: "thirdgodiswinning@gmail.com",
      password: "password",
    },
  });
  const { mutate, error, data } = useLogin();
  console.log(data);

  const submitHandler = (otpProps: {
    emailOrPhone: string;
    password: string;
  }) => {
    mutate(otpProps, {
      onSuccess(res) {
        toast.success("Welcome to merchant dashboard");
        localStorage.setItem("user", JSON.stringify(res.merchant));
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
        <h1 className=" text-center font-bold text-3xl py-5">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className=" mt-7 space-y-3"
          >
            <FormInput
              type="text"
              name="emailOrPhone"
              placeholder="Email"
              form={form}
              label="Email"
              defaultValue="thirdgodiswinning@gmail.com"
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
