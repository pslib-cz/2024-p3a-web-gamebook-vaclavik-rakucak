import React, { useState, useEffect } from 'react';

const RoomViewer: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Načítání dat z API při prvním spuštění
  useEffect(() => {
    const loadRoomData = async () => {
      try {
        const response = await fetch('https://localhost:7190/api/Room/chain/Kobka?dungeonName=Kobka');  // Uprav podle skutečné URL serveru
        if (!response.ok) {
          throw new Error('Chyba při načítání dat ze serveru');
        }
        const data = await response.json();
        setCurrentRoom(data[0]);  // Nastav první místnost
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

export default RoomViewer;
