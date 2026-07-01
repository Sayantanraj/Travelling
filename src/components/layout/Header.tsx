"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, MessageCircle, Home, Map, Flame, Info, Mail, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { company } from "@/lib/data/company";
import { telUrl, waGeneralUrl } from "@/lib/utils/whatsapp";

const nav = [
  { href: "/", label: "হোম", icon: Home },
  { href: "/packages", label: "প্যাকেজ", icon: Map },
  { href: "/offers", label: "অফার", icon: Flame },
  { href: "/about", label: "আমাদের সম্পর্কে", icon: Info },
  { href: "/contact", label: "যোগাযোগ", icon: Mail },
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
          <>
            {/* transparent-black backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
            />
            {/* right-side drawer (≈60% width) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex h-[100dvh] w-[72%] min-w-[260px] max-w-xs flex-col overflow-hidden bg-gradient-to-b from-indigo-brand via-[#16306f] to-[#0b1a45] text-white shadow-2xl lg:hidden"
            >
              {/* decorative glow */}
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-saffron/25 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-teal-brand/20 blur-3xl" />

              {/* header */}
              <div className="relative flex items-start justify-between px-5 pt-5">
                <div>
                  <span className="font-display text-2xl font-bold leading-none">Howladar</span>
                  <p className="mt-1 font-bengali text-xs tracking-wide text-saffron">
                    ট্যুর এন্ড ট্রাভেলস
                  </p>
                </div>
                <button
                  aria-label="বন্ধ করুন"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 transition hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* anniversary chip */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="relative mx-5 mt-4 rounded-xl border border-saffron/30 bg-saffron/10 px-3 py-2 font-bengali text-xs text-saffron"
              >
                🪔 ২১তম বর্ষপূর্তি স্পেশাল · গিফট ভাউচার
              </motion.div>

              {/* nav */}
              <nav className="relative flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 py-5">
                {nav.map((item, i) => {
                  const active = pathname === item.href.split("?")[0] && !item.href.includes("?");
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl px-3 py-3 font-bengali text-base font-medium transition-all",
                          active ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10"
                        )}
                      >
                        <span
                          className={cn(
                            "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors",
                            active ? "bg-saffron text-white" : "bg-white/10 text-saffron"
                          )}
                        >
                          <Icon size={18} />
                        </span>
                        <span className="flex-1">{item.label}</span>
                        <ChevronRight
                          size={16}
                          className="text-white/40 transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* footer CTAs */}
              <div className="relative border-t border-white/10 bg-black/10 px-5 pb-7 pt-4">
                <p className="mb-2 font-bengali text-[11px] uppercase tracking-wider text-white/50">
                  সরাসরি যোগাযোগ
                </p>
                <div className="flex flex-col gap-2">
                  <a href={telUrl} className="btn-indigo w-full bg-white !text-indigo-brand">
                    <Phone size={18} /> কল করুন
                  </a>
                  <a
                    href={waGeneralUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-saffron w-full bg-[#25D366]"
                  >
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
