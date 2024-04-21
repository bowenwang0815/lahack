import React, { useState } from 'react';

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(URL.createObjectURL(uploadedImage));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>1st place winner</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        style={{ marginBottom: '20px' }} 
      />
      {image && (
        <div>
          <h3>Plant:</h3>
          <img 
            src={image} 
            alt="Uploaded" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '400px', 
              border: '1px solid #ccc', 
              borderRadius: '5px' 
            }} 
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
