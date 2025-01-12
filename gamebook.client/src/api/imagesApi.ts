// src/api/imagesApi.ts
const BASE_URL = 'https://localhost:7190/api/images'; // Upravte podle skutečné adresy API

// Funkce pro načtení obrázku - nepotřebujeme token, pokud API nevyžaduje autentizaci pro GET
export const fetchImage = async (imageId: number) => {
  const response = await fetch(`${BASE_URL}/${imageId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  return url;
};