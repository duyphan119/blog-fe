import { ApolloQueryResult, FetchResult, gql } from "@apollo/client";
import client from "../config/apolloClient";
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

export type CreateReplyDTO = {
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
  createReplyInput: CreateReplyDTO & { blogId: string };
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

export const replyApi = {
  replies: async (params: ReplyParams): Promise<Replies> => {
    try {
      const { data }: ApolloQueryResult<RepliesResponse> = await client.query({
        query: REPLIES,
        variables: {
          repliesInput: params,
        },
      });
      return data.replies;
    } catch (error) {}

    return {
      totalPages: 0,
      count: 0,
      replies: [],
    };
  },
  create: async (
    dto: CreateReplyDTO & { blogId: string }
  ): Promise<Reply | null> => {
    try {
      const { data }: FetchResult<CreateReplyResponse> = await client.mutate({
        mutation: CREATE_REPLY,
        variables: {
          createReplyInput: dto,
        },
      });
      if (data) return data.createReply;
    } catch (error) {}
    return null;
  },
};
