"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import baseUrl from "../../../constant";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/auth/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Email has been sent! Please check your inbox.");
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error: any) {
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
          <h2 className="text-3xl font-semibold text-center text-[#F45B69] mb-6">
            Forgot Your Password?
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-4 bg-[#F45B69] text-white font-bold rounded-md hover:bg-[#F48C6E] transition-colors"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/forgot-password"
              className="text-[#F45B69] hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-4 flex justify-center items-center">
            <span className="text-sm text-gray-700">
              Don't have an account?{" "}
            </span>
            <Link
              href="/signup"
              className="text-[#F45B69] hover:underline text-sm ml-1"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
