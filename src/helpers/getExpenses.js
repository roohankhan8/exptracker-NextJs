import axios from "axios";
export const getExpenses = async () => {
  const res = await axios.get(`/api/exps?userEmail=${session.user.email}`);
  return res.data.data;
};
