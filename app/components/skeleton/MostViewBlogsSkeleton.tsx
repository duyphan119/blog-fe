"use client";

import React, { FC } from "react";

type Props = {};

type CardProps = {};

const Card: FC<CardProps> = ({}) => {
  return (
    <article
      className={`relative placeholder flex items-center justify-center group h-full animate-pulse text-grey`}
    >
      <svg
        className="w-10 h-10 text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
      <div
        className={`absolute bottom-4 left-4 right-10 bg-grey opacity-70 p-2`}
      >
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

const MostViewBlogsSkeleton: FC<Props> = (ps: Props) => {
  return (
    <section className="lg:grid lg:grid-cols-12 gap-1 flex flex-col min-h-[480px]">
      <div className="lg:col-span-8 h-full">
        <Card />
      </div>
      <div className="lg:col-span-4 flex flex-col gap-1 h-full">
        {new Array(2).fill("").map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </section>
  );
};

export default MostViewBlogsSkeleton;
