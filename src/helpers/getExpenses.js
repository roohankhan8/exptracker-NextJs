import axios from "axios";
const getExpenses = async (email) => {
  const res = await axios.get(`/api/exps?userEmail=${email}`);
  return res.data.data;
};

export default getExpenses;
