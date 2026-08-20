import Image from "next/image";
import Link from "next/link";
import SubscriptionInput from "./SubscriptionInput";

const columns = [
  { title: "Services", links: [["Personalised exercise", "/exercise"], ["Care homes", "/care-homes"], ["Workplace wellbeing", "/workplace-wellbeing"], ["Ongoing support", "/ongoing-support"], ["Community sessions", "/community-sessions"]] },
  { title: "Explore", links: [["About Sharon", "/about"], ["Pricing", "/pricing"], ["Resources", "/resources"], ["Support", "/support"], ["Contact", "/contact"]] },
  { title: "Legal", links: [["Privacy policy", "/privacy"], ["Terms", "/legal/terms"], ["Medical disclaimer", "/medical-disclaimer"], ["Accessibility", "/accessibility"]] },
];

export default function Footer() {
  return (
    <footer className="bg-[#211817] text-white">
      <div className="site-container grid gap-12 py-16 lg:grid-cols-[1.35fr_2fr]">
        <div>
          <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-md">
            <span className="relative h-12 w-14 overflow-hidden rounded-xl bg-white"><Image src="/logo.jpg" alt="" fill sizes="56px" className="object-contain" /></span>
            <span className="text-2xl font-black">ThrivBeats</span>
          </Link>
          <p className="mt-5 max-w-md text-base leading-7 text-white/70">Personalised exercise prescription and ongoing support, delivered remotely worldwide and extended into care homes, workplaces and communities in Scotland.</p>
          <div className="mt-7 max-w-md"><p className="mb-3 text-sm font-bold">Useful guidance, thoughtfully shared.</p><SubscriptionInput /></div>
        </div>
        <div className="grid gap-9 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-red-300">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map(([label, href]) => <li key={href}><Link href={href} className="focus-ring rounded text-sm text-white/70 hover:text-white">{label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10"><div className="site-container flex flex-col gap-3 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} ThrivBeats. All rights reserved.</p><p>Remote support worldwide · On-site services in Scotland</p></div></div>
    </footer>
  );
}
