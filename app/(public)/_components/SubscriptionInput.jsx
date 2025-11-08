"use client";
import { EmailSubscription } from "@/app/actions/public-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

const SubscriptionInput = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await EmailSubscription(email);

      if (!res.success)
        return toast.error(res.message || "Failed to subscribe");

      return toast.message(res.message || "Subscribed Successfuly");
    } catch {
      toast.error("Failed to Subscribe");
    }
  };

  return (
    <form
      action=""
      className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
      />

      <Button onClick={() => handleSubmit()} className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'> Subscribe </Button>
      {/* <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
      /> */}
    </form>
  );
};

export default SubscriptionInput;
