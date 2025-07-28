import api from "../api";

export const getUserProfile = async (uid: string) => {
  const res = await api.get(`/users/${uid}`);
  return res.data;
};
