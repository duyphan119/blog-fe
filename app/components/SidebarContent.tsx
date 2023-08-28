import { FC, memo, useContext } from "react";
import { HomePageContext } from "../context";
import CategoryCard from "./CategoryCard";
import CountBlogs from "./CountBlogs";
import { SubscriberForm } from "./forms";
import SocialMedia from "./SocialMedia";

type Props = {};

const SidebarContent: FC<Props> = () => {
  const { countBlogs } = useContext(HomePageContext);
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
