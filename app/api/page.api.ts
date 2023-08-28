import { ApolloQueryResult, gql } from "@apollo/client";
import client from "../config/apolloClient";
import { Blog } from "./blog.api";
import { Category } from "./category.api";

export type HomePage = {
  categories: Category[];
  countBlogs: {
    category: Category;
    count: number;
    blogs: Blog[];
  }[];
  mostViewBlogs: Blog[];
  recentBlogs: Blog[];
};

export type HomePageResponse = {
  homePage: HomePage;
};

export const HOME_PAGE = gql`
  query Query {
    homePage {
      categories {
        _id
        name
        slug
        children {
          _id
          name
          slug
        }
      }
      countBlogs {
        category {
          _id
          name
          slug
        }
        count
        blogs {
          _id
          title
          thumbnail
          createdAt
          slug
          author {
            _id
            name
          }
          categories {
            name
            _id
          }
        }
      }
      mostViewBlogs {
        _id
        title
        thumbnail
        createdAt
        slug
        author {
          _id
          name
        }
        categories {
          name
          _id
        }
      }
      recentBlogs {
        _id
        title
        thumbnail
        createdAt
        slug
        author {
          _id
          name
        }
        categories {
          name
          _id
        }
      }
    }
  }
`;

export const pageApi = {
  homePage: (): Promise<ApolloQueryResult<HomePageResponse>> =>
    client.query({
      query: HOME_PAGE,
    }),
};
