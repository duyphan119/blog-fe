"use client";

import { ROUTES, SOCIAL_MEDIA_LIST } from "@/app/constants";
import Link from "next/link";
import { FC, useMemo } from "react";
import Breadcrumbs from "../Breadcrumbs";
import { Container, HeadingPage } from "../common";
import { ContactForm } from "../forms";

type Props = {};

const ContactPage: FC<Props> = () => {
  const links = useMemo(
    () => [
      {
        href: ROUTES.HOME,
        label: "Trang chủ",
      },
    ],
    []
  );

  return (
    <>
      <HeadingPage>
        <Breadcrumbs links={links} current="Liên hệ" currentWrap={true} />
      </HeadingPage>
      <Container className="my-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <ContactForm />
          </div>
          <div className="col-span-12 md:col-span-6">
            <h1 className="text-xl font-bold">Cách liên hệ khác</h1>
            <p className="text-grey text-sm">Liên hệ qua mạng xã hội</p>
            <ul className="flex flex-col gap-2 mt-4">
              {SOCIAL_MEDIA_LIST.map(
                ({ title, icon: Icon, href, bg, color }) => {
                  return (
                    <li className="" key={title}>
                      <Link
                        href={href}
                        className={`flex items-center gap-4 hover:text-darkpink`}
                      >
                        <div
                          className={`w-10 h-10 flex items-center justify-center text-white rounded-full ${bg}`}
                        >
                          <Icon />
                        </div>
                        <span>Liên hệ qua {title}</span>
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContactPage;
