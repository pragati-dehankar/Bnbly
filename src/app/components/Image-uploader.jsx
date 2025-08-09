import { uploadToCloudinary} from '@/utils/uploadToBlob';
import React from 'react';

export default function ImageUploadComponent({ value, returnUrl }) {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const { secure_url } = await uploadToCloudinary(file);
      returnUrl(secure_url);
      console.log(secure_url, 'Cloudinary URL');
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <label>
        <div className="py-5 border-2 border-dashed flex justify-center items-center text-lg cursor-pointer">
          Upload Image
        </div>
        <input type="file" onChange={handleImageUpload} hidden />
      </label>
    </div>
  );
}
