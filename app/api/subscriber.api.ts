import { FetchResult, gql } from "@apollo/client";
import client from "../config/apolloClient";

export type Subscriber = {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateSubscriberDTO = {
  email: string;
};

export type CreateSubscriberInput = {
  createSubscriberInput: CreateSubscriberDTO;
};

export type CreateSubscriberResponse = {
  createSubscriber: Subscriber;
};

export const CREATE_SUBSCRIBER = gql`
  mutation Mutation($createSubscriberInput: CreateSubscriberInput) {
    createSubscriber(createSubscriberInput: $createSubscriberInput) {
      _id
    }
  }
`;

export const subscriberApi = {
  create: async (dto: CreateSubscriberDTO): Promise<Subscriber | null> => {
    try {
      const { data }: FetchResult<CreateSubscriberResponse> =
        await client.mutate({
          mutation: CREATE_SUBSCRIBER,
          variables: {
            createSubscriberInput: dto,
          },
        });
      if (data) return data.createSubscriber;
    } catch (error) {}
    return null;
  },
};
