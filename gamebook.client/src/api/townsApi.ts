import axios from 'axios';

const baseApiUrl = '/api';

export const fetchTown = async (townId: number) => {
  const response = await axios.get(`${baseApiUrl}/Towns/${townId}`);
  return response.data;
};