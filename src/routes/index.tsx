import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plane,
  Ship,
  Truck,
  ShieldCheck,
  Clock,
  Globe2,
  Headset,
  Search,
  Mail,
  Phone,
  MapPin,
  PackageCheck,
} from "lucide-react";

import { HeroBackground } from "@/components/HeroBackground";
import logoUrl from "@/assets/logo-emblem.png";
import maerskLogo from "@/assets/partners/maersk.svg";
import hapagLogo from "@/assets/partners/hapag-lloyd.svg";
import dhlLogo from "@/assets/partners/dhl.svg";
import upsLogo from "@/assets/partners/ups.svg";
import fedexLogo from "@/assets/partners/fedex.svg";
import dpWorldLogo from "@/assets/partners/dp-world.svg";
import airImg from "@/assets/air.jpg";
import oceanImg from "@/assets/ocean.jpg";
import roadImg from "@/assets/road.jpg";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "1HALIQ Shipping & Logistics | Air, Ocean & Road Freight" },
      {
        name: "description",
        content:
          "1HALIQ Shipping & Logistics moves cargo worldwide by air, ocean and road. Connecting Worlds. Delivering Trust.",
      },
      { property: "og:title", content: "1HALIQ Shipping & Logistics" },
      {
        property: "og:description",
        content:
          "Global air, ocean and road freight with live shipment visibility. Connecting Worlds. Delivering Trust.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SALES_EMAIL = "Sales@1haliq.com";

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    img: airImg,
    alt: "Cargo aircraft being loaded at dawn",
    copy: "Time-critical consignments moved on priority and consolidated air services to over 120 airports.",
    points: ["Next-flight-out", "Charter & AOG", "Temperature-controlled"],
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    img: oceanImg,
    alt: "Stacked blue shipping containers at an ocean terminal",
    copy: "FCL and LCL sailings on trusted carrier alliances, with port-to-door coordination handled end to end.",
    points: ["FCL & LCL", "Breakbulk & project cargo", "Customs clearance"],
  },
  {
    icon: Truck,
    title: "Road Freight",
    img: roadImg,
    alt: "Freight truck on a highway at dusk",
    copy: "Regional trucking and last-mile distribution that keeps the final leg as reliable as the first.",
    points: ["FTL & LTL", "Cross-border haulage", "Last-mile delivery"],
  },
];

const reasons = [
  { icon: Globe2, title: "Global Network", copy: "Agents and partners across 60+ countries on every major trade lane." },
  { icon: Clock, title: "On-Time Discipline", copy: "98.4% of managed shipments delivered within the committed window." },
  { icon: ShieldCheck, title: "Cargo Protection", copy: "Full insurance options, compliant documentation and secure handling." },
  { icon: Headset, title: "One Point of Contact", copy: "A named coordinator per account, reachable 24/7 through the journey." },
];

const partners = [
  { name: "Maersk", logo: maerskLogo },
  { name: "Hapag-Lloyd", logo: hapagLogo },
  { name: "DHL", logo: dhlLogo },
  { name: "UPS", logo: upsLogo },
  { name: "FedEx", logo: fedexLogo },
  { name: "DP World", logo: dpWorldLogo },
];

function Index() {
  const [tracking, setTracking] = useState("");
  const [trackResult, setTrackResult] = useState<string | null>(null);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 md:flex md:justify-between md:gap-6">
          <a href="#top" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <img src={logoUrl} alt="1HALIQ Shipping & Logistics logo" className="h-10 w-auto shrink-0 object-contain sm:h-12" width={64} height={48} />
            <span className="min-w-0 leading-tight">
              <span className="block font-display text-base font-extrabold tracking-tight text-primary sm:text-lg">1HALIQ</span>
              <span className="block truncate text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-royal sm:text-[0.62rem] sm:tracking-[0.2em]">Shipping &amp; Logistics</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-base font-semibold text-foreground/70 md:flex">
            <a href="#services" className="transition-colors hover:text-royal">Services</a>
            <a href="#why" className="transition-colors hover:text-royal">Why us</a>
            <a href="#track" className="transition-colors hover:text-royal">Track</a>
            <a href="#about" className="transition-colors hover:text-royal">About</a>
          </nav>
          <a
            href="#contact"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded bg-royal px-3.5 text-sm font-bold text-royal-foreground transition-colors hover:bg-primary sm:px-5 sm:text-base"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Request a quote</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* Landing: hero + collaborations fill the first screen */}
        <div className="flex min-h-[calc(100svh-4.1rem)] flex-col sm:min-h-[calc(100svh-4.6rem)]">
        <section className="relative isolate flex flex-1 items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/80" />
          <HeroBackground />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-12 sm:px-5 sm:pb-16 sm:pt-12">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground/75 sm:text-xs sm:tracking-[0.32em]">
              Connecting Worlds. Delivering Trust.
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-primary-foreground sm:mt-5 sm:text-4xl md:text-5xl">
              Freight that arrives when you said it would.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:mt-4 sm:text-base">
              1HALIQ Shipping &amp; Logistics plans, moves and clears cargo by air, ocean and road — with one coordinator accountable from pickup to delivery.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
              <a href="#track" className="inline-flex min-h-11 items-center justify-center rounded bg-royal px-6 py-3 text-sm font-semibold text-royal-foreground transition-colors hover:bg-background hover:text-primary">
                Track a shipment
              </a>
              <a href="#services" className="inline-flex min-h-11 items-center justify-center rounded border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10">
                Our services
              </a>
            </div>
            <dl className="mt-7 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-4 border-t border-primary-foreground/20 pt-5 sm:mt-8 sm:gap-6 sm:pt-5 sm:grid-cols-4">
              {[
                ["60+", "Countries served"],
                ["120+", "Airports covered"],
                ["98.4%", "On-time rate"],
                ["24/7", "Shipment support"],
              ].map(([value, label]) => (
                <div key={label} className="min-w-0">
                  <dt className="font-display text-xl font-bold text-primary-foreground sm:text-2xl">{value}</dt>
                  <dd className="mt-1 text-[0.68rem] uppercase tracking-wider text-primary-foreground/65 sm:text-xs">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

          {/* Collaborations */}
          <section id="partners" className="bg-white py-6 sm:py-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-5">
              <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-royal sm:text-xs sm:tracking-[0.28em]">Collaborations</p>
              <ul className="mt-4 grid grid-cols-3 items-center gap-x-4 gap-y-3 sm:mt-5 lg:grid-cols-6">
                {partners.map((p) => (
                  <li key={p.name} className="flex h-10 items-center justify-center sm:h-12">
                    <img src={p.logo} alt={p.name} className="max-h-6 w-auto max-w-[6.5rem] object-contain sm:max-h-9 sm:max-w-[8.5rem]" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:py-28">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-royal sm:text-xs sm:tracking-[0.28em]">Shipping services</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
            Three modes, one accountable operation.
          </h2>
          <div className="mt-8 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
                <img src={s.img} alt={s.alt} loading="lazy" width={1024} height={768} className="h-40 w-full object-cover sm:h-48" />
                <div className="p-5 sm:p-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-secondary text-royal">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="min-w-0 font-display text-lg font-bold tracking-tight sm:text-xl">{s.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                  <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <PackageCheck className="h-4 w-4 shrink-0 text-royal" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Why choose us */}
        <section id="why" className="bg-secondary py-14 sm:py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-royal sm:text-xs sm:tracking-[0.28em]">Why choose us</p>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
              Logistics judged on what actually lands.
            </h2>
            <div className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {reasons.map((r) => (
                <div key={r.title} className="rounded-lg border border-border bg-card p-5 sm:p-6">
                  <r.icon className="h-6 w-6 text-royal" aria-hidden="true" />
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tracking */}
        <section id="track" className="bg-primary py-14 sm:py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:gap-10 sm:px-5 md:grid-cols-2 md:items-center">
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70 sm:text-xs sm:tracking-[0.28em]">Shipment tracking</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
                Where is my cargo right now?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/75">
                Enter a booking or AWB number for a status snapshot. This is a demo tracker — live tracking connects to our operations system on request.
              </p>
            </div>
            <form
              className="min-w-0 rounded-lg bg-card p-5 shadow-lg sm:p-6"
              onSubmit={(e) => {
                e.preventDefault();
                setTrackResult(
                  tracking.trim()
                    ? `Demo status for ${tracking.trim().toUpperCase()}: In transit — departed Jebel Ali, ETA in 6 days.`
                    : "Please enter a tracking number.",
                );
              }}
            >
              <label htmlFor="tracking" className="text-sm font-semibold">Tracking number</label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="tracking"
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value)}
                  placeholder="e.g. HLQ-4820193"
                  className="h-11 w-full min-w-0 rounded border border-input bg-background px-3 text-base outline-none focus:border-royal focus:ring-2 focus:ring-royal/30 sm:text-sm"
                />
                <button type="submit" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded bg-royal px-5 text-sm font-semibold text-royal-foreground transition-colors hover:bg-primary">
                  <Search className="h-4 w-4" aria-hidden="true" /> Track
                </button>
              </div>
              {trackResult && (
                <p className="mt-4 rounded border border-border bg-secondary px-3 py-2.5 text-sm text-foreground/80">{trackResult}</p>
              )}
            </form>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-14 sm:px-5 sm:py-20 md:py-28">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2 md:items-center">
            <img src={aboutImg} alt="Logistics team checking shipment paperwork in a warehouse" loading="lazy" width={1200} height={900} className="h-56 w-full rounded-lg border border-border object-cover sm:h-auto" />
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-royal sm:text-xs sm:tracking-[0.28em]">About 1HALIQ</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
                Built on paperwork done right and promises kept.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                We are a freight forwarding and logistics team serving importers, exporters and manufacturers who cannot afford surprises. Every booking is planned against real carrier capacity, documented properly for customs, and monitored until it is signed for.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                That discipline is what our tagline means: Connecting Worlds. Delivering Trust.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Licensed freight forwarder", "Customs documentation in-house", "Cargo insurance arranged", "Transparent all-in quotes"].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-foreground/80">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-royal" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-secondary py-14 sm:py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:gap-12 sm:px-5 md:grid-cols-2">
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-royal sm:text-xs sm:tracking-[0.28em]">Contact</p>
              <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">Tell us what needs moving.</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                Share the route, commodity and timeline and we will come back with an all-in rate and transit time.
              </p>
              <ul className="mt-6 space-y-1 text-sm sm:mt-8">
                <li><a href="mailto:Sales@1haliq.com" className="flex min-h-11 items-center gap-3 break-all hover:text-royal"><Mail className="h-4 w-4 shrink-0 text-royal" aria-hidden="true" /> Sales@1haliq.com</a></li>
                <li><a href="tel:+971541398983" className="flex min-h-11 items-center gap-3 hover:text-royal"><Phone className="h-4 w-4 shrink-0 text-royal" aria-hidden="true" /> +971 54 139 8983</a></li>
                <li className="flex items-start gap-3 py-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-royal" aria-hidden="true" /> Emirates NBD Building - Al Sabkha - Dubai - United Arab Emirates</li>
              </ul>
            </div>
            <form
              className="min-w-0 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                setContactStatus("sending");
                try {
                  const res = await fetch(`https://formsubmit.co/ajax/${SALES_EMAIL}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify({
                      _subject: "New quote enquiry — 1HALIQ website",
                      _template: "table",
                      _captcha: "false",
                      ...Object.fromEntries(new FormData(form)),
                    }),
                  });
                  if (!res.ok) throw new Error(String(res.status));
                  form.reset();
                  setContactStatus("sent");
                } catch {
                  setContactStatus("error");
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Full name" />
                <Field id="email" label="Email" type="email" />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field id="origin" label="Origin" />
                <Field id="destination" label="Destination" />
              </div>
              <div className="mt-4">
                <label htmlFor="details" className="text-sm font-semibold">Shipment details</label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  required
                  className="mt-2 w-full min-w-0 rounded border border-input bg-background px-3 py-2.5 text-base outline-none focus:border-royal focus:ring-2 focus:ring-royal/30 sm:text-sm"
                  placeholder="Commodity, weight, dimensions, preferred mode and timing"
                />
              </div>
              <button type="submit" disabled={contactStatus === "sending"} className="mt-5 min-h-11 w-full rounded bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-royal disabled:opacity-60">
                {contactStatus === "sending" ? "Sending…" : "Send enquiry"}
              </button>
              {contactStatus === "sent" && (
                <p className="mt-4 text-sm text-royal">Thanks — your enquiry has been sent. Our sales team will be in touch shortly.</p>
              )}
              {contactStatus === "error" && (
                <p className="mt-4 text-sm text-destructive">Something went wrong sending your enquiry. Please email {SALES_EMAIL} directly.</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-primary py-10 text-primary-foreground sm:py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:gap-6 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <img src={logoUrl} alt="1HALIQ Shipping & Logistics logo" loading="lazy" width={58} height={44} className="h-11 w-auto shrink-0 rounded bg-white object-contain p-0.5" />
            <div className="min-w-0">
              <p className="font-display text-sm font-extrabold tracking-tight sm:text-base">1HALIQ Shipping &amp; Logistics</p>
              <p className="text-[0.6rem] uppercase tracking-[0.14em] text-primary-foreground/65 sm:text-xs sm:tracking-[0.2em]">Connecting Worlds. Delivering Trust.</p>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/60">© {new Date().getFullYear()} 1HALIQ Shipping &amp; Logistics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="mt-2 h-11 w-full min-w-0 rounded border border-input bg-background px-3 text-base outline-none focus:border-royal focus:ring-2 focus:ring-royal/30 sm:text-sm"
      />
    </div>
  );
}
