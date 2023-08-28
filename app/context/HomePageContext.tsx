"use client";

import { createContext, FC, ReactNode, useState, useEffect } from "react";
import { HomePage, HomePageResponse, pageApi } from "../api/page.api";

const defaultValue = {
  categories: [],
  countBlogs: [],
  mostViewBlogs: [],
  recentBlogs: [],
};

const HomePageContext = createContext<HomePage>(defaultValue);

type Props = { children: ReactNode };

export const HomePageProvider: FC<Props> = ({ children }) => {
  const [homePage, setHomePage] = useState<HomePage>(defaultValue);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await pageApi.homePage();
        console.log({ data });
        if (data) {
          setHomePage(data.homePage);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <HomePageContext.Provider value={{ ...homePage }}>
      {children}
    </HomePageContext.Provider>
  );
};

export default HomePageContext;
