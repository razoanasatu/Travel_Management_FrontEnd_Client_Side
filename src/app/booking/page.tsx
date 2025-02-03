"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import baseUrl from "../../../constant";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

// Define a type for the destination data
interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  best_season: string;
  imagePath: string;
}

export default function Booking() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  // Fetch destinations data from backend API
  const fetchDestinations = async () => {
    try {
      const response = await fetch(`${baseUrl}/destinations/all`); // Adjust the endpoint URL as needed
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []); // The empty dependency array ensures this runs only once on mount
  useEffect(() => {
    console.log(destinations);
  }, [destinations]); // The empty dependency array ensures this runs only once on mount

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? destinations.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Navbar />
      <div>
        {/* Navigation Bar */}
        <div className="bg-white mt-10 mx-8 p-5 rounded-xl shadow-lg flex flex-wrap justify-around items-center mb-8 space-y-4 md:space-y-0 md:flex-row">
          <div className="flex flex-col items-center">
            <img
              src={`/travel.png`}
              alt="image"
              className="h-20 w-40 cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src={`/hotel.png`}
              alt="image"
              className="h-20 w-40 cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src={`/tour_guide.png`}
              alt="image"
              className="h-20 w-40 cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src={`/transport.png`}
              alt="image"
              className="h-20 w-40 cursor-pointer"
            />
          </div>
        </div>

        {/* Section Title with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 mx-8 text-black">
          <div>
            <div className="text-lg font-bold">Where you want to go</div>
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={handlePrev}
              className="bg-white border-2 text-3xl border-black rounded-full hover:bg-gray-400 px-5 py-1"
            >
              <HiOutlineArrowNarrowLeft />
            </button>
            <button
              onClick={handleNext}
              className="bg-white border-2 text-3xl border-black rounded-full hover:bg-gray-400 px-5 py-1"
            >
              <HiOutlineArrowNarrowRight />
            </button>
          </div>
        </div>

        {/* Destination Cards Section */}
        <div className="flex overflow-x-auto m-8 space-x-2 md:grid md:grid-cols-4 gap-4">
          {destinations &&
            destinations.map((destination, index) => (
              <Link href={`/destination?name=${destination.name}`} key={index}>
                <div
                  className={`min-w-[250px] h-[300px] bg-cover bg-center rounded-xl cursor-pointer ${
                    index === currentIndex ? "opacity-50" : "opacity-100"
                  }`}
                  style={{ backgroundImage: `url(${destination.imagePath})` }}
                >
                  <div className="flex flex-col justify-end h-full p-4 rounded-xl">
                    <h3 className="text-xl text-white">{destination.name}</h3>
                    <div className="text-white">{destination.country}</div>
                    <div className="text-white">
                      {destination.country} people want to visit
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
