import { blogApi } from "@/app/api/blog.api";
import { BlogPage } from "@/app/components/pages";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  let blog = await blogApi.blogDetail(slug);
  return {
    title: blog?.title ?? "Không tìm thấy bài viết",
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = params;
  let blog = await blogApi.blogDetail(slug);
  if (!blog) {
    notFound();
  }
  return <BlogPage blog={blog} />;
};

export default Page;
