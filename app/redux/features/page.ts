import { HomePageResponse } from "@/app/api/page.api";
import { createSlice } from "@reduxjs/toolkit";
import { ActionPayload, Fetch, RootState } from "../store";

const name = "page";

type State = Fetch & HomePageResponse;

const pageSlice = createSlice({
  name,
  initialState: {
    homePage: {
      categories: [],
      countBlogs: [],
      mostViewBlogs: [],
      recentBlogs: [],
    },
    isError: false,
    isLoading: false,
  } as State,
  reducers: {
    fetchHomePage: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    setHomePage: (state, { payload }: ActionPayload<HomePageResponse>) => {
      state.homePage = payload.homePage;
      state.isLoading = false;
    },
    fetchHomePageError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { fetchHomePage, setHomePage, fetchHomePageError } =
  pageSlice.actions;

export const FETCH_HOME_PAGE = "page/fetchHomePage";

export const selectRecentBlogs = (state: RootState) =>
  state.page.homePage.recentBlogs;
export const selectMostViewBlogs = (state: RootState) =>
  state.page.homePage.mostViewBlogs;
export const selectCategories = (state: RootState) =>
  state.page.homePage.categories;
export const selectCountBlogs = (state: RootState) =>
  state.page.homePage.countBlogs;

const pageReducer = pageSlice.reducer;

export default pageReducer;
