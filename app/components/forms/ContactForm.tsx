"use client";

import { contactApi, CreateContactDTO } from "@/app/api/contact.api";
import { toastSuccess } from "@/app/config/toastify";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Textarea } from "../inputs";

type Props = {};

const ContactForm: FC<Props> = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues });
  const onSubmit: SubmitHandler<CreateContactDTO> = async (values) => {
    const data = await contactApi.create(values);
    if (data) {
      reset(defaultValues);
      toastSuccess(
        "Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi đến trong thời gian sớm nhất"
      );
    }
  };

  const formLoading = isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-bold">Liên hệ với tôi</h1>
      <p className="text-sm text-grey">
        Đặt câu hỏi cho tôi? Hợp tác cùng tôi? Đề nghị với tôi?
      </p>
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-6">
          <Input
            placeholder="Họ"
            register={register("lastName", {
              required: {
                value: true,
                message: "Vui lòng nhập họ",
              },
            })}
            error={errors.lastName?.message ?? ""}
            disabled={formLoading}
          />
        </div>
        <div className="col-span-6">
          <Input
            placeholder="Tên"
            register={register("firstName", {
              required: {
                value: true,
                message: "Vui lòng nhập tên",
              },
            })}
            error={errors.firstName?.message ?? ""}
            disabled={formLoading}
          />
        </div>
        <div className="col-span-12">
          <Input
            placeholder="Email"
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
          />
        </div>
        <div className="col-span-12">
          <Input
            placeholder="Số điện thoại"
            register={register("phone", {
              required: {
                value: true,
                message: "Vui lòng nhập số điện thoại",
              },
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                message: "Số điện thoại không hợp lệ",
              },
            })}
            error={errors.phone?.message ?? ""}
            disabled={formLoading}
          />
        </div>
        <div className="col-span-12">
          <Textarea
            placeholder="Lời nhắn"
            register={register("message", {
              required: {
                value: true,
                message: "Vui lòng nhập lời nhắn",
              },
            })}
            error={errors.message?.message ?? ""}
            disabled={formLoading}
          />
        </div>
        <div className="col-span-12">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-darkpink uppercase w-full"
            disabled={formLoading}
          >
            Gửi {formLoading ? "..." : ""}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
