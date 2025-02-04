"use client";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { useRouter } from "next/navigation"; // Import useRouter hook
import { useState } from "react";

export default function Checkout() {
  const router = useRouter(); // Initialize the useRouter hook
  const [ticketTitle, setTicketTitle] = useState<string>("");
  const [ticketDate, setTicketDate] = useState<string>("");
  const [ticketTime, setTicketTime] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false); // state to control modal visibility

  const handleProceedToCheckout = async () => {
    // Validate form fields
    if (!ticketTitle || !ticketDate || !ticketTime) {
      alert("Please fill out all fields");
      return;
    }
    setShowModal(true);
  };

  const handleBackClick = () => {
    // Redirect to the homepage when the "Back" button is clicked
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-6 text-black">
        <h1 className="text-3xl font-bold text-black">Checkout</h1>

        {/* Checkout Form */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Enter Checkout Info</h3>
          <form className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Ticket Title
              </label>
              <select
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Ticket Type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Family">Family</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Ticket Date
              </label>
              <input
                type="date"
                value={ticketDate}
                onChange={(e) => setTicketDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Select Date"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Ticket Time
              </label>
              <select
                value={ticketTime}
                onChange={(e) => setTicketTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select Time</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>
                <option value="08:00 PM">08:00 PM</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-200 w-full"
            >
              Proceed to Checkout
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 text-black">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Checkout Successful</h2>
            <p>Your checkout info has been submitted successfully.</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleBackClick} // Trigger the back navigation
                className="bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
