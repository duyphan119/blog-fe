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
  replyApi,
} from "@/app/api/reply.api";
import "moment/locale/vi";
import Loading from "../Loading";
import { Container, HeadingPage } from "../common";

type Props = {
  blog: Blog;
};

const BlogPage: FC<Props> = ({ blog }) => {
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
    const fetchData = async () => {
      const data = await replyApi.replies({ blogId: blog._id });
      setReplies(data);
    };
    fetchData();
  }, [blog]);

  return (
    <>
      <HeadingPage blog={blog} />
      <Container>
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
      </Container>
    </>
  );
};

export default BlogPage;
