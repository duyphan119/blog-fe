import { FetchResult, gql } from "@apollo/client";
import client from "../config/apolloClient";

export type Contact = {
  _id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type CreateContactDTO = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type CreateContactInput = {
  createContactInput: CreateContactDTO;
};

export type CreateContactResponse = {
  createContact: Contact;
};

export const CREATE_CONTACT = gql`
  mutation CreateContact($createContactInput: CreateContactInput) {
    createContact(createContactInput: $createContactInput) {
      _id
    }
  }
`;

export const contactApi = {
  create: async (dto: CreateContactDTO): Promise<Contact | null> => {
    try {
      const { data }: FetchResult<CreateContactResponse> = await client.mutate({
        mutation: CREATE_CONTACT,
        variables: {
          createContactInput: dto,
        },
      });
      if (data) return data.createContact;
    } catch (error) {}
    return null;
  },
};
