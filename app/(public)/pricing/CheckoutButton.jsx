"use client";
import { useState } from "react";

export default function CheckoutButton({ plan, featured = false }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function checkout() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, period: "MONTHLY" }),
      });
      const data = await response.json();
      if (response.status === 401) {
        location.href = "/login?next=/pricing";
        return;
      }
      if (!response.ok || !data.url)
        throw new Error(data.error || "Checkout is unavailable");
      location.href = data.url;
    } catch (checkoutError) {
      setError(checkoutError.message);
      setBusy(false);
    }
  }
  return (
    <div>
      <button
        onClick={checkout}
        disabled={busy}
        className={
          featured
            ? "w-full rounded-full bg-rose-700 px-6 py-3.5 font-bold text-white hover:bg-rose-600"
            : "w-full rounded-full bg-stone-950 px-6 py-3.5 font-bold text-white hover:bg-rose-800"
        }
      >
        {busy
          ? "Opening secure checkout..."
          : `Choose ${plan[0] + plan.slice(1).toLowerCase()}`}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
