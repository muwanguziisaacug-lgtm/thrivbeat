"use client";

import { useState } from "react";

const labels = {
  ASSESSMENT: { button: "Request my assessment", success: "Thank you. We’ll contact you to discuss the right next step." },
  CARE_HOME: { button: "Discuss your care home", success: "Thank you. We’ll be in touch about support for your residents and team." },
  WORKPLACE: { button: "Plan workplace support", success: "Thank you. We’ll contact you to explore the right workplace package." },
  COMMUNITY: { button: "Enquire about a session", success: "Thank you. We’ll contact you about your community session." },
  GENERAL: { button: "Send enquiry", success: "Thank you. Your message is safely with the ThrivBeats team." },
};

const inputClass = "mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 shadow-sm outline-none transition focus:border-rose-700 focus:ring-2 focus:ring-rose-700/20";

export default function LeadForm({ kind = "GENERAL" }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setStatus("submitting"); setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.kind = kind;
    payload.consent = form.get("consent") === "on";
    payload.consentVersion = "2026-08-20";
    if (kind === "ASSESSMENT") payload.goals = form.getAll("goals");
    if (kind === "CARE_HOME") payload.supportTypes = form.getAll("supportTypes");
    if (kind === "COMMUNITY") payload.sessionTypes = form.getAll("sessionTypes");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setStatus("success"); event.currentTarget.reset();
    } catch (submissionError) { setError(submissionError.message); setStatus("error"); }
  }

  if (status === "success") return <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950" role="status"><h3 className="text-xl font-bold">Enquiry received</h3><p className="mt-2">{labels[kind].success}</p></div>;

  return (
    <form onSubmit={submit} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="font-semibold text-stone-800">Name <span aria-hidden="true">*</span><input className={inputClass} name="name" autoComplete="name" required /></label>
        <label className="font-semibold text-stone-800">Email <span aria-hidden="true">*</span><input className={inputClass} name="email" type="email" autoComplete="email" required /></label>
        <label className="font-semibold text-stone-800">Phone (optional)<input className={inputClass} name="phone" type="tel" autoComplete="tel" /></label>
        <label className="font-semibold text-stone-800">Country<input className={inputClass} name="country" autoComplete="country-name" /></label>
        {(kind === "CARE_HOME" || kind === "WORKPLACE" || kind === "COMMUNITY") && <label className="font-semibold text-stone-800">Organisation<input className={inputClass} name="organisation" autoComplete="organization" /></label>}
        {(kind === "CARE_HOME" || kind === "WORKPLACE" || kind === "COMMUNITY") && <label className="font-semibold text-stone-800">Location<input className={inputClass} name="location" /></label>}
      </div>

      {kind === "ASSESSMENT" && <div className="mt-6"><fieldset><legend className="font-semibold text-stone-800">What would you like support with? <span aria-hidden="true">*</span></legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{["Move with more confidence", "Build strength", "Improve fitness", "Return to regular activity"].map((goal) => <label key={goal} className="flex gap-3 rounded-xl bg-stone-50 p-3"><input type="checkbox" name="goals" value={goal} />{goal}</label>)}</div></fieldset><label className="mt-5 block font-semibold text-stone-800">Broad mobility-support needs<select className={inputClass} name="mobilitySupport" required defaultValue=""><option value="" disabled>Select one</option><option value="NONE">No support at present</option><option value="SOME">Some support</option><option value="REGULAR">Regular support</option><option value="UNSURE">Not sure</option></select></label></div>}
      {kind === "CARE_HOME" && <label className="mt-5 block font-semibold text-stone-800">Approximate number of residents<input className={inputClass} name="residentCount" /></label>}
      {kind === "WORKPLACE" && <div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="font-semibold text-stone-800">Approximate number of employees<input className={inputClass} name="employeeCount" /></label><label className="font-semibold text-stone-800">Package of interest<select className={inputClass} name="tierInterest" defaultValue="UNSURE"><option value="UNSURE">Not sure yet</option><option value="STARTER">Starter</option><option value="PLUS">Plus</option><option value="PREMIUM">Premium</option></select></label></div>}
      {kind === "COMMUNITY" && <label className="mt-5 block font-semibold text-stone-800">Approximate group size<input className={inputClass} name="groupSize" /></label>}
      {kind === "GENERAL" && <label className="mt-5 block font-semibold text-stone-800">Subject <span aria-hidden="true">*</span><input className={inputClass} name="subject" required /></label>}

      <label className="mt-5 block font-semibold text-stone-800">Preferred contact method<select className={inputClass} name="preferredContact" defaultValue="EMAIL"><option value="EMAIL">Email</option><option value="PHONE">Phone</option><option value="VIDEO_CALL">Video call</option></select></label>
      <label className="mt-5 block font-semibold text-stone-800">Anything else you’d like us to know?<textarea className={`${inputClass} min-h-28`} name="message" maxLength={500} /></label>
      <p className="mt-3 text-sm text-stone-600">For your privacy, please do not include diagnoses, medication details or other sensitive medical information here.</p>
      <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="mt-5 flex items-start gap-3 text-sm text-stone-700"><input className="mt-1 size-4" type="checkbox" name="consent" required />I consent to ThrivBeats using these details to respond to my enquiry. See our <a className="font-semibold text-rose-800 underline" href="/privacy">privacy notice</a>.</label>
      {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800" role="alert">{error}</p>}
      <button className="mt-6 w-full rounded-full bg-rose-800 px-6 py-3.5 font-bold text-white transition hover:bg-rose-900 disabled:cursor-wait disabled:opacity-70" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : labels[kind].button}</button>
    </form>
  );
}
