"use client";

import Link from "next/link";
import { FC, Fragment, memo } from "react";
import { ROUTES, SOCIAL_MEDIA_LIST } from "../constants";
import { selectCategories, selectCountBlogs } from "../redux/features/page";
import { useAppSelector } from "../redux/hooks";
import NewsletterSubscriberForm from "./forms/SubscriberForm";

type Props = {};

const Footer: FC<Props> = () => {
  const countBlogs = useAppSelector(selectCountBlogs);
  const categories = useAppSelector(selectCategories);

  return (
    <footer className="xl:px-44 px-4 grid grid-cols-4 gap-6 bg-navy text-white py-10">
      <div className="lg:col-span-1 md:col-span-2 col-span-4">
        <Link href={ROUTES.HOME} className="mt-4 text-3xl font-bold block">
          <span className="font-bold">ITS</span>
        </Link>
        <p className="mb-4 mt-8 text-justify">
          Chào mừng bạn đến với blog chia sẻ kiến thức IT! Tôi là một Fullstack
          Developer với nhiều năm kinh nghiệm trong lĩnh vực này. Tôi muốn chia
          sẻ kiến thức và kinh nghiệm của mình với bạn để giúp bạn có thể thành
          công trong lĩnh vực IT.
        </p>
        <ul className="flex gap-2">
          {SOCIAL_MEDIA_LIST.map((item) => {
            const Icon = item.icon;
            return (
              <li className="" key={item.title}>
                <Link
                  href={item.href}
                  target="_blank"
                  className={`h-8 w-8 rounded-[50%] flex items-center justify-center text-white ${item.bg}`}
                >
                  <Icon />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4">
        <h4 className="uppercase text-lg font-bold">Danh mục</h4>
        <ul className="flex flex-col gap-3 mt-6">
          {countBlogs.map(({ count, category }) => {
            if (!count) return <Fragment key={category._id}></Fragment>;
            return (
              <Fragment key={category._id}>
                <li>
                  <Link
                    href={`${ROUTES.BLOGS}?category=${category.slug}`}
                    className="flex justify-between group"
                  >
                    <span className="uppercase text-lightgrey group-hover:text-darkpink">
                      {category.name}
                    </span>
                    <span className="text-grey">{count}</span>
                  </Link>
                </li>
                <li className="h-[1px] w-full bg-lightgrey"></li>
              </Fragment>
            );
          })}
        </ul>
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4">
        <h4 className="uppercase text-lg font-bold">Nhãn</h4>
        <div className="flex flex-wrap items-center gap-2 w-full mt-6">
          {categories.length > 0 &&
            categories.map((category) => {
              return category.children.map((child) => {
                return (
                  <Link
                    href={`${ROUTES.BLOGS}?category=${child.slug}`}
                    className="uppercase p-1 rounded-sm cursor-pointer text-sm border border-grey hover:text-darkpink"
                    key={child._id}
                  >
                    {child.name}
                  </Link>
                );
              });
            })}
        </div>
      </div>
      <div className="lg:col-span-1 md:col-span-2 col-span-4">
        <h4 className="uppercase text-lg font-bold">Đăng ký nhận Email</h4>
        <div className="mt-6">
          <NewsletterSubscriberForm />
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
