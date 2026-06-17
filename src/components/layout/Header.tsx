"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { company } from "@/lib/data/company";
import { telUrl, waGeneralUrl } from "@/lib/utils/whatsapp";

const nav = [
  { href: "/", label: "হোম" },
  { href: "/packages", label: "প্যাকেজ" },
  { href: "/packages?season=bumper", label: "অফার" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/contact", label: "যোগাযোগ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-gradient-to-b from-black/50 to-transparent py-4"
      )}
    >
      <div className="container-px flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight">
          <span
            className={cn(
              "font-display text-xl font-bold sm:text-2xl",
              scrolled ? "text-indigo-brand" : "text-white"
            )}
          >
            Howladar
          </span>
          <span
            className={cn(
              "font-bengali text-[10px] sm:text-xs",
              scrolled ? "text-saffron" : "text-saffron"
            )}
          >
            ট্যুর এন্ড ট্রাভেলস
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "font-bengali text-sm font-medium transition-colors hover:text-saffron",
                scrolled ? "text-ink" : "text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telUrl}
            className="hidden items-center gap-1.5 rounded-full bg-indigo-brand px-4 py-2 text-sm font-semibold text-white sm:inline-flex"
          >
            <Phone size={16} /> {company.phones[0]}
          </a>
          <a
            href={waGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white sm:inline-flex"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
          <button
            aria-label="মেনু"
            onClick={() => setOpen(true)}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full lg:hidden",
              scrolled ? "text-ink" : "text-white"
            )}
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-indigo-brand text-white lg:hidden"
          >
            <div className="container-px flex items-center justify-between py-4">
              <span className="font-display text-2xl font-bold">Howladar</span>
              <button
                aria-label="বন্ধ করুন"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full"
              >
                <X size={28} />
              </button>
            </div>
            <nav className="container-px flex flex-1 flex-col justify-center gap-2">
              {nav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-white/15 py-4 font-bengali text-2xl font-medium"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-px flex gap-3 pb-10">
              <a href={telUrl} className="btn-indigo flex-1 bg-white !text-indigo-brand">
                <Phone size={18} /> কল করুন
              </a>
              <a
                href={waGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-saffron flex-1 bg-[#25D366]"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
