"use client";

import { FC } from "react";
import { RegisterDTO } from "@/app/api/auth.api";
import { ROUTES } from "@/app/constants";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiLogoFacebook, BiLogoGithub, BiLogoGoogle } from "react-icons/bi";
import Input from "../inputs/Input";

type Props = {
  isRegisterForm?: boolean;
};

const AuthForm: FC<Props> = ({ isRegisterForm }) => {
  // const navigate = useNavigate();
  // const appDispatch = useAppDispatch();
  const initialValues = {
    email: "",
    password: "",
    ...(isRegisterForm ? { fullName: "", phone: "" } : {}),
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterDTO>({ defaultValues: initialValues });

  const onSubmit: SubmitHandler<RegisterDTO> = async (values) => {
    // const formData = { ...values };
    // try {
    //   const response = await (isRegisterForm
    //     ? authApi.register(formData)
    //     : authApi.login(formData));
    //   const { data } = response.data;
    //   if (data) {
    //     appDispatch(login(data));
    //     navigate(ROUTES.ADMIN);
    //     toastSuccess("Đăng nhập thành công");
    //   }
    // } catch (error) {
    //   toastError("Đăng nhập không thành công");
    // }
  };

  return (
    <section className="h-screen px-8 md:px-48">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-lg">Đăng nhập bằng</p>

                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white bg-facebook flex items-center justify-center text-lg"
                  title="Đăng nhập bằng Facebook"
                >
                  <BiLogoFacebook />
                </button>

                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white bg-google flex items-center justify-center text-lg"
                  title="Đăng nhập bằng Google"
                >
                  <BiLogoGoogle />
                </button>

                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white bg-github flex items-center justify-center text-lg"
                  title="Đăng nhập bằng Github"
                >
                  <BiLogoGithub />
                </button>
              </div>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  Or
                </p>
              </div>
              {isRegisterForm ? (
                <div className="mb-6">
                  <Input
                    label="Họ tên"
                    register={register("fullName", {
                      required: {
                        value: true,
                        message: "Vui lòng nhập họ tên",
                      },
                    })}
                    error={errors.fullName?.message ?? ""}
                    disabled={isSubmitting}
                  />
                </div>
              ) : null}

              <div className="mb-6">
                <Input
                  label="Địa chỉ Email"
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
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <Input
                  label="Mật khẩu"
                  type="password"
                  register={register("password", {
                    required: {
                      value: true,
                      message: "Vui lòng nhập mật khẩu",
                    },
                  })}
                  error={errors.password?.message ?? ""}
                  disabled={isSubmitting}
                />
              </div>

              {isRegisterForm ? (
                <div className="mb-6">
                  <Input
                    label="Số điện thoại"
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
                    disabled={isSubmitting}
                  />
                </div>
              ) : null}

              <div className="mb-6 flex items-center justify-between">
                <div className="mb-[0.125rem] flex items-center gap-2 min-h-[1.5rem]">
                  <input className="" type="checkbox" value="" id="remember" />
                  <label
                    className="inline-block hover:cursor-pointer select-none"
                    htmlFor="remember"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>

                <Link href={ROUTES.FORGOT_PASSWORD}>Quên mật khẩu?</Link>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white bg-navy min-w-[160px]"
                  disabled={isSubmitting}
                >
                  Đăng {isRegisterForm ? "ký" : "nhập"}
                  {isSubmitting ? "..." : ""}
                </button>

                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  {isRegisterForm ? "Đã " : "Chưa "}có tài khoản?&nbsp;
                  <Link
                    href={isRegisterForm ? ROUTES.LOGIN : ROUTES.REGISTER}
                    className="text-red transition duration-150 ease-in-out"
                  >
                    Đăng {isRegisterForm ? "nhập" : "ký"}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
