"use client";

import Link from "next/link";
import { FC, memo, useContext } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { ROUTES } from "../constants";
import { HomePageContext } from "../context";

type Props = {
  open?: boolean;
};

const HeaderNav: FC<Props> = ({ open }) => {
  const { categories } = useContext(HomePageContext);

  return (
    <nav
      className={`hidden sm:block border-b border-b-hr ${
        open ? "" : "border-t border-t-hr"
      }`}
    >
      <ul className="lg:px-44 px-4 uppercase font-medium flex gap-3 items-center justify-center relative">
        <li className="">
          <Link href={ROUTES.HOME} className="hover:text-darkpink py-2">
            Trang chủ
          </Link>
        </li>
        <li className="">|</li>
        <li className="group">
          <p className="py-2 flex gap-1 items-center">
            Danh mục
            <BsFillCaretDownFill />
          </p>
          {categories.length > 0 ? (
            <ul className="group-hover:grid hidden absolute top-full lg:left-44 lg:right-44 left-4 right-4 grid-cols-12 border-b border-b-hr bg-white border-t-2 border-t-darkpink border-x border-x-hr p-4 gap-4 max-h-[50vh] overflow-y-auto z-[2]">
              {categories.map((category) => (
                <li
                  className="lg:col-span-2 col-span-6 md:col-span-4 sm:col-span-3 capitalize"
                  key={category._id}
                  title={category.name}
                >
                  <Link
                    href={`${ROUTES.BLOGS}?category=${category.slug}`}
                    className="hover:text-darkpink"
                  >
                    <strong>{category.name}</strong>
                  </Link>
                  {category.children.length > 0 ? (
                    <ul className="mt-1">
                      {category.children.map((child) => {
                        return (
                          <li className="" key={child._id}>
                            <Link
                              href={`${ROUTES.BLOGS}?category=${child.slug}`}
                              className="hover:text-darkpink"
                            >
                              {child.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
        <li className="">|</li>
        <li className="">
          <Link href={ROUTES.BLOGS} className="hover:text-darkpink py-2">
            Bài viết
          </Link>
        </li>
        <li className="">|</li>
        <li className="">
          <Link href="/" className="hover:text-darkpink py-2">
            Liên hệ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default memo(HeaderNav);
