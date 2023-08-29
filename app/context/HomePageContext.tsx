"use client";

import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { HomePage, pageApi } from "../api/page.api";
import { Loading } from "../components";

const defaultValue = {
  categories: [],
  countBlogs: [],
  mostViewBlogs: [],
  recentBlogs: [],
};

type ContextValue = {
  loading: boolean;
} & HomePage;

const HomePageContext = createContext<ContextValue>({
  ...defaultValue,
  loading: true,
});

type Props = { children: ReactNode };

export const HomePageProvider: FC<Props> = ({ children }) => {
  const [homePage, setHomePage] = useState<HomePage>(() => defaultValue);
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <HomePageContext.Provider value={{ ...homePage, loading }}>
      {children}
    </HomePageContext.Provider>
  );
};

export default HomePageContext;
