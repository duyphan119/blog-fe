import { Metadata } from "next";
import { HomePage } from "./components/pages";

type Props = {};

export const metadata: Metadata = {
  title: "Trang chủ",
};

const Page = (props: Props) => {
  return <HomePage />;
};

export default Page;
