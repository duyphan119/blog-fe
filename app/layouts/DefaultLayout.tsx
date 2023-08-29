"use client";

import { FC, ReactNode, Suspense } from "react";
import { Footer, Header } from "../components";
type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <Suspense
      fallback={<div className="w-screen h-screen bg-red">Loading</div>}
    >
      <Header />
      {children}
      <Footer />
    </Suspense>
  );
};

export default DefaultLayout;
