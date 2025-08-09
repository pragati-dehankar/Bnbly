"use server";

import { prisma } from "@/utils/prisma";
import { formatISO } from "date-fns";

export async function getListings(searchParams = {}) {
  try {
    const {
      locationValue,
      guestCount,
      roomCount,
      childCount,
      startDate,
      endDate,
      category,
    } = searchParams;

    let query = {};

    if (locationValue) query.locationValue = locationValue;
    if (guestCount) query.guestCount = { gte: +guestCount };
    if (roomCount) query.roomCount = { gte: +roomCount };
    if (childCount) query.childCount = { gte: +childCount };
    if (category) query.category = category;

    if (startDate && endDate) {
      const formattedStartDate = formatISO(new Date(startDate));
      const formattedEndDate = formatISO(new Date(endDate));

      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: formattedStartDate },
                startDate: { lte: formattedEndDate },
              },
              {
                endDate: { gte: formattedEndDate },
                startDate: { lte: formattedStartDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });

    // Convert dates properly
    return listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}
