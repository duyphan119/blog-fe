"use client";
import { CreateSubscriberDTO, subscriberApi } from "@/app/api/subscriber.api";
import { toastError, toastSuccess } from "@/app/config/toastify";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";

type Props = {};

const SubscriberForm: FC<Props> = () => {
  const initialValues: CreateSubscriberDTO = { email: "" };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<CreateSubscriberDTO>({ defaultValues: initialValues });

  const onSubmit: SubmitHandler<CreateSubscriberDTO> = async (values) => {
    const newSubscriber = await subscriberApi.create(values);
    if (newSubscriber) {
      toastSuccess("Cảm ơn bạn sẽ đăng ký");
      reset(initialValues);
    } else {
      toastError("Xin lỗi, đã có lỗi xảy ra. Bạn vui lòng thử lại sau");
    }
  };

  const formLoading = isSubmitting;

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        Chúng tôi sẽ gửi thông báo khi có bài viết mới qua email của bạn.
      </div>
      <Input
        register={register("email", {
          required: {
            value: true,
            message: "Vui lòng nhập địa chỉ email",
          },
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "Email không hợp lệ",
          },
        })}
        error={errors.email?.message ?? ""}
        disabled={formLoading}
        placeholder="Nhập email của bạn"
      />

      <div className="">
        <button
          type="submit"
          className="bg-darkpink hover:bg-white text-white hover:text-darkpink border-[3px] border-darkpink rounded-sm px-6 py-2"
          disabled={formLoading}
        >
          Đăng ký {formLoading ? "..." : ""}
        </button>
      </div>
    </form>
  );
};

export default SubscriberForm;
