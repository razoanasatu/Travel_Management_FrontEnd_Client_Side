"use client";

import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import baseUrl from "../../../../constant";
const Profile = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    address: "",
  });

  // State for error and success messages
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Populate form data from cookies on component mount
  useEffect(() => {
    if (!Cookies.get("user")) {
      window.location.href = "/signin";
    }
    // Retrieve user data from cookies
    const storedUser = Cookies.get("user");

    if (storedUser) {
      // Parse the user data and update the formData state
      const user = JSON.parse(storedUser);

      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "", // You can leave the password field empty or handle it differently
        dob: user.dob || "",
        address: user.address || "",
      });
    }
  }, []);

  // Handle input change
  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form submit handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Reset error messages
    setError("");
    setSuccessMessage("");

    // Simple validation for required fields
    if (
      !formData.name ||
      !formData.password ||
      !formData.dob ||
      !formData.address
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Prepare data to be sent to the backend (exclude email from update)
    const updateData = {
      name: formData.name,
      password: formData.password,
      dob: formData.dob,
      address: formData.address,
    };

    try {
      const res: any = await updateApi(updateData);

      if (res.success) {
        setSuccessMessage("Successfully updated!");
        // Redirect or take other actions on success
        setTimeout(() => {
          window.location.href = "/profile"; // Adjust the path as needed
        }, 2000);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const token = Cookies.get("access_token");
  // API function to simulate the real API call
  const updateApi = (formData: any) => {
    return fetch(`${baseUrl}/user/update-profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add Bearer token to Authorization header
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        throw new Error("Network error");
      });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
        <div className="w-full lg:w-1/4 flex flex-col items-center justify-center lg:mt-0 bg-gradient-to-b from-[#59C3C3] via-[#A3E1EE] to-white p-4">
          {/* Profile Image Section */}
          <div className="w-32 h-32 rounded-full border-4 border-red-500 mb-4">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Name Section */}
          <h2 className="text-xl font-semibold text-gray-800">
            {formData.name}
          </h2>

          {/* Email Section */}
          <p className="text-sm text-gray-600 mb-6">{formData.email}</p>

          {/* Account Section */}
          <div className="w-full mb-6">
            <h3 className="text-lg font-semibold text-gray-700">Account</h3>
            <ul className="text-sm text-gray-600">
              <li className="py-2">Personal Information</li>
              <li className="py-2">Subscription Plan</li>
              <li className="py-2">Security Settings</li>
            </ul>
          </div>

          {/* Actions Section */}
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-700">Actions</h3>
            <ul className="text-sm text-gray-600">
              <li className="py-2 cursor-pointer hover:text-gray-800">
                Edit Profile
              </li>
              <li className="py-2 cursor-pointer hover:text-gray-800">
                Change Password
              </li>
              <li className="py-2 cursor-pointer hover:text-gray-800">
                <button
                  onClick={() => {
                    Cookies.remove("user");
                    window.location.href = "/";
                  }}
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Personal Information Form */}
        <div className="w-full lg:w-3/4 flex flex-col justify-center items-center p-8 lg:p-12">
          <div className="text-left mb-6 w-full">
            <h1 className="text-4xl font-extrabold text-[#59C3C3]">
              Personal Information
            </h1>
          </div>

          {/* Personal Information Form */}
          <div className="w-full flex flex-col">
            {/* Display error or success message */}
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && (
              <div className="text-green-500 mb-4">{successMessage}</div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-8 rounded-xl shadow-lg w-full"
            >
              <div>
                <label className="block text-sm font-medium text-[#59C3C3]">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F45B69] transition-all duration-300 text-black"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#59C3C3]">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F45B69] transition-all duration-300 text-black"
                  placeholder="Enter your email"
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
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F45B69] transition-all duration-300 text-black"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#59C3C3]">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F45B69] transition-all duration-300 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#59C3C3]">
                  address/Region *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F45B69] transition-all duration-300 text-black"
                  placeholder="Enter your address/region"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-[#3d9b9b] transition-all duration-300 text-black"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
