import React, { useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [newDungeonName, setNewDungeonName] = useState(''); // State pro jméno nové dungeon
  const [newDungeonDescription, setNewDungeonDescription] = useState(''); // State pro popis nové dungeon

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
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/dungeons/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({ name: newDungeonName, description: newDungeonDescription }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add dungeon: ${response.statusText}`);
      }

      // Vyčisti formulář a znovu načti data
      setNewDungeonName('');
      setNewDungeonDescription('');
      fetchData();
    } catch (error) {
      console.error('Error adding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('name', selectedFile.name);

    try {
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      alert('Image uploaded successfully!');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image.');
    } finally {
      setLoading(false);
    }
  };

  const fetchImage = async (imageId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://localhost:7190/api/Images/${imageId}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // Příklad použití fetchImage - zavolá se po prvním renderu
  useEffect(() => {
    fetchImage(1); // Načti obrázek s ID 1 (nezapomeň upravit ID)
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>

      <div>
        <h2>Dungeons</h2>
        <button onClick={fetchData} disabled={loading}>
          Načíst data
        </button>
        {loading && <p>Načítání...</p>}
        {data && (
          <ul>
            {data.map((dungeon) => (
              <li key={dungeon.id}>
                {dungeon.name} - {dungeon.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>Add Dungeon</h2>
        <input
          type="text"
          placeholder="Name"
          value={newDungeonName}
          onChange={(e) => setNewDungeonName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDungeonDescription}
          onChange={(e) => setNewDungeonDescription(e.target.value)}
        />
        <button onClick={handleAdd} disabled={loading || !newDungeonName || !newDungeonDescription}>
          Přidat
        </button>
      </div>

      <div>
        <h2>Upload Image</h2>
        <input type="file" onChange={handleFileChange} disabled={loading} />
        <button onClick={handleUpload} disabled={!selectedFile || loading}>
          Upload
        </button>
      </div>

      {imageUrl && (
        <div>
          <h2>Obrázek</h2>
          <img src={imageUrl} alt="Obrázek" />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;