"use client";

import { memo, ReactNode, useId, FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn<string>;
  required?: boolean;
  disabled?: boolean;
  value?: string;
};

const Checkbox: FC<Props> = ({
  label,
  className = "",
  inputClassName = "",
  labelClassName = "",
  placeholder = "",
  register,
  required = false,
  disabled = false,
  value = "",
}) => {
  const id = useId();
  return (
    <div className={`w-full flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        id={id}
        className={`h-4 w-4 -translate-y-[3px] border-[2px] outline-none border-black p-2 rounded-[3px] ${inputClassName}`}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        {...register}
      />
      <label
        htmlFor={id}
        className={`block mb-1 flex-1 font-medium ${labelClassName}`}
      >
        {label} {required ? "(Bắt buộc)" : ""}
      </label>
    </div>
  );
};

export default memo(Checkbox);
