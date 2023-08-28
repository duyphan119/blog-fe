import { gql } from "@apollo/client";
import { Blog } from "./blog.api";

export type Reply = {
  _id: string;
  content: string;
  email: string;
  name: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  blogId: string;
  blog: Blog;
};

export type ReplyDTO = {
  content: string;
  email: string;
  name: string;
  website: string;
};

export type ReplyParams = Partial<{
  limit: number;
  p: number;
  sortBy: string;
  sortType: string;
  blogId: string;
}>;

export type CreateReplyInput = {
  createReplyInput: ReplyDTO & { blogId: string };
};

export type CreateReplyResponse = {
  createReply: Reply;
};

export type RepliesInput = {
  repliesInput: ReplyParams;
};

export type Replies = {
  replies: Reply[];
  count: number;
  totalPages: number;
};

export type RepliesResponse = {
  replies: Replies;
};

export const CREATE_REPLY = gql`
  mutation CreateReply($createReplyInput: CreateReplyInput) {
    createReply(createReplyInput: $createReplyInput) {
      _id
      name
      createdAt
      content
    }
  }
`;

export const REPLIES = gql`
  query Replies($repliesInput: RepliesInput) {
    replies(repliesInput: $repliesInput) {
      totalPages
      count
      replies {
        _id
        content
        name
        createdAt
      }
    }
  }
`;
