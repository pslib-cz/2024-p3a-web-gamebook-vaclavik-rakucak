import axios from 'axios';

const baseApiUrl = import.meta.env.VITE_API_URL;

export const fetchTown = async (townId: number) => {
  const response = await axios.get(`${baseApiUrl}/Towns/${townId}`);
  return response.data;
};