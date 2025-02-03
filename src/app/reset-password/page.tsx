"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import baseUrl from "../../../constant";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const ResetPassword = () => {
  const [new_password, setnew_password] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams(); // Get the search parameters from the URL
  const reset_token = searchParams.get("token"); // Extract the 'token' query parameter

  const handleSubmit = async (e: any) => {
    console.log("reset_token", reset_token);
    e.preventDefault();
    setLoading(true);

    // If the reset token isn't available, show an error message
    if (!reset_token) {
      setMessage("Invalid reset token.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/auth/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_password, reset_token }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password has been reset successfully!");
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
            Reset Your Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="new_password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                placeholder="New password"
                value={new_password}
                onChange={(e) => setnew_password(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-4 bg-[#F45B69] text-white font-bold rounded-md hover:bg-[#F48C6E] transition-colors"
            >
              {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
