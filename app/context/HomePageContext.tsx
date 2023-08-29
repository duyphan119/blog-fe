"use client";

import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { HomePage, pageApi } from "../api/page.api";

const defaultValue = {
  categories: [],
  countBlogs: [],
  mostViewBlogs: [],
  recentBlogs: [],
};

const HomePageContext = createContext<HomePage>(defaultValue);

type Props = { children: ReactNode };

export const HomePageProvider: FC<Props> = ({ children }) => {
  const [homePage, setHomePage] = useState<HomePage>(() => defaultValue);
  const [first, setFirst] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await pageApi.homePage();
        if (data) {
          setHomePage(data.homePage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFirst(false);
      }
    };

    fetchData();
  }, []);

  if (first) return <></>;

  return (
    <HomePageContext.Provider value={{ ...homePage }}>
      {children}
    </HomePageContext.Provider>
  );
};

export default HomePageContext;
