import React, { useState } from 'react';
import axios from 'axios';
import styles from './AdminPanel.module.css';

interface AdminPanelProps {
  token: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ token }) => {
  const [roomItemName, setRoomItemName] = useState('');
  const [roomItemType, setRoomItemType] = useState('');
  const [roomItemDescription, setRoomItemDescription] = useState('');
  const [roomItemDamage, setRoomItemDamage] = useState<number | null>(null);
  const [roomItemRoomId, setRoomItemRoomId] = useState<number | null>(null);
  const [roomItemEquipmentId, setRoomItemEquipmentId] = useState<number | null>(null);
  const [roomItemImageId, setRoomItemImageId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const baseApiUrl = import.meta.env.VITE_API_URL;

  const handleAddRoomItem = async () => {
    setLoading(true);
    try {
      const newRoomItem = {
        name: roomItemName,
        type: roomItemType,
        description: roomItemDescription,
        damage: roomItemDamage,
        roomId: roomItemRoomId,
        equipmentId: roomItemEquipmentId,
        imageId: roomItemImageId,
      };

      await axios.post(`${baseApiUrl}/RoomItems`, newRoomItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Room item added successfully!');
      // Clear form fields
      setRoomItemName('');
      setRoomItemType('');
      setRoomItemDescription('');
      setRoomItemDamage(null);
      setRoomItemRoomId(null);
      setRoomItemEquipmentId(null);
      setRoomItemImageId(null);
    } catch (error) {
      console.error('Error adding room item:', error);
      alert(error instanceof Error ? error.message : 'Error adding room item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.adminPanel}>
      <h1>Admin Panel</h1>

      {/* Form to add a new RoomItem */}
      <div>
        <h2>Add Room Item</h2>
        <input
          type="text"
          placeholder="Name"
          value={roomItemName}
          onChange={(e) => setRoomItemName(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Type"
          value={roomItemType}
          onChange={(e) => setRoomItemType(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Description"
          value={roomItemDescription}
          onChange={(e) => setRoomItemDescription(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="number"
          placeholder="Damage"
          value={roomItemDamage ?? ''}
          onChange={(e) => setRoomItemDamage(Number(e.target.value))}
          className={styles.inputField}
        />
        <input
          type="number"
          placeholder="Room ID"
          value={roomItemRoomId ?? ''}
          onChange={(e) => setRoomItemRoomId(Number(e.target.value))}
          className={styles.inputField}
        />
        <input
          type="number"
          placeholder="Equipment ID"
          value={roomItemEquipmentId ?? ''}
          onChange={(e) => setRoomItemEquipmentId(Number(e.target.value))}
          className={styles.inputField}
        />
        <input
          type="number"
          placeholder="Image ID"
          value={roomItemImageId ?? ''}
          onChange={(e) => setRoomItemImageId(Number(e.target.value))}
          className={styles.inputField}
        />
        <button
          onClick={handleAddRoomItem}
          disabled={loading || !roomItemName || !roomItemType}
        >
          Add Room Item
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;