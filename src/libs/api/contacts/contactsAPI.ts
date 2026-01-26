import { client } from '../client';

export interface Inquiry {
  id: number;
  title: string;
  content: string;
  status: string; // e.g. 'WAITING', 'ANSWERED'
  createdAt: string;
  // Add other fields
}

export interface CreateInquiryPayload {
  title: string;
  content: string;
}

export const contactsAPI = {
  getInquiries: async () => {
    const response = await client.get<Inquiry[]>('/api/contacts');
    return response.data;
  },
  createInquiry: async (data: CreateInquiryPayload) => {
    const response = await client.post<void>('/api/contacts', data);
    return response.data;
  },
  getInquiryDetail: async (contactId: number) => {
    const response = await client.get<Inquiry>(`/api/contacts/${contactId}`);
    return response.data;
  },
  deleteInquiry: async (contactId: number) => {
    // Swagger says PATCH for delete
    const response = await client.patch<void>(`/api/contacts/${contactId}`);
    return response.data;
  },
};
