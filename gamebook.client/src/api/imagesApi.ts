import axios from 'axios';

const BASE_URL ='/api/images';

export const fetchImage = async (imageId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${imageId}`, { responseType: 'blob' });

    const url = URL.createObjectURL(response.data);
    return url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch image: ${error.response?.statusText || error.message}`);
    } else {
      throw new Error(`Failed to fetch image: ${(error as Error).message}`);
    }
  }
};