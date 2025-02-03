"use client";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Payment() {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    // Retrieve the selected destination from localStorage
    const storedDestination = localStorage.getItem("selectedDestination");
    if (storedDestination) {
      setSelectedDestination(JSON.parse(storedDestination));
    }
  }, []);

  const router = useRouter();
  const handleProceedToPayment = () => {
    // Validate form fields
    if (!cardHolderName || !cardNumber || !password) {
      alert("Please fill out all fields");
      return;
    }

    // Optionally, add any additional payment processing logic here

    // Redirect to checkout page
    router.push("/checkout"); // Redirect to the checkout page
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-6 text-black">
        <h1 className="text-3xl font-bold text-black">Payment Review</h1>

        {selectedDestination ? (
          <>
            <div className="mt-6 flex">
              <img
                src={selectedDestination.imagePath}
                alt={selectedDestination.name}
                className="h-48 w-48 object-cover rounded-md"
              />
              <div className="ml-6">
                <h2 className="text-2xl font-semibold">
                  {selectedDestination.name}
                </h2>
                <p className="text-gray-600">{selectedDestination.country}</p>
                <p className="text-gray-500 mt-2">
                  {selectedDestination.description}
                </p>
              </div>
            </div>

            {/* Price and Confirmation */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-lg font-semibold">Total: $499</div>{" "}
              {/* Example price */}
            </div>

            {/* Payment Form */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Enter Payment Details</h3>
              <form className="mt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter your card number"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-200 w-full"
                >
                  Proceed to Pay
                </button>
              </form>
            </div>
          </>
        ) : (
          <p className="mt-6 text-gray-600">
            No destination selected for payment.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
