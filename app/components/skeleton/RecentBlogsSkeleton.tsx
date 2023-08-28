"use client";

import { FC } from "react";
import CategoryCard from "../CategoryCard";

type Props = {};

type CardProps = {};

const Card: FC<CardProps> = () => {
  return (
    <article
      className={`lg:col-span-6 col-span-12 relative  group animate-pulse`}
    >
      <div className="bg-lightgrey h-[230px] items-center flex justify-center text-grey">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className={` absolute -bottom-14 left-4 right-0 bg-grey p-2 `}>
        <div className="uppercase rounded-lg bg-lightgrey w-20 h-[15px]  line-clamp-1"></div>
        <div
          className={` w-full rounded-lg bg-lightgrey font-semibold my-3 h-12 line-clamp-2`}
        ></div>
        <div
          className={` h-[15px] w-40 rounded-lg bg-lightgrey line-clamp-1`}
        ></div>
      </div>
    </article>
  );
};

const RecentBlogsSkeleton: FC<Props> = () => {
  return (
    <CategoryCard title="Bài viết gần đây">
      <div className="grid grid-cols-12 gap-x-6 gap-y-20 mb-14">
        {new Array(4).fill("").map((_, index) => {
          return <Card key={index} />;
        })}
      </div>
    </CategoryCard>
  );
};

export default RecentBlogsSkeleton;
