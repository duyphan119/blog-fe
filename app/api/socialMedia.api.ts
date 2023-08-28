import { gql } from "@apollo/client";
import client from "../config/apolloClient";

export const getFbAccessToken = async (): Promise<string> => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/oauth/access_token?client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_APP_SECRET}&grant_type=client_credentials`
    );
    const { access_token } = await response.json();
    return access_token;
  } catch (error) {
    return "";
  }
};

export const YOUTUBE_SUBSCRIBERS = gql`
  query Query {
    youtubeSubscribers
  }
`;

export const GITHUB_FOLLOWERS = gql`
  query Query {
    githubFollowers
  }
`;

export const socialMediaApi = {
  youtubeSubscribers: async (): Promise<number> => {
    try {
      const { data } = await client.query({
        query: YOUTUBE_SUBSCRIBERS,
      });
      return data.youtubeSubscribers || 0;
    } catch (error) {}
    return 0;
  },
  facebookFollowers: async () => {
    const accessToken = await getFbAccessToken();
    try {
      const response = await fetch(
        `https://graph.facebook.com/${process.env.FB_PAGE_ID}/?fields=followers.summary(limit=1)`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      return result.followers.summary.total_count;
    } catch (error) {}
    return 0;
  },
  githubFollowers: async () => {
    try {
      const { data } = await client.query({
        query: GITHUB_FOLLOWERS,
      });
      return data.githubFollowers || 0;
    } catch (error) {
      return 0;
    }
  },
};
