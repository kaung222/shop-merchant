import { toast } from "sonner";
import { Button } from "../ui/button";
import { SendOtpValidationSchema } from "@/validators/auth_validator";
import { useForm } from "react-hook-form";
import { useConfirmOtp } from "@/api/auth/useConfirmOtp";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../ui/form";
import FormInput from "../commons/FormInput";

const ConfirmOtp = () => {
  const { email } = useAppSelector((state) => state.email);
  const router = useRouter();
  const form = useForm<z.infer<typeof SendOtpValidationSchema>>({
    resolver: zodResolver(SendOtpValidationSchema),
    defaultValues: {
      otp: "",
      emailOrPhone: email,
    },
  });
  const { mutate, error } = useConfirmOtp();
  const onSubmit = (otpProps: z.infer<typeof SendOtpValidationSchema>) => {
    console.log("HI");

    mutate(
      { ...otpProps },
      {
        onSuccess(res) {
          toast.success("Welcome to admin panel");
          localStorage.setItem("access_token", JSON.stringify(res.accessToken));
          localStorage.setItem("user", JSON.stringify(res.admin));
          router.replace("dashboard");
        },
        onError() {
          //@ts-expect-error
          toast.error(error?.response.data.message);
        },
      }
    );
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" mt-7 space-y-3 p-5"
        >
          <FormInput
            type="text"
            placeholder="Enter OTP code"
            name="otp"
            form={form}
            label="OTP"
          />
          <Button type="submit" className="mt-7 bg-blue-500">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ConfirmOtp;
