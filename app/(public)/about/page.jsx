import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "About Sharon and ThrivBeats",
  description:
    "Meet Sharon Jakisa and learn why ThrivBeats combines personalised exercise, education and real human support.",
  alternates: { canonical: "/about" },
};
export default function Page() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sharon Jakisa",
    jobTitle: "Founder of ThrivBeats",
    worksFor: { "@type": "Organization", name: "ThrivBeats" },
  };
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <section className="section-space bg-[#f8f2eb]">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">About ThrivBeats</p>
            <h1 className="mt-4 text-4xl font-black sm:text-6xl">
              Exercise with the heart at the centre
            </h1>
            <p className="mt-6 text-lg leading-8 text-stone-700">
              ThrivBeats brings together assessment, education, personalised
              exercise prescription and ongoing encouragement so people can move
              with greater confidence.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
            <Image
              src="/ceo.jpg"
              alt="Sharon Jakisa, founder of ThrivBeats"
              fill
              priority
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Meet the founder</p>
            <h2 className="mt-4 text-3xl font-black">Sharon Jakisa</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-stone-700">
            <p>
              A former competitive British sprinter, Sharon turned her own
              experience of sports injury into a career helping others recover
              safely. As a BACPR-trained Cardiac Exercise Specialist, she
              founded ThrivBeats to make personalised, clinically informed
              exercise support feel practical, understandable and human.
            </p>
            <p>
              ThrivBeats complements your ongoing medical care — working
              alongside GPs, healthcare practitioners, care homes and clinical
              establishments to support post-discharge recovery through safe,
              supervised guidance, for people medically cleared for exercise,
              including those with stable, managed conditions.
            </p>
            <p>
              Sharon is lead author of a systematic review published in Heart
              (BMJ), which found high-quality evidence that structured exercise,
              education and medical risk management reduce hospital readmissions
              in heart failure patients. ThrivBeats does not claim that this
              research proves a particular programme outcome.
            </p>
            <p>
              We publish qualifications, professional registrations and research
              identifiers only when they have been verified.
            Please contact us if you need further professional information before choosing a service.
            </p>
            <div className="flex w-full justify-center items-center p-4 ">
              <Link href="/contact">
                <Button className="p-7 text-[1.2rem]">
                  <span>Book a free initial conversation with Sharon</span>
                  <Send />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
