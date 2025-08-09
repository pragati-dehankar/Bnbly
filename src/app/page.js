import { getListings } from "./actions/getListings";
import ListingCards from "./components/listings-card";
import CategoryHandler from "./components/category-handler";
import { getAuthSession } from "@/utils/auth";
import { getUser } from "./actions/getUser";

export const metadata = {
  title: "Bnbly website",
};

export default async function Home({ searchParams }) {
  const user=await getUser()
  const session=await getAuthSession()
  const listings = await getListings(searchParams);

  // If no listings found
  if (!listings || listings.length === 0) {
    return (
      <section>
        <CategoryHandler />
        <div className="w-full h-screen grid place-items-center">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">No Listings Found</h1>
            <p>Maybe change your filter</p>
          </div>
        </div>
      </section>
    );
  }

  // Show listings
  return (
    <section>
      <CategoryHandler />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 p-4 md:p-8">
        {listings.map((listing) => (
          <ListingCards key={listing.id} user={session.user.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}
