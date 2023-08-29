"use client";

import { FC, ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

const Container: FC<Props> = ({ children, className = "" }) => {
  return <div className={`xl:mx-44 mx-4 ${className}`}>{children}</div>;
};

export default Container;
