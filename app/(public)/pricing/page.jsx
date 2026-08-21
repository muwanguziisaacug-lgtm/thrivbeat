import Link from "next/link";
import CheckoutButton from "./CheckoutButton";
export const metadata = {
  title: "Pricing",
  description:
    "Choose Basic, Standard or Premium monthly exercise support from ThrivBeats.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    key: "BASIC",
    name: "Basic",
    price: "£10",
    description:
      "A simple way to keep moving with guided resources whenever you need them.",
    services: [
      "Exercise library access",
      "Guided exercise videos",
      "Practical movement resources",
    ],
  },
  {
    key: "STANDARD",
    name: "Standard",
    price: "£39",
    description:
      "Build consistency with encouragement and support as your goals develop.",
    services: [
      "Everything in Basic",
      "Heart to Heart encouragement",
      "Review and progression support",
    ],
    featured: true,
  },
  {
    key: "PREMIUM",
    name: "Premium",
    price: "£50",
    description:
      "More personalised guidance for people who want regular structure and accountability.",
    services: [
      "Everything in Standard",
      "Personalised exercise plans",
      "Regular progress check-ins",
    ],
  },
];

export default function Page() {
  return (
    <main id="main-content" className="bg-[#f8f2eb]">
      <section className="section-space">
        <div className="site-container text-center">
          <p className="eyebrow">Simple, transparent support</p>
          <h1 className="mt-4 text-4xl font-black sm:text-6xl">
            Choose your monthly plan
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-stone-700">
            Start with the level of exercise access and human support that fits
            you now. You can change direction as your needs change.
          </p>
        </div>
      </section>
      <section className="pb-24">
        <div className="site-container grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.key}
              className={
                plan.featured
                  ? "relative rounded-3xl bg-stone-950 p-7 text-white ring-2 ring-rose-700"
                  : "rounded-3xl border border-stone-200 bg-white p-7"
              }
            >
              {plan.featured && (
                <p className="absolute right-7 top-7 text-sm font-black uppercase tracking-widest text-rose-300">
                  Most popular choice
                </p>
              )}
              <p
                className={
                  plan.featured
                    ? "text-sm font-black uppercase tracking-widest text-rose-300"
                    : "eyebrow"
                }
              >
                {plan.name}
              </p>
              <h2 className="mt-3 text-3xl font-black">{plan.name} monthly</h2>
              <p
                className={
                  plan.featured
                    ? "mt-4 text-5xl font-black"
                    : "mt-4 text-5xl font-black text-stone-950"
                }
              >
                {plan.price}
                <span
                  className={
                    plan.featured
                      ? "text-base font-medium text-stone-300"
                      : "text-base font-medium text-stone-500"
                  }
                >
                  {" "}/ month
                </span>
              </p>
              <p
                className={
                  plan.featured
                    ? "my-6 min-h-20 text-stone-300"
                    : "my-6 min-h-20 text-stone-600"
                }
              >
                {plan.description}
              </p>
              <ul
                className={
                  plan.featured
                    ? "mb-8 space-y-3 text-stone-200"
                    : "mb-8 space-y-3 text-stone-700"
                }
              >
                {plan.services.map((service) => (
                  <li key={service} className="flex gap-3">
                    <span className="font-bold text-rose-700">+</span>
                    {service}
                  </li>
                ))}
              </ul>
              <CheckoutButton plan={plan.key} featured={plan.featured} />
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-stone-200 bg-white py-16">
        <div className="site-container grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">Need a starting point?</p>
            <h2 className="mt-3 text-3xl font-black text-stone-950">
              Begin with a personalised assessment
            </h2>
            <p className="mt-4 max-w-xl text-stone-600">
              We can help you understand the right exercise route before you
              choose ongoing support.
            </p>
            <Link
              href="/exercise#assessment"
              className="mt-6 inline-flex rounded-full border border-rose-800 px-5 py-3 font-bold text-rose-800"
            >
              Request an assessment
            </Link>
          </div>
          <div>
            <p className="eyebrow">For organisations</p>
            <h2 className="mt-3 text-3xl font-black text-stone-950">
              Support for care homes, communities and workplaces
            </h2>
            <p className="mt-4 max-w-xl text-stone-600">
              Organisational programmes are tailored around your setting, goals
              and delivery needs.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-rose-800 px-5 py-3 font-bold text-white"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
