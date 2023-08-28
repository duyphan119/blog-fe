import { BlogCategory } from "@/app/api/blog-category.api";
import { createSlice } from "@reduxjs/toolkit";
import { ActionPayload, Fetch, RootState } from "../store";

const name = "header";

type State = {
  navItems: BlogCategory[];
} & Fetch;

const headerSlice = createSlice({
  name,
  initialState: {
    navItems: [],
    isError: false,
    isLoading: false,
  } as State,
  reducers: {
    fetchNavItems: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    setNavItems: (state, { payload }: ActionPayload<BlogCategory[]>) => {
      state.navItems = payload;
      state.isLoading = false;
    },
    fetchNavItemsError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { fetchNavItems, setNavItems, fetchNavItemsError } =
  headerSlice.actions;

export const FETCH_NAV_ITEMS = "header/fetchNavItems";

export const selectNavItems = (state: RootState) => state.header.navItems;

const headerReducer = headerSlice.reducer;

export default headerReducer;
