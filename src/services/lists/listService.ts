import api from "../api";

export const addBookToList = async (review: any) => {
  const res = await api.post(`/lists/`, review);
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
