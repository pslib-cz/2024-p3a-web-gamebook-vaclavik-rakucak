// src/api/dungeonsApi.ts
import useFetch from '../hooks/useFetch';

const BASE_URL = '/api/dungeons'; // Uprav podle skutečné adresy API

interface Dungeon {
  id: string;
  name: string;
  description: string;
}

// Hook pro načtení všech dungeonů
export const useFetchDungeons = (token: string) => {
  const options: RequestInit = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  return useFetch<Dungeon[]>(BASE_URL, options);
};

// Funkce pro přidání nového dungeonu
export const addDungeon = async (token: string, newDungeon: { name: string; description: string }) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(newDungeon),
  });
  if (!response.ok) {
    throw new Error(`Failed to add dungeon: ${response.statusText}`);
  }
  return response; // V případě úspěchu můžeš vracet např. ID nového dungeonu
};

// Funkce pro smazání dungeonu
export const deleteDungeon = async (token: string, dungeonId: string) => {
  const response = await fetch(`${BASE_URL}/${dungeonId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete dungeon: ${response.statusText}`);
  }

  return response; // V případě úspěchu můžeš vracet např. nějakou potvrzovací zprávu
};

// Funkce pro úpravu dungeonu
export const updateDungeon = async (token: string, dungeonId: string, updatedDungeon: { name: string; description: string }) => {
  const response = await fetch(`${BASE_URL}/${dungeonId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updatedDungeon),
  });

  if (!response.ok) {
    throw new Error(`Failed to update dungeon: ${response.statusText}`);
  }

  return response;
};