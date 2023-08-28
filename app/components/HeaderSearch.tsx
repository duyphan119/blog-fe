"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FC,
  FocusEvent,
  FormEvent,
  memo,
  useEffect,
  useState,
} from "react";
import { Blog, blogApi } from "../api/blog.api";
import { DEFAULT_LIMIT, ROUTES } from "../constants";
import { useQueryString } from "../hooks";
import { Input } from "./inputs";

type Props = {};

const HeaderSearch: FC<Props> = () => {
  const { getString } = useQueryString();
  const urlKeyword = getString("keyword", "");
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>(urlKeyword);
  const [result, setResult] = useState<Blog[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const handleSearch = async (keyword: string) => {
    const { blogs } = await blogApi.blogs({ keyword, limit: DEFAULT_LIMIT });
    setResult(blogs);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setVisible(false);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setVisible(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword !== "") {
      router.push(`${ROUTES.SEARCH}?keyword=${keyword}`);
    }
  };

  useEffect(() => {
    if (keyword !== "") {
      const timerId = setTimeout(() => {
        handleSearch(keyword);
      }, 500);
      return () => clearTimeout(timerId);
    }
  }, [keyword]);

  return (
    <form onSubmit={handleSubmit} className="xl:px-44 px-4 relative">
      <Input
        placeholder="Tìm kiếm"
        type="search"
        value={keyword}
        onChange={handleChange}
        autoFocus={true}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {visible && keyword !== "" ? (
        <div className="absolute top-full xl:left-44 xl:right-44 left-4 right-4 bg-white z-10 border border-hr">
          {result.length > 0 ? (
            <ul className="">
              {result.map((blog) => {
                return (
                  <li className="" key={blog._id}>
                    <Link
                      href={`${ROUTES.BLOGS}/${blog.slug}`}
                      className="block border-b border-b-hr p-2 hover:text-darkpink"
                    >
                      {blog.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="">Không tìm thấy bài viết phù hợp</div>
          )}
          {result.length > 0 ? (
            <div className="">
              <Link
                href={`${ROUTES.SEARCH}?keyword=${keyword}`}
                className="flex items-center p-2 justify-center hover:text-darkpink"
              >
                Xem tất cả
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  );
};

export default memo(HeaderSearch);
