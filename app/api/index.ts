import { avatarApi } from "./avatar.api";
import { blogApi } from "./blog.api";
import { categoryApi } from "./category.api";
import { contactApi } from "./contact.api";
import { pageApi } from "./page.api";
import { replyApi } from "./reply.api";
import { socialMediaApi } from "./socialMedia.api";
import { subscriberApi } from "./subscriber.api";

export default {
  avatar: avatarApi,
  contact: contactApi,
  blog: blogApi,
  page: pageApi,
  reply: replyApi,
  socialMedia: socialMediaApi,
  subscriber: subscriberApi,
  category: categoryApi,
};
