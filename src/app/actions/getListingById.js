"use server"

import { prisma } from "@/utils/prisma"
import { ObjectId } from "mongodb"

export default async function getListingById(listingId) {
    // Validate ID
    if (!listingId || !ObjectId.isValid(listingId)) {
        return null; // or throw an error
    }

    const listing = await prisma.listing.findUnique({
        where: { id: listingId },
        include: {
            User: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    });

    const modifiedListing={
        ...listing,
        createdAt:listing.createdAt.toString()
    }

    return modifiedListing;
}
