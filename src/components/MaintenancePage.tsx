import { Mail, Wrench } from "lucide-react";

import logoUrl from "@/assets/logo-emblem.png";

const SALES_EMAIL = "Sales@1haliq.com";

export function MaintenancePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-4 py-10 font-sans text-foreground">
      <div className="w-full max-w-lg rounded-lg border border-border bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
        <img src={logoUrl} alt="1HALIQ Shipping & Logistics logo" width={128} height={97} className="mx-auto h-20 w-auto object-contain sm:h-24" />
        <p className="mt-4 font-display text-lg font-extrabold tracking-tight text-primary">1HALIQ</p>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-royal">Shipping &amp; Logistics</p>

        <span className="mx-auto mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-royal">
          <Wrench className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">We'll be back soon</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Our website is down for scheduled maintenance. For anything urgent, please email us.
        </p>
        <a
          href={`mailto:${SALES_EMAIL}`}
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded bg-royal px-5 text-sm font-semibold text-royal-foreground transition-colors hover:bg-primary"
        >
          <Mail className="h-4 w-4" aria-hidden="true" /> {SALES_EMAIL}
        </a>
        <p className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Connecting Worlds. Delivering Trust.</p>
      </div>
    </main>
  );
}
