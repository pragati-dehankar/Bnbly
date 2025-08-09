export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) throw new Error("Cloudinary upload failed");
    return await res.json(); // returns { secure_url, public_id, ... }
  };
  