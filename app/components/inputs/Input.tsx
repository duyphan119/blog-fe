"use client";

import { memo, ReactNode, useId, FC, ChangeEvent, FocusEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label?: string;
  type?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  error?: string;
  register?: UseFormRegisterReturn<string>;
  required?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = ({
  label,
  type = "text",
  className = "",
  inputClassName = "",
  labelClassName = "",
  placeholder = "",
  error = "",
  register,
  required = false,
  children,
  disabled = false,
  value,
  onChange,
  autoFocus = false,
  onBlur,
  onFocus,
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
        <input
          type={type}
          id={id}
          className={`w-full border-[2px] outline-none border-black p-2 rounded-[3px] ${
            error !== "" ? "focus:border-red border-red" : "focus:border-navy"
          } ${inputClassName}`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          onBlur={onBlur}
          onFocus={onFocus}
          {...register}
        />
      )}

      {error !== "" ? (
        <div className="text-red">Trường này không được bỏ trống</div>
      ) : null}
    </div>
  );
};

export default memo(Input);
