
import React, { useState, useEffect, useCallback, useRef } from 'react';
//import { useFetchDungeons, addDungeon, deleteDungeon, updateDungeon } from '../../../api/dungeonsApi';
import { fetchImage } from '../../../api/imagesApi';
import styles from './AdminPanel.module.css';


interface AdminPanelProps {
  token: string;
}

interface Dungeon {
  id: string;
  name: string;
  description: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ token }) => {
  /*const {
    
    data: dungeons,
    loading: dungeonsLoading,
    error: dungeonsError,
    // Pokud budeš chtít manuální refresh, přidej si do useFetch hooku funkci pro refresh
  } = useFetchDungeons(token);*/
  const [newDungeonName, setNewDungeonName] = useState('');
  const [newDungeonDescription, setNewDungeonDescription] = useState('');
  const [editingDungeon, setEditingDungeon] = useState<Dungeon | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(false); // Obecný loading state pro akce
  const [imageToLoadId, setImageToLoadId] = useState<number>(2);

  // Funkce pro načtení obrázku
  const handleFetchImage = useCallback(async (imageId: number) => {
    setLoading(true);
    try {
      const url = await fetchImage(imageId);
      setImageUrl(url);
    } catch (error) {
      console.error('Error fetching image:', error);
      alert(error instanceof Error ? error.message : 'Error fetching image.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const imgElement = imgRef.current;

    const handleImageLoad = () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
        console.log("URL revoked after image loaded");
      }
    };

    if (imgElement) {
      imgElement.addEventListener('load', handleImageLoad);
    }

    return () => {
      if (imgElement) {
        imgElement.removeEventListener('load', handleImageLoad);
      }
      // Není nutné zde volat URL.revokeObjectURL, uvolní se při načtení nového obrázku nebo při odmontování komponenty
    };
  }, [imageUrl]);

  useEffect(() => {
    handleFetchImage(imageToLoadId);
  }, [handleFetchImage, imageToLoadId]);

  /*
// Funkce pro přidání dungeonu
  const handleAddDungeon = async () => {
    setLoading(true);
    try {
      await addDungeon(token, { name: newDungeonName, description: newDungeonDescription });
      setNewDungeonName('');
      setNewDungeonDescription('');
      // Refetch dat - ideálně by se měl useFetchDungeons automaticky aktualizovat
    } catch (error) {
      console.error('Error adding dungeon:', error);
      alert(error instanceof Error ? error.message : 'Error adding dungeon.');
    } finally {
      setLoading(false);
    }
  };

  // Funkce pro smazání dungeonu
  const handleDeleteDungeon = async (dungeonId: string) => {
    setLoading(true);
    try {
      await deleteDungeon(token, dungeonId);
      // Refetch dat
    } catch (error) {
      console.error('Error deleting dungeon:', error);
      alert(error instanceof Error ? error.message : 'Error deleting dungeon.');
    } finally {
      setLoading(false);
    }
  };

  // Funkce pro úpravu dungeonu
  const handleUpdateDungeon = async () => {
    if (!editingDungeon) return;
    setLoading(true);
    try {
      await updateDungeon(token, editingDungeon.id, { name: editingDungeon.name, description: editingDungeon.description });
      setEditingDungeon(null);
      // Refetch dat
    } catch (error) {
      console.error('Error updating dungeon:', error);
      alert(error instanceof Error ? error.message : 'Error updating dungeon.');
    } finally {
      setLoading(false);
    }
  };


  // Funkce pro nahrání obrázku
  const handleUploadImage = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    setLoading(true);
    try {
      const uploadResult = await uploadImage(token, selectedFile);
      console.log('Image uploaded successfully:', uploadResult);
      alert('Image uploaded successfully!');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error instanceof Error ? error.message : 'Error uploading image.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };


  */

  

return (
  <div className={styles.adminPanel}>
    <h1>Admin Panel</h1>

    {/* Zobrazení dungeonů 
    <div>
      <h2>Dungeons</h2>
      {dungeonsLoading && <p>Načítání dungeonů...</p>}
      {dungeonsError && (
        <p>Chyba načítání dungeonů: {dungeonsError}</p>
      )}
      {dungeons && (
        <ul>
          {dungeons.map((dungeon) => (
            <li key={dungeon.id} className={styles.listItem}>
              {editingDungeon?.id === dungeon.id ? (
                <>
                  <input
                    type="text"
                    value={editingDungeon.name}
                    onChange={(e) =>
                      setEditingDungeon({
                        ...editingDungeon,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editingDungeon.description}
                    onChange={(e) =>
                      setEditingDungeon({
                        ...editingDungeon,
                        description: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={handleUpdateDungeon}
                    disabled={loading}
                  >
                    Uložit
                  </button>
                  <button
                    onClick={() => setEditingDungeon(null)}
                    disabled={loading}
                  >
                    Zrušit
                  </button>
                </>
              ) : (
                <>
                  {dungeon.name} - {dungeon.description}
                  <button
                    onClick={() => setEditingDungeon(dungeon)}
                    disabled={loading}
                  >
                    Upravit
                  </button>
                  <button
                    onClick={() => handleDeleteDungeon(dungeon.id)}
                    disabled={loading}
                  >
                    Smazat
                  </button>
                </>
              )}
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
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Description"
        value={newDungeonDescription}
        onChange={(e) => setNewDungeonDescription(e.target.value)}
        className={styles.inputField}
      />
      <button
        onClick={handleAddDungeon}
        disabled={loading || !newDungeonName || !newDungeonDescription}
      >
        Přidat
      </button>
    </div>
    
    */}

    {/* Upload obrázku 
    
    <div>
      <h2>Upload Image</h2>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={loading}
        className={styles.inputField}
      />
      <button
        onClick={handleUploadImage}
        disabled={!selectedFile || loading}
      >
        Upload
      </button>
    </div>
    
    */}
    

    {/* Zobrazení obrázku */}
    <div>
      <h2>Load and Display Image</h2>
      <input
        type="number"
        value={imageToLoadId}
        onChange={(e) => setImageToLoadId(Number(e.target.value))}
        placeholder="Image ID"
        className={styles.inputField}
      />
      <button
        onClick={() => handleFetchImage(imageToLoadId)}
        disabled={loading}
      >
        Load Image
      </button>
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Obrázek z API"
            style={{ maxWidth: "300px" }}
            ref={imgRef}
            className={styles.image}
          />
        </div>
      )}
    </div>
  </div>
);
};

export default AdminPanel;