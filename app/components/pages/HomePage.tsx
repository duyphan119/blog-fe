"use client";

import { HomePageContext } from "@/app/context";
import { FC, useContext } from "react";
import Categories from "../Categories";
import { Container } from "../common";
import Loading from "../Loading";
import MostViewBlogs from "../MostViewBlogs";
import RecentBlogs from "../RecentBlogs";
import SidebarContent from "../SidebarContent";

type Props = {};

const HomePage: FC<Props> = () => {
  const { recentBlogs, mostViewBlogs, countBlogs, loading } =
    useContext(HomePageContext);

  if (loading) return <Loading />;
  return (
    <>
      <Container className="my-2">
        <MostViewBlogs blogs={mostViewBlogs} />
        <div className="grid grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-8 col-span-12 flex flex-col gap-8">
            <RecentBlogs blogs={recentBlogs} />
            {countBlogs.length > 0 ? (
              <Categories countBlogs={countBlogs} />
            ) : null}
          </div>
          <div className="lg:col-span-4 col-span-12 flex flex-col gap-8">
            <SidebarContent />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
