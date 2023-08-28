"use client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import { Blog } from "../api/blog.api";
import { ROUTES, THUMBNAIL_PLACEHOLDER } from "../constants";

type Props = {
  type: "in-thumbnail" | "bottom-thumbnail" | "row" | "default";
  blog: Blog;
};

const BlogCard: FC<Props> = ({ type, blog }) => {
  return (
    <article className={`relative group ${type === "row" ? "flex gap-3" : ""}`}>
      <Link
        href={`${ROUTES.BLOGS}/${blog.slug}`}
        className={`block overflow-hidden relative ${
          type === "row" ? "w-40 h-24" : "w-full h-0 pb-[65%]"
        }`}
      >
        <Image
          alt="thumbnail"
          src={blog.thumbnail || THUMBNAIL_PLACEHOLDER}
          priority={true}
          sizes="(max-width:600px) 100vw ; (max-width:900px) 50vw; (max-width:1200px) 33vw; (min-width: 1200px) 20vw"
          fill={true}
          className="group-hover:scale-105 transition-all duration-500"
          blurDataURL={THUMBNAIL_PLACEHOLDER}
          placeholder="blur"
        />
      </Link>
      <div
        className={` ${
          type === "in-thumbnail"
            ? "absolute bottom-4 left-4 right-10 bg-black"
            : ""
        } ${
          type === "bottom-thumbnail"
            ? "absolute -bottom-14 left-4 right-0 bg-white"
            : ""
        } ${type === "default" ? "mt-2" : ""} ${type === "row" ? "" : "p-2"} `}
      >
        {type === "row" ? null : (
          <small className="uppercase text-darkpink line-clamp-1">
            {blog.categories.map((category) => category.name).join(", ")}
          </small>
        )}
        <Link
          href={`${ROUTES.BLOGS}/${blog.slug}`}
          className={`hover:text-darkpink w-full ${
            type === "in-thumbnail" ? "text-white" : ""
          } ${type === "bottom-thumbnail" ? "text-black" : ""} font-semibold ${
            type === "row" ? "" : "my-3 h-12"
          } line-clamp-2`}
          title={blog.title}
        >
          {blog.title}
        </Link>
        <small
          className={`${type === "in-thumbnail" ? "text-lightgrey" : ""} ${
            type === "bottom-thumbnail" ? "text-grey" : ""
          } line-clamp-1 ${type === "row" ? "mt-1" : ""}`}
        >
          <span className="uppercase ">{blog.author.name}</span>
          <i className="mx-1.5">•</i>
          <time className="">
            {moment(blog.createdAt).format("DD-MM-YYYY")}
          </time>
        </small>
      </div>
    </article>
  );
};

export default memo(BlogCard);
