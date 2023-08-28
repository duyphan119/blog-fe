import { Metadata } from "next";
import { blogApi } from "../api/blog.api";
import { categoryApi } from "../api/category.api";
import { BlogsPage } from "../components/pages";
import { DEFAULT_LIMIT } from "../constants";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { category: slug } = searchParams;
  if (!slug) return { title: "Tất cả bài viết" };
  let category = await categoryApi.categoryBySlug(`${slug}`);
  return {
    title: category?.name ?? "Không tìm thấy",
  };
}

const Page = async ({ searchParams: { category: slug } }: Props) => {
  const category = await categoryApi.categoryBySlug(`${slug}`);
  const blogs = await blogApi.blogs({
    limit: DEFAULT_LIMIT,
    categoryIds: category
      ? category.children.length > 0
        ? category.children.map((child) => child._id)
        : [category._id]
      : [],
  });

  return <BlogsPage category={category} blogs={blogs} />;
};

export default Page;
