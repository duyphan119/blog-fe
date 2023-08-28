"use client";

import Link from "next/link";
import { FC, memo, useEffect, useState } from "react";
import { socialMediaApi } from "../api/socialMedia.api";
import { SOCIAL_MEDIA_LIST } from "../constants";
import { SocialMedia } from "../types";
import CategoryCard from "./CategoryCard";

type Props = {};

const SocialMedia: FC<Props> = () => {
  const [items, setItems] = useState<SocialMedia[]>(SOCIAL_MEDIA_LIST);

  useEffect(() => {
    (async () => {
      try {
        const [youtubeSubscribers, githubFollowers] = await Promise.all([
          // socialMediaApi.facebookFollowers(),
          socialMediaApi.youtubeSubscribers(),
          socialMediaApi.githubFollowers(),
        ]);
        setItems((prevState) => [
          { ...prevState[0] },
          { ...prevState[1], count: youtubeSubscribers },
          { ...prevState[2], count: githubFollowers },
        ]);
      } catch (error) {}
    })();
  }, []);

  return (
    <CategoryCard title="Mạng xã hội">
      <div className="flex">
        {items.map(({ icon: Icon, href, title, bg, count }) => {
          return (
            <Link
              href={href}
              key={title}
              title={title}
              className={`${bg} py-8 text-3xl text-white flex flex-col gap-2 flex-1 items-center justify-center hover:opacity-90`}
              target="_blank"
            >
              <Icon />
              <span className="text-sm" title={`${count} người theo dõi`}>
                {count}
              </span>
            </Link>
          );
        })}
      </div>
    </CategoryCard>
  );
};

export default memo(SocialMedia);
