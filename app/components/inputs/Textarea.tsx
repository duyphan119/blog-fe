"use client";

import { memo, ReactNode, useId, FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label?: string;
  rows?: number;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  required?: boolean;
  children?: ReactNode;
  disabled?: boolean;
};

const Textarea: FC<Props> = ({
  label,
  rows = 4,
  className = "",
  textareaClassName = "",
  labelClassName = "",
  placeholder = "",
  error = "",
  register,
  required = false,
  children,
  disabled = false,
}) => {
  const id = useId();
  return (
    <div className={`w-full ${className}`}>
      {label ? (
        <label
          htmlFor={id}
          className={`block mb-1 font-medium ${labelClassName}`}
        >
          {label} {required ? "(Bắt buộc)" : ""}
        </label>
      ) : null}
      {children || (
        <textarea
          id={id}
          className={`w-full border-[2px] outline-none border-black p-2 rounded-[3px] ${
            error !== "" ? "focus:border-red border-red" : "focus:border-navy"
          } ${textareaClassName}`}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          {...register}
        ></textarea>
      )}

      {error !== "" ? (
        <div className="text-red">Trường này không được bỏ trống</div>
      ) : null}
    </div>
  );
};

export default memo(Textarea);
