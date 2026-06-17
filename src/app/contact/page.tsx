import type { Metadata } from "next";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";
import { company } from "@/lib/data/company";
import { branchAgents } from "@/lib/data/agents";
import ContactForm from "@/components/contact/ContactForm";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "যোগাযোগ",
  description: "হাওলাদার ট্যুর এন্ড ট্রাভেলস — হেড অফিস শেওড়াফুলি, হুগলি। সব ফোন নম্বর, ৮টি শাখা এজেন্ট ও ম্যাপ।",
};

export default function ContactPage() {
  return (
    <div className="bg-cream pt-24">
      <div className="container-px py-8">
        <FadeIn>
          <h1 className="font-bengali text-3xl font-bold text-ink sm:text-4xl">যোগাযোগ করুন</h1>
          <p className="mt-1 font-bengali text-ink/60">আমরা সবসময় আপনার সেবায় প্রস্তুত</p>
        </FadeIn>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Left: info */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-brand">
              <h3 className="font-bengali text-lg font-bold text-ink">হেড অফিস</h3>
              <div className="mt-3 flex items-start gap-2 font-bengali text-ink/75">
                <MapPin size={18} className="mt-0.5 shrink-0 text-saffron" />
                {company.headOffice}
              </div>
              <div className="mt-2 flex items-start gap-2 font-bengali text-ink/75">
                <Building2 size={18} className="mt-0.5 shrink-0 text-saffron" />
                শাখা: {company.branch}
              </div>
              <a href={`mailto:${company.email}`} className="mt-2 flex items-center gap-2 font-bengali text-ink/75 hover:text-indigo-brand">
                <Mail size={18} className="text-saffron" /> {company.email}
              </a>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-brand">
              <h3 className="font-bengali text-lg font-bold text-ink">অফিস নম্বর</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {company.phones.map((p) => (
                  <a key={p} href={`tel:+91${p}`} className="flex items-center gap-2 rounded-lg bg-cream px-3 py-2 font-bengali text-sm text-ink hover:bg-saffron/10">
                    <Phone size={15} className="text-saffron" /> {p}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-brand">
              <h3 className="font-bengali text-lg font-bold text-ink">শাখা এজেন্ট</h3>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {branchAgents.map((a) => (
                  <a key={a.phone} href={`tel:+91${a.phone}`} className="flex items-center justify-between rounded-lg bg-cream px-3 py-2 transition hover:bg-saffron/10">
                    <span className="font-bengali text-sm">
                      <span className="font-bold text-ink">{a.cityBn}</span>
                      <br /><span className="text-xs text-ink/55">{a.name}</span>
                    </span>
                    <span className="flex items-center gap-1 font-bengali text-sm text-indigo-brand">
                      <Phone size={14} /> {a.phone}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form + map */}
          <div className="space-y-6">
            <ContactForm />
            <div className="overflow-hidden rounded-2xl shadow-brand">
              <iframe
                title="Howladar HQ map"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(company.hqMapsQuery)}&output=embed`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
