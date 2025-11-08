"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// AboutUs.jsx
// Pure Next.js (App Router) compatible React component using Tailwind CSS + Framer Motion.
// Drop into /app/components/AboutUs.jsx and import into a page (e.g. /app/about/page.jsx).

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 md:grid-cols-2 items-center"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              ThrivBeats
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-700">
              Stay active, strong and confident — from the comfort of your home.
              Clinically-informed cardiac exercise, personalised plans and ongoing support.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/login"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-white font-semibold shadow-lg hover:scale-[1.01] transform transition"
              >
                Join ThrivBeats
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50"
              >
                Contact us
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatItem label="Weekly classes" value="Pre-recorded + Live" />
              <StatItem label="Support" value="Remote + In-person" />
              <StatItem label="Check-ins" value="Every 2 weeks" />
              <StatItem label="Lead" value="Sharon Jakisa" />
            </div>
          </div>

          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/comm.jpg"
              alt="Group doing gentle exercise"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </motion.div>

        {/* What we offer */}
        <section className="mt-16">
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold"
          >
            What we offer
          </motion.h2>

          <div className="mt-6 grid gap-6 md:grid-cols-4">
            <OfferCard
              title="Tailored weekly classes"
              desc={`Pre-recorded and live weekly cardiac exercise classes — chair-based or standing — tailored to your abilities and goals.`}
            />

            <OfferCard
              title="Exercise prescriptions"
              desc={`Clear, easy-to-follow exercise prescriptions with short demonstration videos so you can practise safely at home.`}
            />
            <OfferCard
              title="Sports Massage Therapist"
              desc={`Clear, easy-to-follow exercise prescriptions with short demonstration videos so you can practise safely at home.`}
            />

            <OfferCard
              title="Ongoing support"
              desc={`Remote support via phone and Zoom, plus optional in-person sessions focusing on functional strength, balance and flexibility.`}
            />
          </div>
        </section>

        {/* Who we support */}
        <section className="mt-16">
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-bold"
          >
            Who we support
          </motion.h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold">Ideal participants</h3>
              <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                <li>People looking to exercise safely at home with professional supervision.</li>
                <li>Participants doing gentle to varied-intensity workouts (low to high).</li>
                <li>Individuals stable on current medications with no recent changes.</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold">Conditions we commonly work with</h3>
              <ul className="mt-3 space-y-2 text-gray-700 list-disc list-inside">
                <li>COPD, hypertension, asthma, diabetes</li>
                <li>Osteoporosis, arthritis, obesity</li>
                <li>Anxiety, depression and other long-term conditions (clinician-supervised)</li>
                <li className="font-semibold text-sm text-amber-700">Not suitable for unstable heart conditions.</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Approach & Mission */}
        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold"
            >
              Our approach
            </motion.h2>
            <p className="mt-4 text-gray-700">
              Clinically guided, evidence-based sessions that are safe, structured and progressive. We tailor movement plans to each participant to rebuild confidence, strength and resilience.
            </p>

            <ul className="mt-6 grid gap-3">
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span>Personalised exercise prescriptions with video guidance.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span>Regular check-ins every two weeks to track progress.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span>Holistic support focusing on both physical and mental wellbeing.</span>
              </li>
            </ul>
          </div>

          <div>
            <motion.h2 initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold">
              Our mission
            </motion.h2>
            <p className="mt-4 text-gray-700">
              More than fitness — ThrivBeats empowers you with clinically-informed cardiac exercise plans so you can understand and take control of your heart health.
            </p>

            <div className="mt-6">
              <blockquote className="rounded-lg border-l-4 border-teal-400 bg-white p-4 shadow-sm">
                <p className="text-sm text-gray-700">“We aim to complement existing healthcare services and help reduce readmission rates — not replace medical treatment.”</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mt-16">
          <motion.h2 initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold">
            Meet the team
          </motion.h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <TeamCard
              name="Sharon Jakisa"
              title="Specialist Cardiac Exercise Instructor"
              bio="Lead clinician and specialist cardiac exercise instructor with experience delivering safe, progressive exercise programmes."
              src='/ceo.jpg'
            />

            <TeamCard 
              name="Volunteer Team" 
              title="Trained Volunteers" 
              bio="Support the delivery of classes and provide check-in support to participants."
              src='/comm.jpg'
              />

            <TeamCard 
              name="Clinical Advisors" 
              title="Healthcare Partners" 
              bio="Provide clinical oversight and assist with participant triage and safety protocols." 
              src='/ceo.jpg'
              />
          </div>
        </section>

        {/* Disclaimer & CTA */}
        <section className="mt-16 mb-24 grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-lg font-semibold">Important disclaimer</h3>
            <p className="mt-3 text-gray-700">
              ThrivBeats complements healthcare services (including NHS) and is not a replacement for medical treatment. Participants should continue to follow their healthcare provider's advice. A PAR-Q form and clearance from a healthcare provider will be requested before enrollment.
            </p>
          </div>

          <div id="contact" className="text-right">
            <a href="/login" className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-white font-semibold shadow-lg">
              Register now
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}

/* --- Small helper components --- */
function StatItem({ label, value }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}

function OfferCard({ title, desc }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-xl bg-white p-6 shadow hover:shadow-md"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-gray-600">{desc}</p>
    </motion.article>
  );
}

function Card({ children }) {
  return <div className="rounded-xl bg-white p-6 shadow">{children}</div>;
}

function TeamCard({ name, title, bio, src }) {
  return (
    <div className="rounded-xl bg-white p-6 text-center shadow">
      <div className=" relative mx-auto mb-4 h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {/* placeholder avatar - replace with Image if you have photos */}
        <Image 
          src={src}
          fill
          alt="name"
          className="object-cover"
        />
        {/* <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#CBD5E1" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z" fill="#E6E6E6" />
        </svg> */}
      </div>
      <h4 className="text-md font-semibold">{name}</h4>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-3 text-sm text-gray-600">{bio}</p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.414a1 1 0 011.414-1.414l4.243 4.243 6.657-6.657a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}
