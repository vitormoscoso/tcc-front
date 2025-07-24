import api from "../api";

export const addBookToList = async (review: any) => {
  const res = await api.post(`/lists/`, review);
  return res.data;
}