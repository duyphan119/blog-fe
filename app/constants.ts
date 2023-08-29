import { BiLogoFacebook, BiLogoGithub, BiLogoYoutube } from "react-icons/bi";

export enum ROUTES {
  HOME = "/",
  BLOGS = "/blogs",
  LOGIN = "/login",
  FORGOT_PASSWORD = "/forgot-password",
  REGISTER = "/register",
  SEARCH = "/search",
  CONTACT = "/contact",
}
export const IS_PRODUCTION =
  process.env.IS_PRODUCTION === "true" ? true : false;
export const SERVER_URL = IS_PRODUCTION
  ? process.env.SERVER_URL
  : process.env.SERVER_URL_DEV;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_PAGE = 1;
export const THUMBNAIL_PLACEHOLDER =
  "https://th.bing.com/th/id/R.2b1942b4dee1ecbeea920205887e9f0d?rik=9jVfXqM8SCQPDQ&riu=http%3a%2f%2fcdn2.1xrun.com%2fblog%2fnews_missing.jpg&ehk=k5tZ9Ls3IWrEijxakKMzmPj%2fOlGHiQsS5g9eBxj0yvw%3d&risl=&pid=ImgRaw&r=0";
export const ACCESS_TOKEN_KEY = "access_token";
export const REPLY_INFO_KEY = "reply_info";

export const SOCIAL_MEDIA_LIST = [
  {
    title: "Facebook",
    icon: BiLogoFacebook,
    bg: "bg-facebook",
    color: "text-facebook",
    href: "https://www.facebook.com/profile.php?id=61550765300709",
    count: 0,
  },
  {
    title: "Youtube",
    icon: BiLogoYoutube,
    bg: "bg-youtube",
    color: "text-youtube",
    href: "https://www.youtube.com/channel/UCMWhc9crwCCo7cYExZWqagQ",
    count: 0,
  },
  {
    title: "Github",
    icon: BiLogoGithub,
    bg: "bg-github",
    color: "text-github",
    href: "https://github.com/duyphan119",
    count: 0,
  },
];
