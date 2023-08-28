import { Metadata } from "next";
import { blogApi, Blogs } from "../api/blog.api";
import { BlogsPage } from "../components/pages";
import { DEFAULT_LIMIT } from "../constants";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { keyword } = searchParams;

  return {
    title: `Kết quả tìm kiếm với từ khoá "${keyword}"`,
  };
}

const Page = async ({ searchParams: { keyword } }: Props) => {
  let blogs: Blogs = {
    blogs: [],
    count: 0,
    totalPages: 0,
  };
  if (keyword && keyword !== "") {
    blogs = await blogApi.blogs({
      keyword: `${keyword}`,
      limit: DEFAULT_LIMIT,
    });
  }

  return (
    <BlogsPage
      blogs={blogs}
      currentBreadcrumbs={`Kết quả tìm kiếm với từ khoá "${keyword}"`}
    />
  );
};

export default Page;
