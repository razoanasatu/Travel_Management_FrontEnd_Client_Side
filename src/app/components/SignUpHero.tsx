// // components/Body.js
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignUpHero() {
//   const router = useRouter();
//   // States to handle form inputs
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     termsAgreed: false,
//   });

//   // States to handle errors and success messages
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   // Handle form input changes
//   const handleInputChange = (e: any) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     console.log(formData);

//     // Basic validation
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (!formData.termsAgreed) {
//       setError("You must agree to the Terms of Service and Privacy Policy");
//       return;
//     }

//     try {
//       // Sending POST request to the API
//       const response = await fetch("/api/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fullName: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccessMessage("Account created successfully!");
//         setFormData({
//           fullName: "",
//           email: "",
//           phone: "",
//           password: "",
//           confirmPassword: "",
//           termsAgreed: false,
//         });
//         setError("");
//         router.push("/signin");
//       } else {
//         setError(data.message || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-[#59C3C3]">
//       {/* Left Side - Signup Form */}
//       <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12">
//         {/* Back Button */}
//         <div className="flex items-center mb-6 lg:mb-8">
//           <Link
//             href="/"
//             className="w-10 h-10 bg-[#F45B69] rounded-full flex items-center justify-center hover:bg-[#d1445c]"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="w-6 h-6 text-white"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
//               />
//             </svg>
//           </Link>
//           <span className="ml-4 text-white text-lg font-medium">
//             Create Account
//           </span>
//         </div>

//         {/* Sign Up Form */}
//         <div className="max-w-md mx-auto">
//           <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>

//           {/* Display error or success message */}
//           {error && <div className="text-red-500 mb-4">{error}</div>}
//           {successMessage && (
//             <div className="text-green-500 mb-4">{successMessage}</div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-white">
//                 Full name *
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white">
//                 Work email *
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
//                 placeholder="Enter your work email"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white">
//                 Phone number *
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
//                 placeholder="Enter your phone number"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white">
//                 Password *
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
//                 placeholder="Enter your password"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white">
//                 Confirm password *
//               </label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
//                 placeholder="Confirm your password"
//                 required
//               />
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="termsAgreed"
//                 checked={formData.termsAgreed}
//                 onChange={handleInputChange}
//                 className="mr-2"
//                 required
//               />
//               <span className="text-sm text-white">
//                 I agree to the{" "}
//                 <a href="#" className="text-[#F45B69] hover:underline">
//                   Terms of Service
//                 </a>{" "}
//                 and{" "}
//                 <a href="#" className="text-[#F45B69] hover:underline">
//                   Privacy Policy
//                 </a>
//               </span>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-[#F45B69] text-white py-2 rounded-lg hover:bg-[#d1445c]"
//             >
//               Create
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Right Side - Image Section */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center mt-6 lg:mt-0">
//         <img src="/traveller_1.png" alt="Demo" className="w-100 h-100" />
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import baseUrl from "../../../constant";

export default function SignUpHero() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.termsAgreed) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Account created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          termsAgreed: false,
        });
        setError("");
        router.push("/signin");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };
  useEffect(() => {}, [formData]);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#59C3C3]">
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12">
        <div className="flex items-center mb-6 lg:mb-8">
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
          <span className="ml-4 text-white text-lg font-medium">
            Create Account
          </span>
        </div>

        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {successMessage && (
            <div className="text-green-500 mb-4">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleInputChange}
                required
                className="mr-2"
              />
              <span className="text-sm text-white">
                I agree to the{" "}
                <a href="#" className="text-[#F45B69] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#F45B69] hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-[#F45B69] text-white py-2 rounded-lg hover:bg-[#d1445c]"
            >
              Create
            </button>
          </form>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center mt-6 lg:mt-0">
        <img src="/traveller_1.png" alt="Demo" className="w-100 h-100" />
      </div>
    </div>
  );
}
