import React, { useState } from 'react';
import axios from 'axios';

interface DeleteComponentProps {
  token: string;
  baseApiUrl: string;
}

const DeleteComponent: React.FC<DeleteComponentProps> = ({ token, baseApiUrl }) => {
  const [entityType, setEntityType] = useState('');
  const [entityId, setEntityId] = useState('');

  const handleDelete = async () => {
    if (!entityType || !entityId) {
      alert('Please select an entity type and enter an ID.');
      return;
    }

    try {
      await axios.delete(`${baseApiUrl}/${entityType}/${entityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Entity deleted successfully.');
    } catch (error) {
      console.error('Error deleting entity:', error);
      alert('Failed to delete entity.');
    }
  };

  return (
    <div>
      <h2>Delete Entity</h2>
      <select value={entityType} onChange={(e) => setEntityType(e.target.value)}>
        <option value="">Select Entity Type</option>
        <option value="RoomItems">Room Item</option>
        <option value="Dungeons">Dungeon</option>
        <option value="Equipments">Equipment</option>
        <option value="Halls">Hall</option>
        <option value="Keys">Key</option>
        <option value="Monsters">Monster</option>
        <option value="Npcs">Npc</option>
        <option value="Quests">Quest</option>
        <option value="Rooms">Room</option>
        <option value="SpecialEffects">Special Effect</option>
        <option value="Towns">Town</option>
      </select>
      <input
        type="number"
        placeholder="Enter ID"
        value={entityId}
        onChange={(e) => setEntityId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteComponent;