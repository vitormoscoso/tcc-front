import api from "../api";

export const getBooksByCategory = async (subject: string) => {
  const res = await api.get(
    `/books/categories?subject=${encodeURIComponent(subject)}`
  );
  return res.data;
};

export const searchBooks = async (query: string) => {
  const res = await api.get(`/books?q=${encodeURIComponent(query)}`);
  return res.data;
};
