"use client";

import { FC, ReactNode, Suspense } from "react";
import { Footer, Header } from "../components";
import { HomePageProvider } from "../context/HomePageContext";
type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <Suspense
      fallback={<div className="w-screen h-screen bg-red">Loading</div>}
    >
      <HomePageProvider>
        <Header />
        {children}
        <Footer />
      </HomePageProvider>
    </Suspense>
  );
};

export default DefaultLayout;
