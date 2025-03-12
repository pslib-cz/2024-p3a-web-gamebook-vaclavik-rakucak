import React, { useState } from 'react';
import styles from './ImageUploadComponent.module.css';

const ImageUploadComponent: React.FC = () => {
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert('Please select an image file.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', imageName);
      formData.append('image', imageFile);

      alert('Image uploaded successfully!');
      setImageName('');
      setImageFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error instanceof Error ? error.message : 'Error uploading image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.imageUploadComponent}>
      <h2>Upload Image</h2>
      <input
        type="text"
        placeholder="Image Name"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="file"
        onChange={handleFileChange}
        className={styles.inputField}
      />
      <button onClick={handleSubmit} disabled={loading}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploadComponent;