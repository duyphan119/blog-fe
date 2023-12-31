"use client";

import Link from "next/link";
import { FC, memo, useCallback, useState } from "react";
import { BiMenu, BiSearch } from "react-icons/bi";
import { ROUTES, SOCIAL_MEDIA_LIST } from "../constants";
import HeaderDrawer from "./HeaderDrawer";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
type Props = {};

const Header: FC<Props> = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleToggleOpenSearch = () => {
    setOpenSearch((prevState) => !prevState);
  };

  const handleToggleOpenDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  return (
    <header className="">
      <div className="xl:px-44 px-4 flex justify-between items-center gap-5 h-16">
        <ul className="flex gap-4 flex-1">
          {SOCIAL_MEDIA_LIST.map((item) => {
            const { icon: Icon, href, color, title } = item;
            return (
              <li
                key={title}
                className={`hover:text-darkpink ${color}`}
                title={title}
              >
                <Link href={href} className="block" target="_blank">
                  <Icon />
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href={ROUTES.HOME} className="">
          <span className="font-bold">ITS</span>
        </Link>
        <ul className="flex-1 flex gap-4 items-center justify-end ">
          <li className="sm:hidden">
            <button
              type="button"
              className="hover:text-darkpink cursor-pointer flex items-center"
              onClick={handleToggleOpenDrawer}
            >
              <BiMenu className="text-xl" />
            </button>
            <HeaderDrawer open={openDrawer} onClose={handleCloseDrawer} />
          </li>
          <li className="">
            <button
              type="button"
              className="hover:text-darkpink cursor-pointer flex items-center"
              onClick={handleToggleOpenSearch}
              title="Tìm kiếm"
            >
              <BiSearch className="text-xl" />
            </button>
          </li>
        </ul>
      </div>
      {openSearch ? <HeaderSearch /> : null}
      <HeaderNav open={openSearch} />
    </header>
  );
};

export default memo(Header);
