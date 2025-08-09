import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const session = await getAuthSession();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 403 });
    }

    const {
      category,
      title,
      description,
      roomCount,
      guestCount,
      childCount,
      location,
      price,
      imgSrc // Match form field name
    } = body;

    const newListing = await prisma.listing.create({
      data: {
        title,
        description,
        roomCount,
        childCount,
        guestCount,
        price: parseInt(price, 10),
        category,
        locationValue: typeof location === "string" ? location : location?.value, // Handle object or string
        imageSrc: imgSrc,
        userId: session.user.id
      }
    });

    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
