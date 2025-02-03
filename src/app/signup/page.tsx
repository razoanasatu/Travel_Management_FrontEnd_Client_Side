"use client";

import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import { useState } from "react";
import SignUpHero from "../components/SignUpHero";
export default function SignUp() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <SignUpHero />

      <Footer />
    </div>
  );
}
