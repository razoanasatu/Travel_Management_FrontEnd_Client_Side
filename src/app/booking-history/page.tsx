"use client";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";

const bookings = [
  {
    ticketType: "Economy",
    destination: "New York",
    date: "2025-02-01",
    paymentMethod: "Credit Card",
    price: "$300",
  },
  {
    ticketType: "Business",
    destination: "London",
    date: "2025-01-15",
    paymentMethod: "PayPal",
    price: "$1500",
  },
  {
    ticketType: "First Class",
    destination: "Tokyo",
    date: "2025-02-10",
    paymentMethod: "Debit Card",
    price: "$2500",
  },
  // Add more booking data as needed
];

export default function BookingHistory() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto my-12 p-8 bg-white rounded-lg shadow-xl text-gray-800">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Booking History
        </h2>

        {/* Grid layout for the two segments */}
        <div className="grid grid-cols-2 gap-12">
          {" "}
          {/* Increased gap here */}
          {/* First Segment: Ticket Type, Destination, Date */}
          <div className="space-y-4 p-6 border border-gray-300 rounded-lg">
            {" "}
            {/* Added border */}
            <div className="flex justify-between font-semibold text-gray-600">
              <span className="w-1/3">Ticket Type</span>
              <span className="w-1/3">Destination</span>
              <span className="w-1/3">Date</span>
            </div>
            {bookings.map((booking, index) => (
              <div
                key={index}
                className={`flex justify-between py-3 px-4 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-200 transition-colors`}
              >
                <span className="w-1/3">{booking.ticketType}</span>
                <span className="w-1/3">{booking.destination}</span>
                <span className="w-1/3">{booking.date}</span>
              </div>
            ))}
          </div>
          {/* Second Segment: Payment Method, Price */}
          <div className="space-y-4 p-6 border border-gray-300 rounded-lg">
            {" "}
            {/* Added border */}
            <div className="flex justify-between font-semibold text-gray-600">
              <span className="w-1/2">Payment Method</span>
              <span className="w-1/2">Price</span>
            </div>
            {bookings.map((booking, index) => (
              <div
                key={index}
                className={`flex justify-between py-3 px-4 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-200 transition-colors`}
              >
                <span className="w-1/2">{booking.paymentMethod}</span>
                <span className="w-1/2">{booking.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
