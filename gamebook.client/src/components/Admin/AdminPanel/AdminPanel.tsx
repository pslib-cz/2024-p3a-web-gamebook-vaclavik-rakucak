import React from 'react';
import FormComponent from './FormComponent';
import ImageUploadComponent from './ImageUploadComponent';
import styles from './AdminPanel.module.css';

interface AdminPanelProps {
  token: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ token }) => {
  const baseApiUrl = import.meta.env.VITE_API_URL;

  const roomItemFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'type', type: 'text', placeholder: 'Type' },
    { name: 'description', type: 'text', placeholder: 'Description' },
    { name: 'damage', type: 'number', placeholder: 'Damage' },
    { name: 'roomId', type: 'number', placeholder: 'Room ID' },
    { name: 'equipmentId', type: 'number', placeholder: 'Equipment ID' },
    { name: 'imageId', type: 'number', placeholder: 'Image ID' },
  ];

  const dungeonFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'description', type: 'text', placeholder: 'Description' },
    { name: 'rewardMoney', type: 'number', placeholder: 'Reward Money' },
    { name: 'dmgCondition', type: 'number', placeholder: 'Damage Condition' },
    { name: 'imageId', type: 'number', placeholder: 'Image ID' },
  ];

  const equipmentFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'type', type: 'text', placeholder: 'Type' },
    { name: 'price', type: 'number', placeholder: 'Price' },
    { name: 'rarity', type: 'text', placeholder: 'Rarity' },
    { name: 'dmg', type: 'number', placeholder: 'Damage' },
    { name: 'specialEffectId', type: 'number', placeholder: 'Special Effect ID' },
    { name: 'imageId', type: 'number', placeholder: 'Image ID' },
  ];

  const hallFields = [
    { name: 'imageId', type: 'number', placeholder: 'Image ID' },
    { name: 'roomId', type: 'number', placeholder: 'Room ID' },
    { name: 'dungeonId', type: 'number', placeholder: 'Dungeon ID' },
  ];

  const keyFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'type', type: 'text', placeholder: 'Type' },
    { name: 'price', type: 'number', placeholder: 'Price' },
    { name: 'rarity', type: 'text', placeholder: 'Rarity' },
    { name: 'dmg', type: 'number', placeholder: 'Damage' },
    { name: 'specialEffectId', type: 'number', placeholder: 'Special Effect ID' },
    { name: 'imageId', type: 'number', placeholder: 'Image ID' },
    { name: 'dungeonId', type: 'number', placeholder: 'Dungeon ID' },
  ];

  const monsterFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'hitpoints', type: 'number', placeholder: 'Hitpoints' },
    { name: 'damage', type: 'number', placeholder: 'Damage' },
    { name: 'imageId', type: 'number', placeholder: 'Image ID' },
  ];

  const npcFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'description', type: 'text', placeholder: 'Description' },
  ];

  const questFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'description', type: 'text', placeholder: 'Description' },
    { name: 'condition', type: 'text', placeholder: 'Condition' },
    { name: 'conditionDescription', type: 'text', placeholder: 'Condition Description' },
    { name: 'conditionValue', type: 'number', placeholder: 'Condition Value' },
    { name: 'dungeonId', type: 'number', placeholder: 'Dungeon ID' },
    { name: 'monsterId', type: 'number', placeholder: 'Monster ID' },
    { name: 'roomItemId', type: 'number', placeholder: 'Room Item ID' },
    { name: 'npcId', type: 'number', placeholder: 'NPC ID' },
    { name: 'rewardItemId', type: 'number', placeholder: 'Reward Item ID' },
    { name: 'imageId', type: 'number', placeholder: 'Image ID' },
  ];

  const roomFields = [
    { name: 'type', type: 'text', placeholder: 'Type' },
    { name: 'description', type: 'text', placeholder: 'Description' },
    { name: 'dungeonId', type: 'number', placeholder: 'Dungeon ID' },
    { name: 'imageId', type: 'number', placeholder: 'Image ID' },
    { name: 'isDeadEnd', type: 'checkbox', placeholder: 'Is Dead End' },
    { name: 'monsterId', type: 'number', placeholder: 'Monster ID' },
    { name: 'active', type: 'checkbox', placeholder: 'Active' },
    { name: 'roomItemId', type: 'number', placeholder: 'Room Item ID' },
    { name: 'keyId', type: 'number', placeholder: 'Key ID' },
    { name: 'positionX', type: 'number', placeholder: 'Position X' },
    { name: 'positionY', type: 'number', placeholder: 'Position Y' },
  ];

  const specialEffectFields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'description', type: 'text', placeholder: 'Description' },
    { name: 'value', type: 'number', placeholder: 'Value' },
  ];

  return (
    <div className={styles.adminPanel}>
      <div className={styles.formContainer}>
        <h1>Admin Panel</h1>
        <FormComponent
          token={token}
          entityName="Room Item"
          fields={roomItemFields}
          apiUrl={`${baseApiUrl}/RoomItems`}
        />
        <FormComponent
          token={token}
          entityName="Dungeon"
          fields={dungeonFields}
          apiUrl={`${baseApiUrl}/Dungeons`}
        />
        <FormComponent
          token={token}
          entityName="Equipment"
          fields={equipmentFields}
          apiUrl={`${baseApiUrl}/Equipments`}
        />
        <FormComponent
          token={token}
          entityName="Hall"
          fields={hallFields}
          apiUrl={`${baseApiUrl}/Halls`}
        />
        <FormComponent
          token={token}
          entityName="Key"
          fields={keyFields}
          apiUrl={`${baseApiUrl}/Keys`}
        />
        <FormComponent
          token={token}
          entityName="Monster"
          fields={monsterFields}
          apiUrl={`${baseApiUrl}/Monsters`}
        />
        <FormComponent
          token={token}
          entityName="Npc"
          fields={npcFields}
          apiUrl={`${baseApiUrl}/Npcs`}
        />
        <FormComponent
          token={token}
          entityName="Quest"
          fields={questFields}
          apiUrl={`${baseApiUrl}/Quests`}
        />
        <FormComponent
          token={token}
          entityName="Room"
          fields={roomFields}
          apiUrl={`${baseApiUrl}/Rooms`}
        />
        <FormComponent
          token={token}
          entityName="Special Effect"
          fields={specialEffectFields}
          apiUrl={`${baseApiUrl}/SpecialEffects`}
        />
        <ImageUploadComponent
          token={token}
          apiUrl={`${baseApiUrl}/Images`}
        />
      </div>
    </div>
  );
};

export default AdminPanel;