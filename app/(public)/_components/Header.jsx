"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { UserDropDown } from "./UserDropDown";

const navigation = [
  { name: "Personalised Exercise", href: "/exercise" },
  { name: "Care Homes", href: "/care-homes" },
  { name: "Workplace Wellbeing", href: "/workplace-wellbeing" },
  { name: "Ongoing Support", href: "/ongoing-support" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fffaf6]/95 backdrop-blur-xl">
      <a href="#main-content" className="focus-ring absolute left-4 top-2 z-[60] -translate-y-20 rounded-md bg-black px-4 py-2 text-white focus:translate-y-0">
        Skip to content
      </a>
      <div className="site-container flex min-h-20 items-center justify-between gap-5">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-3 rounded-md" aria-label="ThrivBeats home">
          <span className="relative h-11 w-12 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
            <Image src="/logo.jpg" alt="" fill sizes="48px" className="object-contain" priority />
          </span>
          <span className="text-xl font-black tracking-tight text-[#231b1a]">ThrivBeats</span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-md text-sm font-semibold text-[#4c403d] transition hover:text-red-700">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session ? <UserDropDown session={session} /> : (
            <Link href="/login" className="focus-ring rounded-full px-4 py-2 text-sm font-bold text-[#4c403d] hover:bg-black/5">Sign in</Link>
          )}
          <Link href="/exercise#assessment" className="focus-ring rounded-full bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-800">
            Get your programme
          </Link>
        </div>

        <button type="button" className="focus-ring rounded-full border border-black/10 p-3 xl:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-[#fffaf6] xl:hidden">
          <nav className="site-container grid gap-1 py-5" aria-label="Mobile navigation">
            <Link href="/" onClick={() => setOpen(false)} className="focus-ring rounded-lg px-3 py-3 font-semibold hover:bg-white">Home</Link>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="focus-ring rounded-lg px-3 py-3 font-semibold hover:bg-white">{item.name}</Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="focus-ring rounded-lg px-3 py-3 font-semibold hover:bg-white">Contact</Link>
            <Link href="/exercise#assessment" onClick={() => setOpen(false)} className="focus-ring mt-3 rounded-full bg-red-700 px-5 py-3 text-center font-bold text-white">Get your programme</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
