import React, { useState } from 'react';

interface Dungeon {
  id: string;
  name: string;
  description: string;
}

interface AdminPanelProps {
  token: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ token }) => {
  const [data, setData] = useState<Dungeon[] | null>(null);
  const [loading, setLoading] = useState(false); // Stav pro načítání

  const fetchData = async () => {
     setLoading(true);
    try {
      const response = await fetch('/api/dungeons', {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch dungeons: ${response.statusText}`);
      }

      const dungeons: Dungeon[] = await response.json();
      setData(dungeons);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
        setLoading(false)
    }
  };

  const handleAdd = async () => {
      setLoading(true);
    try {
        const response = await fetch('api/dungeons/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ name: 'test', description: 'desc' }),
        });

        if (!response.ok) {
            throw new Error(`Failed to add dungeon: ${response.statusText}`);
          }

      fetchData();
    } catch(error) {
        console.error("Error adding data:", error)
    } finally {
        setLoading(false)
    }
  };


  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={fetchData} disabled={loading}>
        Načíst data
      </button>
        {loading && <p>Načítání...</p>}
      {data && (
        <ul>
          {data.map((dungeon) => (
            <li key={dungeon.id}>{dungeon.name}</li>
          ))}
        </ul>
      )}
      <button onClick={handleAdd} disabled={loading}>
        Přidat
      </button>
    </div>
  );
};

export default AdminPanel;
