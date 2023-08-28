import { ApolloQueryResult, gql } from "@apollo/client";
import client from "../config/apolloClient";

export type Category = {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  parentId: string;
  parent: Category | null;
  children: Category[];
};

export type CategoryParams = Partial<{
  limit: number;
  p: number;
  sortBy: string;
  sortType: string;
  keyword: string;
}>;

export type Categories = {
  categories: Category[];
  count: number;
  totalPages: number;
};

export type CategoriesResponse = {
  categories: Categories;
};

export const CATEGORIES = gql`
  query Query($categoriesInput: CategoriesInput) {
    categories(categoriesInput: $categoriesInput) {
      categories {
        _id
        name
        slug
        parent {
          _id
          name
          slug
        }
        children {
          _id
          name
          slug
        }
      }
      count
      totalPages
    }
  }
`;

export const CATEGORY_SLUG = gql`
  query Query($categoriesInput: CategoriesInput) {
    categories(categoriesInput: $categoriesInput) {
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
    }
  }
`;

export const categoryApi = {
  categories: async (params: CategoryParams): Promise<Categories> => {
    try {
      const { data }: ApolloQueryResult<CategoriesResponse> =
        await client.query({
          query: CATEGORY_SLUG,
          variables: {
            categoriesInput: params,
          },
        });
      if (data) {
        return data.categories;
      }
    } catch (error) {}
    return {
      categories: [],
      count: 0,
      totalPages: 0,
    };
  },
  categoryBySlug: async (slug: string): Promise<Category | null> => {
    try {
      const { data }: ApolloQueryResult<CategoriesResponse> =
        await client.query({
          query: CATEGORY_SLUG,
          variables: {
            categoriesInput: { slug },
          },
        });
      if (data && data.categories.categories.length > 0) {
        return data.categories.categories[0];
      }
    } catch (error) {}
    return null;
  },
};
