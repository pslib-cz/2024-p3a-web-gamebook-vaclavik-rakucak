import React, { useState } from 'react';
import axios from 'axios';
import styles from './FormComponent.module.css';

interface FormComponentProps {
  token: string;
  entityName: string;
  fields: { name: string; type: string; placeholder: string }[];
  apiUrl: string;
}

const FormComponent: React.FC<FormComponentProps> = ({ token, entityName, fields, apiUrl }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert(`${entityName} added successfully!`);
      setFormData({});
    } catch (error) {
      console.error(`Error adding ${entityName}:`, error);
      alert(error instanceof Error ? error.message : `Error adding ${entityName}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formComponent}>
      <h2>Add {entityName}</h2>
      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name] ?? ''}
          onChange={handleChange}
          className={styles.inputField}
        />
      ))}
      <button onClick={handleSubmit} disabled={loading}>
        Add {entityName}
      </button>
    </div>
  );
};

export default FormComponent;