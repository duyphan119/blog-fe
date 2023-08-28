"use client";
import Link from "next/link";
import { FC, Fragment, memo } from "react";
import { Category } from "../api/category.api";
import { ROUTES } from "../constants";
import CategoryCard from "./CategoryCard";

type Props = {
  countBlogs: Array<{ category: Category; count: number }>;
};

const CountBlogs: FC<Props> = ({ countBlogs }) => {
  return (
    <CategoryCard title="Danh mục bài viết">
      <ul className="flex flex-col gap-2">
        {countBlogs.map(({ count, category }) => {
          if (!count) return <Fragment key={category._id}></Fragment>;
          return (
            <Fragment key={category._id}>
              <li>
                <Link
                  href={`${ROUTES.BLOGS}?category=${category.slug}`}
                  className="flex justify-between group"
                >
                  <span className="uppercase group-hover:text-darkpink">
                    {category.name}
                  </span>
                  <span className="text-grey">{count}</span>
                </Link>
              </li>
              <li className="h-[1px] w-full bg-hr"></li>
            </Fragment>
          );
        })}
      </ul>
    </CategoryCard>
  );
};

export default memo(CountBlogs);
