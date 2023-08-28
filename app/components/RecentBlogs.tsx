"use client";
import { FC, memo } from "react";
import { Blog } from "../api/blog.api";
import { ROUTES } from "../constants";
import BlogCard from "./BlogCard";
import CategoryCard from "./CategoryCard";

type Props = {
  blogs: Blog[];
};

const RecentBlogs: FC<Props> = ({ blogs }) => {
  return (
    <CategoryCard title="Bài viết gần đây" href={ROUTES.BLOGS}>
      <div className="grid grid-cols-12 gap-x-6 gap-y-20 mb-14">
        {blogs.map((blog) => {
          return (
            <div key={blog._id} className="lg:col-span-6 col-span-12">
              <BlogCard blog={blog} type="bottom-thumbnail" />
            </div>
          );
        })}
      </div>
    </CategoryCard>
  );
};

export default memo(RecentBlogs);
