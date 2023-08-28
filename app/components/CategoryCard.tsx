"use client";
import Link from "next/link";
import { memo, ReactNode, FC } from "react";

type Props = {
  title: string;
  children: ReactNode;
  hideBorder?: boolean;
  href?: string;
};

const CategoryCard: FC<Props> = ({ title, children, hideBorder, href }) => {
  return (
    <section className="">
      <div className="flex gap-2 items-center">
        <div className="uppercase font-semibold">
          {href ? (
            <Link href={href} className="hover:text-darkpink">
              {title}
            </Link>
          ) : (
            title
          )}
        </div>
        {hideBorder ? null : <div className="h-[1px] flex-1 bg-grey"></div>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
};

export default memo(CategoryCard);
