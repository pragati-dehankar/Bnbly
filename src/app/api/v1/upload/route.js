import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    // Send file to Cloudinary
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

    const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData, // we'll append preset here
    });

    if (!uploadRes.ok) throw new Error("Upload failed");

    const data = await uploadRes.json();
    return NextResponse.json({ url: data.secure_url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
