import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Building2 } from "lucide-react";
import { company } from "@/lib/data/company";
import { branchAgents } from "@/lib/data/agents";
import { telUrl, waGeneralUrl } from "@/lib/utils/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-px grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl font-bold">Howladar</h3>
          <p className="font-bengali text-sm text-saffron">{company.nameBn}</p>
          <p className="mt-3 font-bengali text-sm leading-7 text-white/70">
            {company.taglineBn} — {company.taglineEn}
          </p>
          <div className="mt-4 flex items-start gap-2 text-sm text-white/70">
            <MapPin size={18} className="mt-0.5 shrink-0 text-saffron" />
            <span className="leading-6">{company.headOffice}</span>
          </div>
          <div className="mt-2 flex items-start gap-2 text-sm text-white/70">
            <Building2 size={18} className="mt-0.5 shrink-0 text-saffron" />
            <span className="leading-6">শাখা: {company.branch}</span>
          </div>
          <a
            href={`mailto:${company.email}`}
            className="mt-2 flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <Mail size={18} className="text-saffron" /> {company.email}
          </a>
        </div>

        {/* Office phones */}
        <div>
          <h4 className="font-bengali text-lg font-bold">অফিস নম্বর</h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-1 sm:gap-2">
            {company.phones.map((p) => (
              <li key={p}>
                <a
                  href={`tel:+91${p}`}
                  className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-saffron sm:bg-transparent sm:p-0 sm:hover:bg-transparent"
                >
                  <Phone size={15} className="shrink-0 text-saffron" /> {p}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl bg-white/5 p-3">
            <p className="font-bengali text-sm font-semibold text-saffron">
              {company.subBrand}
            </p>
          </div>
        </div>

        {/* Branch agents */}
        <div className="lg:col-span-2">
          <h4 className="font-bengali text-lg font-bold">শাখা এজেন্ট</h4>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {branchAgents.map((a) => (
              <a
                key={a.phone}
                href={`tel:+91${a.phone}`}
                className="flex flex-col rounded-lg bg-white/5 px-2.5 py-2 transition-colors hover:bg-white/10"
              >
                <span className="truncate font-bengali text-xs">
                  <span className="font-semibold">{a.cityBn}</span>
                  <span className="text-white/60"> · {a.name}</span>
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-sm font-medium text-saffron">
                  <Phone size={13} className="shrink-0" /> {a.phone}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="font-bengali text-xs text-white/50">
            © {new Date().getFullYear()} {company.nameEn}. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-3">
            <a href={telUrl} className="btn-indigo px-5 py-2 text-sm">
              <Phone size={16} /> কল করুন
            </a>
            <a
              href={waGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-saffron bg-[#25D366] px-5 py-2 text-sm"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
