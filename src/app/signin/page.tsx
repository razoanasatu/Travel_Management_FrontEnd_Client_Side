"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import baseUrl from "../../../constant";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Retrieve data from cookies if rememberMe is true
    const storedEmail = Cookies.get("email");
    const storedRememberMe = Cookies.get("rememberMe");

    if (storedRememberMe === "true") {
      setFormData({
        ...formData,
        email: storedEmail || "",
        rememberMe: true,
      });
    }
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.email || !formData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Successfully signed in!");

        // Save to cookies if rememberMe is true
        if (formData.rememberMe && data?.access_token && data.user) {
          Cookies.set("access_token", data?.access_token, { expires: 7 }); // Store for 7 days
          Cookies.set("user", JSON.stringify(data.user), { expires: 7 }); // Store user object as JSON string for 7 days
          Cookies.set("rememberMe", "true", { expires: 7 });
          console.log(Cookies.get("user"));
        } else {
          // Clear cookies if rememberMe is false
          Cookies.remove("access_token");
          Cookies.remove("user");
          Cookies.remove("rememberMe");
        }

        setTimeout(() => {
          window.location.href = `/profile/${data.user.name}`;
        }, 2000);
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      {/* Back Button - Positioned at top left */}
      <div className="absolute top-32 left-6 z-10">
        <Link
          href="/"
          className="w-10 h-10 bg-[#F45B69] rounded-full flex items-center justify-center hover:bg-[#d1445c]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row bg-white">
        {/* Left Side - Image Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:mt-0 bg-gradient-to-b from-[#59C3C3] via-[#A3E1EE] to-white">
          <img
            src="/ballon_1.png"
            alt="Demo"
            className="w-80 h-80 object-cover"
          />
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12">
          <div className="text-center mb-6">
            <h1 className="text-7xl font-extrabold text-[#59C3C3]">Welcome</h1>
          </div>
          {/* Sign In Form */}
          <div className="max-w-md mx-auto">
            {/* Display error or success message */}
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && (
              <div className="text-green-500 mb-4">{successMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#59C3C3]">
                  Work email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69] text-black"
                  placeholder="Enter your work email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#59C3C3]">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69] text-black"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm  text-[#59C3C3]">Remember Me</span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#F45B69] text-white py-2 rounded-lg hover:bg-[#d1445c]"
              >
                Sign In
              </button>
            </form>

            <div className="mt-4 flex justify-between">
              <Link
                href="/forgot-password"
                className="text-[#F45B69] hover:underline text-sm"
              >
                Forgot Password?
              </Link>
              <div className="flex items-center">
                <span className="text-white">Don't have an account? </span>
                <Link href="/signup" className="text-[#F45B69] hover:underline">
                  Create one
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignIn;
