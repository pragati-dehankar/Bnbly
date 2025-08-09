"use client"
import { Button } from "@/components/ui/button";
import useCountries from "@/hooks/useCountries";
import formatMoney from "@/utils/formatMoney";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Favourite from "./favourites";
import { useRouter } from "next/navigation";

export default function ListingCards({user,reservationsData, listing, showSecondaryBtn=false, secondaryBtnLabel , onAction}) {
  const { getByValue } = useCountries();
  const router=useRouter()
  const countryDetails = getByValue(listing.locationValue);

  return (
    <div
      className="p-3 rounded shadow border border-gray-200 relative"
    >
      {/* Image */}
      <div className="w-full rounded-lg overflow-hidden">
        <Image
          className="object-cover w-full h-48 rounded-lg"
          src={listing.imageSrc} // <-- FIXED field name
          width={400}
          height={300}
          alt={listing.title || "Property listing"}
        />
      </div>

      <Favourite className="absolute top-6 right-6 text-pink-300" listingId={listing.id} user={user}/>

      {/* Title */}
      <p className="font-semibold text-lg md:text-2xl pt-2 capitalize">
        {listing.title}
      </p>

      {/* Price */}
      {reservationsData ?
      <p>Paid {formatMoney(reservationsData.totalPrice)} rupees</p>
      :<p className="text-lg flex gap-1 items-center">
        <IndianRupee size={16} /> {listing.price} per Night
      </p>}

      {/* Location */}
      <div className="text-gray-400">
        {countryDetails?.label || "Unknown"}, {countryDetails?.region || ""}
      </div>
      <Button 
         onClick={()=>router.push(`/listings/${listing.id}`)}
         className='w-full'  
      >View Property</Button>
      {showSecondaryBtn &&
        <Button onClick={onAction}> {secondaryBtnLabel} </Button>}
    </div>
  );
}
