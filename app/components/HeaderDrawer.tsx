"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useContext, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
import { ROUTES } from "../constants";
import { HomePageContext } from "../context";

type Props = {
  open: boolean;
  onClose: () => void;
};

const HeaderDrawer: FC<Props> = ({ open, onClose }) => {
  const pathname = usePathname();

  const { categories } = useContext(HomePageContext);

  const [openCategories, setOpenCategories] = useState<boolean>(true);

  const handleToggleOpenCategories = () => {
    setOpenCategories((prevState) => !prevState);
  };

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <>
      <div
        className={`drawer fixed top-0 bottom-0 left-0 w-[75vw] max-w-[75vw] ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-all bg-black text-white z-20`}
      >
        <ul className="mt-4 lg:px-44 px-4 uppercase font-medium flex flex-col gap-3 justify-center relative">
          <li className="text-right">
            <button type="button" onClick={onClose} className="text-xl">
              <AiOutlineClose />
            </button>
          </li>
          <li className="">
            <Link href={ROUTES.HOME} className="hover:text-darkpink block">
              Trang chủ
            </Link>
          </li>
          <li className="">
            <button
              type="button"
              className="flex gap-1 items-center justify-between w-full uppercase"
              onClick={handleToggleOpenCategories}
            >
              Danh mục
              <BsFillCaretDownFill />
            </button>
            {openCategories && categories.length > 0 ? (
              <ul className="p-2 mt-2 flex-col flex gap-2 bg-grey">
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
                      <ul className="pl-2 mt-2 flex-col flex gap-2 border-l border-l-hr">
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
          <li className="">
            <Link href={ROUTES.BLOGS} className="hover:text-darkpink block ">
              Bài viết
            </Link>
          </li>
          <li className="">
            <Link href={ROUTES.CONTACT} className="hover:text-darkpink block ">
              Liên hệ
            </Link>
          </li>
        </ul>
      </div>
      {open ? (
        <div
          className="overlay fixed top-0 bottom-0 left-0 right-0 opacity-5 z-10 bg-black"
          onClick={onClose}
        ></div>
      ) : null}
    </>
  );
};

export default HeaderDrawer;
