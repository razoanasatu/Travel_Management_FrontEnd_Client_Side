"use client";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import baseUrl from "../../../constant";

// Define a type for the destination data
interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  best_season: string;
  imagePath: string;
  rating?: number;
  extraInfo?: string;
}

export default function Destination() {
  const [destinationData, setDestinationData] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredDestination, setFilteredDestination] =
    useState<Destination | null>(null);
  const searchParams = useSearchParams(); // Get the search parameters from the URL
  const name = searchParams.get("name"); // Extract the 'name' query parameter
  const router = useRouter(); // Initialize the useRouter hook

  useEffect(() => {
    if (name) {
      // Make API call to fetch destination data
      const fetchDestinationData = async () => {
        try {
          const response = await fetch(`${baseUrl}/destinations/all`);
          if (!response.ok) {
            throw new Error("Destination not found");
          }
          const data = await response.json();
          setDestinationData(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchDestinationData();
    }
  }, [name]);

  // Filter the destination based on the name query parameter
  useEffect(() => {
    if (name && destinationData.length > 0) {
      const destination = destinationData.find(
        (destination) =>
          destination.name.toLowerCase() === (name as string).toLowerCase()
      );
      setFilteredDestination(destination || null);
    }
  }, [destinationData, name]);

  const handleBookNow = () => {
    if (filteredDestination) {
      // Store the selected destination in localStorage
      localStorage.setItem(
        "selectedDestination",
        JSON.stringify(filteredDestination)
      );
      // Redirect to the payment page
      router.push("/payment");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!filteredDestination) {
    return <div>No destination found for the specified name.</div>;
  }

  return (
    <>
      <Navbar />
      <div>
        {/* Cover Image */}
        <div
          className="h-80 w-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${filteredDestination.imagePath})` }}
        ></div>

        {/* Destination Title and Rating */}
        <div className="flex items-center justify-between mx-8 mt-6 text-black">
          {/* Destination Name */}
          <h1 className="text-left text-3xl font-semibold text-black">
            {filteredDestination.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center text-yellow-400 ml-auto">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 15l-5.56 3.48 1.06-6.17-4.49-4.38 6.17-.49L10 0l2.82 6.62 6.17.49-4.49 4.38 1.06 6.17z" />
            </svg>
            <span className="font-semibold text-lg text-black ml-1">
              {filteredDestination.rating}
            </span>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 mx-6">
          <h2 className="text-2xl font-semibold text-black">
            About This Destination
          </h2>
          <p className="mt-4 text-gray-700">
            {filteredDestination.description}
          </p>
        </div>

        {/* Small Gray Text */}
        {filteredDestination.extraInfo && (
          <p className="text-xs text-gray-500 mx-6 my-4">
            {filteredDestination.extraInfo}
          </p>
        )}

        {/* Book Now Button Section */}
        <div className="w-full flex justify-center mt-8 mb-8">
          <button
            onClick={handleBookNow} // On button click, call handleBookNow
            className="bg-blue-800 text-white px-24 py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-200"
          >
            Book Now
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
