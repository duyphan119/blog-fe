"use client";

import { Blog, blogApi, Blogs } from "@/app/api/blog.api";
import { Category } from "@/app/api/category.api";
import { DEFAULT_LIMIT, ROUTES } from "@/app/constants";
import { FC, useEffect, useMemo, useState } from "react";
import { BsFillGridFill, BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import BlogCard from "../BlogCard";
import Breadcrumbs from "../Breadcrumbs";
import { Container, HeadingPage } from "../common";
import SidebarContent from "../SidebarContent";

type Props = {
  category?: Category | null;
  blogs: Blogs;
  currentBreadcrumbs?: string;
};

type DisplayType = {
  title: string;
  icon: IconType;
  rows: number;
};

const displayTypes: DisplayType[] = [
  {
    title: "Hiển thị 1 cột",
    icon: FaList,
    rows: 1,
  },
  {
    title: "Hiển thị 2 cột",
    icon: BsFillGridFill,
    rows: 2,
  },
  {
    title: "Hiển thị 3 cột",
    icon: BsFillGrid3X3GapFill,
    rows: 3,
  },
];

const BlogsPage: FC<Props> = ({
  category,
  blogs: { blogs, count },
  currentBreadcrumbs,
}) => {
  const [data, setData] = useState<Blog[]>([]);
  const [pageSize, setPageSize] = useState(DEFAULT_LIMIT);
  const [displayType, setDisplayType] = useState<DisplayType>(displayTypes[0]);

  const links = useMemo(() => {
    const result = [
      {
        href: ROUTES.HOME,
        label: "Trang chủ",
      },
    ];
    if (category) {
      result.push({
        href: ROUTES.BLOGS,
        label: "Bài viết",
      });
    }
    return result;
  }, [category]);

  const handleClick = async () => {
    const newPageSize =
      blogs.length < count ? pageSize + DEFAULT_LIMIT : DEFAULT_LIMIT;
    try {
      const { blogs } = await blogApi.blogs({
        ...(category ? { categoryIds: [category._id] } : {}),
        limit: newPageSize,
      });
      setData(blogs);
    } catch (error) {
    } finally {
      setPageSize(newPageSize);
    }
  };

  useEffect(() => {
    setData(blogs);
  }, [blogs]);

  return (
    <Container>
      <HeadingPage>
        <Breadcrumbs
          links={links}
          current={currentBreadcrumbs || (category?.name ?? "Tất cả bài viết")}
          currentWrap={true}
        />
      </HeadingPage>
      <div className="my-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="lg:col-span-8 col-span-12 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="">{count} bài viết</div>
              <ul className="flex items-center gap-2">
                {displayTypes.map((item) => {
                  const { title, icon: Icon } = item;
                  const isActive = title === displayType.title;
                  return (
                    <li className="" key={title}>
                      <button
                        type="button"
                        className={`border rounded-sm p-1 hover:text-white hover:bg-darkpink hover:border-darkpink ${
                          isActive
                            ? "border-darkpink bg-darkpink text-white"
                            : "border-black"
                        }`}
                        title={title}
                        key={title}
                        onClick={() => setDisplayType(item)}
                      >
                        <Icon />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {count === 0 ? (
              <p className="bg-red text-white p-2">
                Hiện tại không có bài viết
              </p>
            ) : (
              <>
                <ul className={`grid grid-cols-12 gap-3`}>
                  {data.map((blog) => {
                    return (
                      <li
                        className={`${
                          displayType.rows === 1
                            ? "col-span-12"
                            : displayType.rows === 2
                            ? "col-span-6"
                            : "col-span-4"
                        }`}
                        key={blog._id}
                      >
                        <BlogCard
                          blog={blog}
                          type={displayType.rows === 1 ? "row" : "default"}
                        />
                      </li>
                    );
                  })}
                </ul>
                {count <= DEFAULT_LIMIT ? null : (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="bg-darkpink text-white hover:bg-white hover:text-darkpink border-2 border-darkpink rounded-sm px-6 py-2 uppercase"
                      onClick={handleClick}
                    >
                      {data.length < count ? "Xem thêm" : "Thu gọn"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="lg:col-span-4 col-span-12">
            <SidebarContent />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BlogsPage;
