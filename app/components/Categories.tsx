"use client";

import { Fragment, memo, FC } from "react";
import { BlogCategory } from "../api/blog-category.api";
import { Blog } from "../api/blog.api";
import { Category } from "../api/category.api";
import { ROUTES } from "../constants";
import BlogCard from "./BlogCard";
import CategoryCard from "./CategoryCard";

type Props = {
  countBlogs: {
    category: Category;
    count: number;
    blogs: Blog[];
  }[];
};

const Categories: FC<Props> = ({ countBlogs }) => {
  return (
    <>
      {countBlogs.map(({ category, blogs }) => {
        if (blogs.length < 3) return <Fragment key={category._id}></Fragment>;
        return (
          <CategoryCard
            key={category._id}
            title={category.name}
            href={`${ROUTES.BLOGS}?category=${category.slug}`}
          >
            <div className="grid grid-cols-12 gap-3">
              {blogs.map((blog) => {
                return (
                  <div key={blog._id} className="lg:col-span-4 col-span-12">
                    <BlogCard blog={blog} type="default" />
                  </div>
                );
              })}
            </div>
          </CategoryCard>
        );
      })}
    </>
  );
};

export default memo(Categories);
