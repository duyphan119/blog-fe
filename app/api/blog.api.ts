import { ApolloQueryResult, gql } from "@apollo/client";
import client from "../config/apolloClient";
import { Category } from "./category.api";

export type Blog = {
  _id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  authorId: string;
  thumbnail: string;
  author: {
    _id: string;
    name: string;
  };
  categories: Category[];
  categoryIds: string[];
};
export type BlogParams = Partial<{
  limit: number;
  p: number;
  sortBy: string;
  sortType: string;
  keyword: string;
  slug: string;
  categoryIds: string[];
  matchAllCategoryIds: boolean;
}>;

export const BLOGS = gql`
  query Query($blogsInput: BlogsInput) {
    blogs(blogsInput: $blogsInput) {
      blogs {
        _id
        title
        slug
        createdAt
        thumbnail
        author {
          name
        }
        categories {
          name
        }
      }
      count
      totalPages
    }
  }
`;

export const BLOG_DETAIL = gql`
  query Query($blogsInput: BlogsInput) {
    blogs(blogsInput: $blogsInput) {
      blogs {
        _id
        title
        slug
        createdAt
        content
        thumbnail
        author {
          name
        }
        categories {
          name
        }
      }
    }
  }
`;

export type Blogs = {
  blogs: Blog[];
  count: number;
  totalPages: number;
};

export type BlogsResponse = {
  blogs: Blogs;
};

export const blogApi = {
  blogs: async (params: BlogParams): Promise<Blogs> => {
    try {
      const { data }: ApolloQueryResult<BlogsResponse> = await client.query({
        query: BLOGS,
        variables: {
          blogsInput: params,
        },
      });

      if (data) {
        return data.blogs;
      }
    } catch (error) {
      console.log(error);
    }
    return {
      blogs: [],
      count: 0,
      totalPages: 0,
    };
  },
  blogDetail: async (slug: string): Promise<Blog | null> => {
    try {
      const { data }: ApolloQueryResult<BlogsResponse> = await client.query({
        query: BLOG_DETAIL,
        variables: {
          blogsInput: { slug },
        },
      });
      if (data && data.blogs.blogs.length > 0) {
        return data.blogs.blogs[0];
      }
    } catch (error) {}
    return null;
  },
};
