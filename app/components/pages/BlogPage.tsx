"use client";

import api from "@/app/api";
import { Blog } from "@/app/api/blog.api";
import { Replies, Reply } from "@/app/api/reply.api";
import moment from "moment";
import "moment/locale/vi";
import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import CategoryCard from "../CategoryCard";
import { Container, HeadingPage } from "../common";
import { ReplyForm } from "../forms";
import SidebarContent from "../SidebarContent";

type Props = {
  blog: Blog;
};

const BlogPage: FC<Props> = ({ blog }) => {
  const [{ replies, count }, setReplies] = useState<Replies>({
    count: 0,
    totalPages: 0,
    replies: [],
  });
  const [avatars, setAvatars] = useState<any[]>([]);

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
      const data = await api.reply.replies({ blogId: blog._id });
      try {
        const images = await Promise.all(
          data.replies.map((reply) => api.avatar.generate(`${reply._id}`))
        );
        setAvatars(images);
      } catch (error) {
        console.log(error);
      } finally {
        setReplies(data);
      }
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
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
            </div>
            <CategoryCard title={`${count} Phản hồi`}>
              <ul className="flex flex-col gap-3">
                {replies.map((reply, index) => {
                  return (
                    <li className="flex gap-3" key={reply._id}>
                      <div className="avatar">
                        <div className="rounded-full w-12 h-12 bg-blue flex items-center justify-center">
                          <Image
                            alt="avatar"
                            src={URL.createObjectURL(
                              new Blob([avatars[index]?.svg], {
                                type: "image/svg+xml",
                              })
                            )}
                            height={36}
                            width={36}
                            priority={true}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm mb-1">
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
