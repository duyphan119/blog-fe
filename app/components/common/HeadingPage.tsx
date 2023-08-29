"use client";

import { Blog } from "@/app/api/blog.api";
import { THUMBNAIL_PLACEHOLDER } from "@/app/constants";
import moment from "moment";
import Image from "next/image";
import { FC, memo, ReactNode } from "react";

type Props = {
  blog?: Blog;
  children?: ReactNode;
  className?: string;
};

const HeadingPage: FC<Props> = ({ blog, children, className = "" }) => {
  return blog ? (
    <div
      className={`relative ${className} pt-24 lg:pt-64 md:pt-48 sm:pt-36 px-10 pb-10`}
    >
      <div className="absolute top-0 right-0 left-0 bottom-0 overflow-hidden -z-10">
        <Image
          alt="thumbnail"
          src={blog?.thumbnail ?? THUMBNAIL_PLACEHOLDER}
          priority={true}
          sizes="(max-width:600px) 100vw"
          fill={true}
          className="group-hover:scale-105 transition-all duration-500 object-cover"
        />
      </div>

      <div className="bg-black text-white p-4">
        <small className="uppercase text-darkpink">
          {blog.categories.map((category) => category.name).join(", ")}
        </small>
        <p className="my-4 text-2xl">{blog.title}</p>{" "}
        <small className="text-lightgrey line-clamp-1">
          <span className="uppercase ">{blog.author.name}</span>
          <i className="mx-2">•</i>
          <time className="">
            {moment(blog.createdAt).format("DD-MM-YYYY")}
          </time>
        </small>
      </div>
    </div>
  ) : (
    <div
      className={`w-full h-60 text-grey bg-lightblue flex flex-col items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};

export default memo(HeadingPage);
