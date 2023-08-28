import { FC, memo } from "react";
import { selectCountBlogs } from "../redux/features/page";
import { useAppSelector } from "../redux/hooks";
import CategoryCard from "./CategoryCard";
import CountBlogs from "./CountBlogs";
import { SubscriberForm } from "./forms";
import SocialMedia from "./SocialMedia";

type Props = {};

const SidebarContent: FC<Props> = () => {
  const countBlogs = useAppSelector(selectCountBlogs);
  return (
    <aside className="flex flex-col gap-8">
      <SocialMedia />
      <CountBlogs countBlogs={countBlogs} />
      <CategoryCard title="Bản tin">
        <div className="border-l border-l-hr p-4">
          <SubscriberForm />
        </div>
      </CategoryCard>
    </aside>
  );
};

export default memo(SidebarContent);
