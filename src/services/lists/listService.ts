import { BookReviewBody } from "@/types/book";
import api from "../api";

export const addBookToList = async (body: BookReviewBody) => {
  const res = await api.post(`/lists/`, body);
  return res.data;
};

export const removeBookFromList = async (
  uid_firebase: string,
  id: string,
  list_type: string
) => {
  const res = await api.delete(
    `/lists/?uid_firebase=${encodeURIComponent(
      uid_firebase
    )}&id=${encodeURIComponent(id)}&list_type=${encodeURIComponent(list_type)}`
  );
  return res.data;
};

export const checkIfBookIsInList = async (uid_firebase: string, id: string) => {
  const res = await api.get(
    `/lists/check?uid_firebase=${encodeURIComponent(
      uid_firebase
    )}&id=${encodeURIComponent(id)}`
  );
  return res.data;
};
