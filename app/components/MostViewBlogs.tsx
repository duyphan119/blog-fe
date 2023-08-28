"use client";

import { FC, memo } from "react";
import { Blog } from "../api/blog.api";
import BlogCard from "./BlogCard";

type Props = {
  blogs: Blog[];
};

const MostViewBlogs: FC<Props> = ({ blogs: [firstBlog, ...blogs] }) => {
  return (
    <section className="lg:grid lg:grid-cols-12 gap-1 flex flex-col ">
      <div className="lg:col-span-8">
        <BlogCard type="in-thumbnail" blog={firstBlog} />
      </div>
      <div className="lg:col-span-4 flex flex-col gap-1">
        {blogs.map((blog) => {
          return <BlogCard type="in-thumbnail" key={blog._id} blog={blog} />;
        })}
      </div>
    </section>
  );
};

export default memo(MostViewBlogs);
