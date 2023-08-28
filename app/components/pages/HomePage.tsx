"use client";

import HomePageContext, {
  HomePageProvider,
} from "@/app/context/HomePageContext";
import { DefaultLayout } from "@/app/layouts";
import { FC, useContext } from "react";
import Categories from "../Categories";
import MostViewBlogs from "../MostViewBlogs";
import RecentBlogs from "../RecentBlogs";
import SidebarContent from "../SidebarContent";
import { MostViewBlogsSkeleton, RecentBlogsSkeleton } from "../skeleton";

type Props = {};

const HomePage: FC<Props> = () => {
  const { recentBlogs, mostViewBlogs, countBlogs } =
    useContext(HomePageContext);
  return (
    <DefaultLayout>
      <div className="xl:mx-44 mx-4 my-2">
        {mostViewBlogs.length > 0 ? (
          <MostViewBlogs blogs={mostViewBlogs} />
        ) : (
          <MostViewBlogsSkeleton />
        )}
        <div className="grid grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-8 col-span-12 flex flex-col gap-8">
            {recentBlogs.length > 0 ? (
              <RecentBlogs blogs={recentBlogs} />
            ) : (
              <RecentBlogsSkeleton />
            )}
            {countBlogs.length > 0 ? (
              <Categories countBlogs={countBlogs} />
            ) : null}
          </div>
          <div className="lg:col-span-4 col-span-12 flex flex-col gap-8">
            <SidebarContent />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
