"use client";

import { CreateReplyDTO, Reply, replyApi } from "@/app/api/reply.api";
import { REPLY_INFO_KEY } from "@/app/constants";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Checkbox, Input, Textarea } from "../inputs";

type Props = {
  onSend?: (reply: Reply) => void;
  blogId: string;
};

type DTO = CreateReplyDTO & {
  rememberMe: boolean;
};

const ReplyForm: FC<Props> = ({ onSend, blogId }) => {
  const initialValues: DTO = {
    content: "",
    email: "",
    name: "",
    website: "",
    rememberMe: false,
  };
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
    setValue,
  } = useForm<DTO>({
    defaultValues: initialValues,
  });
  useEffect(() => {
    const info = JSON.parse(localStorage.getItem(REPLY_INFO_KEY) || "null");
    if (info) {
      setValue("email", info?.email ?? "");
      setValue("name", info?.name ?? "");
      setValue("website", info?.website ?? "");
      setValue("rememberMe", true);
    }
  }, []);
  const onSubmit: SubmitHandler<DTO> = async (values) => {
    const { rememberMe, ...input } = values;
    if (rememberMe) {
      const { content, ...info } = input;
      localStorage.setItem(REPLY_INFO_KEY, JSON.stringify(info));
    }
    const data = await replyApi.create({ ...input, blogId });
    if (data) {
      onSend?.(data);
      reset(initialValues);
    }
  };

  const formLoading = isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3">
          <Textarea
            placeholder="Nội dung"
            register={register("content", {
              required: {
                value: true,
                message: "Nội dung phản hồi không được để trống",
              },
            })}
            disabled={formLoading}
          />
        </div>
        <div className="col-span-1">
          <Input
            placeholder="Tên"
            register={register("name", {
              required: {
                value: true,
                message: "Tên không được để trống",
              },
            })}
            disabled={formLoading}
          />
        </div>
        <div className="col-span-1">
          <Input
            placeholder="Email"
            register={register("email", {
              required: {
                value: true,
                message: "Email không được để trống",
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Email không hợp lệ",
              },
            })}
            disabled={formLoading}
          />
        </div>
        <div className="col-span-1">
          <Input
            placeholder="Website"
            register={register("website")}
            disabled={formLoading}
          />
        </div>
        <div className="col-span-3">
          <Checkbox
            label="Lưu thông tin cho lần phản hồi tiếp theo"
            register={register("rememberMe")}
            disabled={formLoading}
          />
        </div>
        <div className="col-span-3">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-darkpink uppercase"
            disabled={formLoading}
          >
            Gửi {formLoading ? "..." : ""}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReplyForm;
