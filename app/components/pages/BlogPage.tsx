"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Blog } from "@/app/api/blog.api";
import { THUMBNAIL_PLACEHOLDER } from "@/app/constants";
import { DefaultLayout } from "@/app/layouts";
import moment from "moment";
import Image from "next/image";
import SidebarContent from "../SidebarContent";
import CategoryCard from "../CategoryCard";
import { ReplyForm } from "../forms";
import { useQuery } from "@apollo/client";
import {
  Replies,
  REPLIES,
  RepliesInput,
  RepliesResponse,
  Reply,
} from "@/app/api/reply.api";
import "moment/locale/vi";
import Loading from "../Loading";

type Props = {
  blog: Blog;
};

const BlogPage: FC<Props> = ({ blog }) => {
  const { data, error, loading } = useQuery<RepliesResponse, RepliesInput>(
    REPLIES,
    {
      variables: {
        repliesInput: {
          blogId: blog._id,
        },
      },
    }
  );

  const [{ replies, count }, setReplies] = useState<Replies>({
    count: 0,
    totalPages: 0,
    replies: [],
  });

  const handleSend = useCallback((reply: Reply) => {
    setReplies((prevState) => {
      return {
        ...prevState,
        replies: [reply, ...prevState.replies],
        count: prevState.count + 1,
      };
    });
  }, []);

  useEffect(() => {
    if (data) {
      setReplies(data.replies);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <DefaultLayout>
      <div className="relative">
        <div className="overflow-hidden w-full h-0 pb-[40%] relative">
          <Image
            alt="thumbnail"
            src={blog.thumbnail || THUMBNAIL_PLACEHOLDER}
            priority={true}
            sizes="(max-width:600px) 100vw"
            fill={true}
            className="group-hover:scale-105 transition-all duration-500"
          />
        </div>
        <div className="absolute bottom-10 lg:left-44 left-4 lg:right-44 right-4 bg-black text-white p-4">
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
      <div className="lg:px-44 px-4">
        <div className="grid grid-cols-12 gap-6 my-6">
          <div className="lg:col-span-8 col-span-12 flex flex-col gap-6">
            <div className="">
              <p
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></p>
            </div>
            <CategoryCard title={`${count} Phản hồi`}>
              <ul className="">
                {replies.map((reply) => {
                  return (
                    <li className="flex gap-3" key={reply._id}>
                      <div className="avatar">
                        <div className="rounded-full w-12 h-12 bg-blue"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm mb-3">
                          <strong className="uppercase ">{reply.name}</strong>
                          <span className="mx-2">•</span>
                          <span className="text-grey ">
                            {moment(reply.createdAt).fromNow()}
                          </span>
                        </p>
                        <p>{reply.content}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CategoryCard>
            <CategoryCard title="Để lại phản hồi">
              <ReplyForm onSend={handleSend} blogId={blog._id} />
            </CategoryCard>
          </div>
          <div className="lg:col-span-4 col-span-12 flex flex-col gap-6">
            <SidebarContent />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BlogPage;
