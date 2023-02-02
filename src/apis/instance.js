import axios from "axios";

export const requestGet = async (url) => {
  const data = await axios.get(url);
  return data;
};
