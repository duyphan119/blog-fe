import { gql } from "@apollo/client";

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
