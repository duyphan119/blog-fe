import axios from "axios";

export const avatarApi = {
  generate: async (seed: string) => {
    try {
      const { data } = await axios.get(
        `https://api.dicebear.com/7.x/pixel-art/json?seed=${seed}`
      );
      return data;
    } catch (error) {}
    return null;
  },
};
