import Image from "next/image";
import Link from "next/link";
import LeadForm from "./LeadForm";

export default function ServicePage({ eyebrow, title, intro, image, imageAlt, kind, outcomes, process, children }) {
  const schema = { "@context": "https://schema.org", "@type": "Service", name: title, provider: { "@type": "Organization", name: "ThrivBeats", url: "https://www.thrivbeats.com" }, areaServed: kind === "ASSESSMENT" ? "Worldwide" : ["Scotland", "Worldwide"], description: intro };
  return <main id="main-content">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="overflow-hidden bg-[#f8f2eb] py-16 sm:py-24"><div className="site-container grid items-center gap-10 lg:grid-cols-2"><div><p className="eyebrow">{eyebrow}</p><h1 className="mt-4 text-4xl font-black tracking-tight text-stone-950 sm:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">{intro}</p><a href="#enquire" className="mt-8 inline-flex rounded-full bg-rose-800 px-6 py-3.5 font-bold text-white hover:bg-rose-900">Start a conversation</a></div><div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]"><Image src={image} alt={imageAlt} fill priority className="object-cover" sizes="(min-width:1024px) 45vw, 100vw" /></div></div></section>
    <section className="section-space"><div className="site-container"><p className="eyebrow">What this can help with</p><div className="mt-7 grid gap-4 md:grid-cols-3">{outcomes.map((item) => <article key={item} className="rounded-2xl border border-stone-200 bg-white p-6"><h2 className="text-xl font-bold text-stone-950">{item}</h2></article>)}</div></div></section>
    <section className="section-space bg-stone-950 text-white"><div className="site-container"><p className="eyebrow !text-rose-300">How it works</p><div className="mt-7 grid gap-6 md:grid-cols-3">{process.map((item, index) => <article key={item.title}><span className="text-sm font-black text-rose-300">0{index + 1}</span><h2 className="mt-2 text-2xl font-bold">{item.title}</h2><p className="mt-3 leading-7 text-stone-300">{item.text}</p></article>)}</div></div></section>
    {children}
    <section id="enquire" className="section-space bg-[#f8f2eb]"><div className="site-container grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="eyebrow">Your next step</p><h2 className="mt-4 text-3xl font-black text-stone-950 sm:text-4xl">Tell us what support would be useful</h2><p className="mt-4 leading-7 text-stone-700">We’ll listen first, explain the options clearly and recommend only what fits. No obligation.</p><p className="mt-5 text-sm text-stone-600">Remote support is available worldwide. On-site delivery is based in Scotland.</p></div><LeadForm kind={kind} /></div></section>
    <section className="bg-rose-900 py-10 text-white"><div className="site-container flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center"><p className="text-xl font-bold">Looking for ongoing independent access?</p><Link href="/pricing" className="rounded-full bg-white px-5 py-3 font-bold text-rose-900">Compare monthly plans</Link></div></section>
  </main>;
}
