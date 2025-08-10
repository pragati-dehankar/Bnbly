"use client"

import getListingById from "@/app/actions/getListingById";
import { getReservationById } from "@/app/actions/getReservations";
import { getCountryByValue } from "@/lib/countries"; // server-safe
import { categories } from "@/static/config";
import { Baby, House, IndianRupee, UserRound } from "lucide-react";
import Image from "next/image";
import ReservationComponent from "@/components/ui/reservation-comp";

export default async function SingleListingPage({ params }) {
  const { id } = params;

  const data = await getListingById(id);
  const reservations = await getReservationById(id);

  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Listing not found</h1>
      </div>
    );
  }

  // ✅ Use server-safe util, not client hook
  const country = getCountryByValue(data.locationValue);
  const foundCategory = categories.find((cat) => cat.label === data.category);

  const mainImage = data.imageSrc || "/fallback.jpg";
  const userImage = data.User?.image || "/fallback.jpg";

  return (
    <div className="p-4 md:p-8">
      <div className="main-wrapper w-full md:w-[70%] mx-auto">
        <h1 className="text-xl font-bold sm:text-2xl md:text-5xl lg:text-7xl">
          {data.title}
        </h1>
        <div className="text-xl text-gray-500">
          {country?.label},&nbsp;{country?.region}
        </div>

        <Image
          className="w-full rounded-lg mt-5 object-cover mb-5"
          src={mainImage}
          width={300}
          height={140}
          alt={data.title || "Property image"}
        />

        <div className="grid grid-cols-5 gap-10">
          {/* LEFT SIDE */}
          <div className="left col-span-5 lg:col-span-3 space-y-4">
            <div className="flex flex-row items-center gap-2">
              <span>
                <h5>
                  Hosted by{" "}
                  <span className="font-medium">
                    {data.User?.name || "Unknown host"}
                  </span>{" "}
                </h5>
                <p>
                  Listed on:{" "}
                  {new Date(data.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </span>
              <Image
                className="rounded-full"
                src={userImage}
                width={40}
                height={40}
                alt={data.User?.name || "Host"}
              />
            </div>

            <hr />

            <div className="flex gap-4">
              <span className="p-4 bg-pink-100/40 rounded-lg font-semibold px-5 flex flex-col items-center">
                <UserRound />
                Guests: {data.guestCount}
              </span>
              <span className="p-4 bg-pink-100/40 rounded-lg font-semibold px-5 flex flex-col items-center">
                <House />
                Rooms: {data.roomCount}
              </span>
              <span className="p-4 bg-pink-100/40 rounded-lg font-semibold px-5 flex flex-col items-center">
                <Baby />
                Children: {data.childCount}
              </span>
            </div>

            <hr />

            {foundCategory && (
              <div className="flex gap-3 items-center">
                {/* ✅ Proper icon rendering */}
                {(() => {
                  const Icon = foundCategory.icon;
                  return <Icon size={50} className="text-zinc-500" />;
                })()}
                <span className="text-sm">
                  <p className="text-xl font-semibold text-gray-600">
                    {foundCategory.label}
                  </p>
                  <p>{foundCategory.label} is the speciality of this property</p>
                </span>
              </div>
            )}

            <hr />

            <div>
              <span className="font-extrabold text-2xl">
                <span className="text-pink-400">air</span> cover
              </span>
              <p>
                Every booking includes free protection from hosting cancellation,
                listing inaccuracies, and other issues like trouble checking in.
              </p>
              <a className="font-bold underline">Learn More</a>
            </div>

            <hr />

            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html:
                  data.description?.replaceAll(/\n/g, "<br/>") || "",
              }}
            ></div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right col-span-5 lg:col-span-2">
            <div className="bg-gray-100 p-5 rounded-lg">
              <span className="flex gap-1 items-center">
                <IndianRupee />
                <span className="text-xl font-bold">{data.price}</span>/night
              </span>
              <ReservationComponent
                listingId={data.id}
                pricePerDay={data.price}
                reservations={reservations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
