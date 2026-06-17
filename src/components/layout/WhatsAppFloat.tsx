"use client";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { waGeneralUrl } from "@/lib/utils/whatsapp";

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waGeneralUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp এ যোগাযোগ করুন"
      className={`fixed bottom-20 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-brand-lg transition-all duration-300 lg:bottom-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
      }`}
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-saffron" />
      <MessageCircle size={28} className="relative" />
    </a>
  );
}
