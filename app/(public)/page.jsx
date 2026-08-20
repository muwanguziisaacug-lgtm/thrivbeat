import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Check, HeartHandshake, Home, Laptop, PlayCircle, ShieldCheck, Users } from "lucide-react";

export const metadata = {
  title: "Personalised Exercise Prescription & Remote Support",
  description: "Personalised, clinically informed exercise programmes with clear video guidance and ongoing remote support. Available worldwide, with on-site services in Scotland.",
  alternates: { canonical: "/" },
};

const pathways = [
  { icon: Home, label: "For individuals", title: "A programme designed around you", text: "Start with an online consultation, then receive a clear exercise prescription, demonstration videos and support at home.", href: "/exercise", cta: "Get started" },
  { icon: Building2, label: "For care homes", title: "Structured resources for residents and staff", text: "Give support workers practical exercise resources, guidance and the option of ThrivBeats-led sessions in Scotland.", href: "/care-homes", cta: "Explore care-home support" },
  { icon: Laptop, label: "For employers", title: "Movement that fits the working day", text: "ThrivBeats Breaks brings short, accessible movement into meetings and desk-based working without equipment or changing clothes.", href: "/workplace-wellbeing", cta: "Explore workplace wellbeing" },
];

const journey = ["Assess", "Set goals", "Educate", "Prescribe", "Exercise at home", "Support", "Review", "Progress", "Subscription"];

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://www.thrivbeats.com/#organization", name: "ThrivBeats", url: "https://www.thrivbeats.com", logo: "https://www.thrivbeats.com/logo.jpg", founder: { "@type": "Person", name: "Sharon Jakisa" } },
      { "@type": "WebSite", "@id": "https://www.thrivbeats.com/#website", url: "https://www.thrivbeats.com", name: "ThrivBeats", publisher: { "@id": "https://www.thrivbeats.com/#organization" } },
      { "@type": "Service", name: "Personalised exercise prescription", provider: { "@id": "https://www.thrivbeats.com/#organization" }, areaServed: "Worldwide", serviceType: "Remote personalised exercise support" },
    ],
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="relative overflow-hidden bg-[#2a1c1a] text-white">
        <div className="absolute inset-0 opacity-35"><Image src="/02.jpg" alt="" fill priority sizes="100vw" className="object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-r from-[#241716] via-[#241716]/95 to-[#241716]/35" /></div>
        <div className="site-container relative grid min-h-[680px] items-center py-20 lg:grid-cols-[1.1fr_.9fr]">
          <div className="max-w-3xl">
            <p className="eyebrow text-red-300">Personalised · clinically informed · designed around you</p>
            <h1 className="mt-6 text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">Personalised exercise.<br /><span className="text-red-400">Real support.</span><br />Better health.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">We help you understand what exercise is right for you, create a clear programme around your needs, and support you as you build confidence at home.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/exercise#assessment" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-4 font-black text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500">Get your personalised programme <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
              <Link href="/exercise#how-it-works" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur hover:bg-white/15"><PlayCircle className="h-5 w-5" aria-hidden="true" /> See how it works</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-white/70">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-red-300" /> Remote support worldwide</span><span className="flex items-center gap-2"><Check className="h-4 w-4 text-red-300" /> On-site options in Scotland</span><span className="flex items-center gap-2"><Check className="h-4 w-4 text-red-300" /> Your pace, your programme</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#fffaf6]"><div className="site-container"><div className="max-w-3xl"><p className="eyebrow">Three clear ways we can help</p><h2 className="mt-4 text-4xl font-black sm:text-5xl">Choose the pathway that feels like yours</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">One connected approach, adapted for individuals, care teams and employers.</p></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">{pathways.map((pathway, index) => <article key={pathway.href} className={`flex min-h-[360px] flex-col rounded-[2rem] p-8 ${index === 0 ? "bg-[#2a1c1a] text-white" : "bg-white text-[#2a1c1a] shadow-[0_20px_70px_-45px_rgba(66,35,30,.4)] ring-1 ring-black/5"}`}><pathway.icon className={`h-9 w-9 ${index === 0 ? "text-red-400" : "text-red-700"}`} aria-hidden="true" /><p className={`mt-8 text-xs font-black uppercase tracking-[.2em] ${index === 0 ? "text-red-300" : "text-red-700"}`}>{pathway.label}</p><h3 className="mt-3 text-2xl font-black">{pathway.title}</h3><p className={`mt-4 flex-1 leading-7 ${index === 0 ? "text-white/70" : "text-muted-foreground"}`}>{pathway.text}</p><Link href={pathway.href} className="focus-ring mt-7 inline-flex items-center gap-2 rounded-md font-black hover:text-red-600">{pathway.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></article>)}</div></div></section>

      <section id="how-it-works" className="section-space bg-white"><div className="site-container"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="eyebrow">A continuous journey</p><h2 className="mt-4 text-4xl font-black sm:text-5xl">A plan is the beginning, not the hand-off</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">Assessment, education and follow-up work together so your programme can change as you do.</p></div><ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">{journey.map((step, index) => <li key={step} className={`rounded-2xl border p-5 ${index === journey.length - 1 ? "border-red-700 bg-red-700 text-white" : "border-black/8 bg-[#fffaf6]"}`}><span className={`text-xs font-black ${index === journey.length - 1 ? "text-red-100" : "text-red-700"}`}>{String(index + 1).padStart(2, "0")}</span><span className="mt-3 block font-black">{step}</span></li>)}</ol></div></div></section>

      <section className="section-space bg-[#f4e9e2]"><div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center"><div className="relative min-h-[500px] overflow-hidden rounded-[2.5rem]"><Image src="/01.jpg" alt="An exercise professional supporting an older adult during a floor exercise" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div><div><p className="eyebrow">Clear from day one</p><h2 className="mt-4 text-4xl font-black sm:text-5xl">Know what to do, how much to do and when to progress</h2><p className="mt-6 text-lg leading-8 text-muted-foreground">Your digital programme brings the important details together in one place, with demonstrations and guidance you can revisit at home.</p><ul className="mt-8 grid gap-4 sm:grid-cols-2">{["Personalised exercise prescription", "Demonstration videos", "Sets, repetitions and frequency", "Warm-up and intensity guidance", "Weekly support as needed", "Four-weekly Heart to Heart review"].map((item) => <li key={item} className="flex gap-3 rounded-2xl bg-white/75 p-4 font-bold"><ShieldCheck className="h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />{item}</li>)}</ul><Link href="/exercise" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-[#2a1c1a] px-6 py-3 font-black text-white hover:bg-black">Explore personalised exercise <ArrowRight className="h-4 w-4" /></Link></div></div></section>

      <section className="section-space bg-white"><div className="site-container grid gap-6 lg:grid-cols-3"><article className="rounded-[2rem] bg-[#2a1c1a] p-8 text-white lg:col-span-2"><HeartHandshake className="h-9 w-9 text-red-400" /><p className="eyebrow mt-8 text-red-300">Signature support</p><h2 className="mt-3 text-4xl font-black">Heart to Heart, every four weeks</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">A focused review of your progress, confidence, goals, barriers and programme needs. Where appropriate, your prescription is updated so the next step stays realistic.</p><Link href="/ongoing-support" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-md font-black text-red-300 hover:text-white">Discover ongoing support <ArrowRight className="h-4 w-4" /></Link></article><article className="rounded-[2rem] bg-[#fff3ec] p-8"><Users className="h-9 w-9 text-red-700" /><p className="eyebrow mt-8">Also in Scotland</p><h2 className="mt-3 text-3xl font-black">Community sessions</h2><p className="mt-5 leading-7 text-muted-foreground">Accessible group sessions are available for community centres, supported-living settings and local organisations by enquiry.</p><Link href="/community-sessions" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-md font-black text-red-700">Register your interest <ArrowRight className="h-4 w-4" /></Link></article></div></section>

      <section className="section-space bg-[#2a1c1a] text-white"><div className="site-container grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center"><div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2.5rem]"><Image src="/ceo.jpg" alt="Sharon Jakisa, director and founder of ThrivBeats" fill sizes="384px" className="object-cover" /></div><div><p className="eyebrow text-red-300">Grounded in clinical knowledge</p><h2 className="mt-4 text-4xl font-black sm:text-5xl">Exercise support with the individual at its centre</h2><p className="mt-6 text-lg leading-8 text-white/75">Founder Sharon Jakisa brings together experience in cardiac rehabilitation, physiotherapy, exercise prescription and sport. Her cardiac-rehabilitation research has been published through BMJ’s Heart conference abstracts.</p><p className="mt-4 text-sm leading-6 text-white/55">ThrivBeats complements, and does not replace, advice or treatment from your healthcare professionals.</p><Link href="/about" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-black text-[#2a1c1a] hover:bg-red-50">Meet Sharon <ArrowRight className="h-4 w-4" /></Link></div></div></section>

      <section className="section-space bg-red-700 text-white"><div className="site-container text-center"><p className="text-sm font-black uppercase tracking-[.2em] text-red-100">Start with a conversation</p><h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black sm:text-6xl">Tell us what you want exercise to help you do.</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-red-50/85">The short assessment asks about your goals and support preferences—not diagnoses or medications.</p><Link href="/exercise#assessment" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-red-800 hover:bg-red-50">Start your exercise assessment <ArrowRight className="h-5 w-5" /></Link></div></section>
    </main>
  );
}
