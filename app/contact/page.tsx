import { Metadata } from "next";
import React from "react";
import { ContactPage } from "../components/pages";

type Props = {};

export const metadata: Metadata = {
  title: "Liên hệ",
};

const Page = (props: Props) => {
  return <ContactPage />;
};

export default Page;
