import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function ImageUploader() {
  
  const [image, setImage] = useState(null);
  const [plantInfo, setPlantInfo] = useState('');

  const API_KEY = "AIzaSyCI55ppJYnsY4Ks34dd_cOMJqq8K-D4XLE  "; // Replace "..." with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleImageUpload = async (event) => {
    const uploadedImage = event.target.files[0];
    setImage(URL.createObjectURL(uploadedImage));

    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(uploadedImage);
    });

    const imagePart = {
      inlineData: { data: await base64EncodedDataPromise, mimeType: uploadedImage.type },
    };

    const prompt = "What plant is this? Give a fun fact about it.";
    runAI(prompt, [imagePart]);
  };

  const runAI = async (prompt, imageParts) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    setPlantInfo(text);
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
          {plantInfo && (
            <div>
              <h3>Plant Info:</h3>
              <p>{plantInfo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
