import React, { useState, useEffect } from 'react';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../Helper/LocalStorage';
 
// Definice typů pro místnost a chodbu
type Hall = {
  idIdHall: number;
  hallDescription: string | null;
  nextRoom: Room | null;
};
 
type Room = {
  idRoom: number;
  roomDescription: string;
  linkedHall: Hall | null;
};
 
const RoomViewer: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 
  // Načítání dat ze serveru při prvním spuštění
  useEffect(() => {
    const loadRoomData = async () => {
      try {
        let roomData: Room[] | null = getDataFromLocalStorage('roomData');
        if (!roomData) {
          // Pokud nejsou data v localStorage, načti je ze serveru
          const fetchedData = await fetchDataFromServer();
          saveDataToLocalStorage('roomData', fetchedData);
          roomData = fetchedData;
        }
        setCurrentRoom(roomData[0]); // Nastav první místnost
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Neznámá chyba');
      } finally {
        setLoading(false);
      }
    };
 
    loadRoomData();
  }, []);
 
  // Funkce pro přechod do další místnosti
  const goToNextRoom = () => {
    if (currentRoom?.linkedHall?.nextRoom) {
      setCurrentRoom(currentRoom.linkedHall.nextRoom);
    } else {
      alert('Žádná další místnost!');
    }
  };
 
  return (
<div>
      {loading ? (
<p>Načítání...</p>
      ) : error ? (
<p>Chyba: {error}</p>
      ) : currentRoom ? (
<div>
<h1>Místnost: {currentRoom.roomDescription}</h1>
<p>ID Místnosti: {currentRoom.idRoom}</p>
          {currentRoom.linkedHall && (
<div>
<h2>Chodba:</h2>
<p>ID Chodby: {currentRoom.linkedHall.idIdHall}</p>
<p>Popis Chodby: {currentRoom.linkedHall.hallDescription || 'N/A'}</p>
</div>
          )}
<button onClick={goToNextRoom}>Jít do další místnosti</button>
</div>
      ) : (
<p>Data nejsou k dispozici.</p>
      )}
</div>
  );
};
 
// Funkce pro získání dat ze serveru
const fetchDataFromServer = async (): Promise<Room[]> => {
  const response = await fetch('https://api.example.com/rooms'); // Upravit URL
  if (!response.ok) {
    throw new Error('Chyba při načítání dat ze serveru.');
  }
  return response.json();
};
 
export default RoomViewer;