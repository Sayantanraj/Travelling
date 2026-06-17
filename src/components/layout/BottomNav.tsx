"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Flame, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { telUrl, waGeneralUrl } from "@/lib/utils/whatsapp";

const items = [
  { href: "/", label: "হোম", icon: Home },
  { href: "/packages", label: "প্যাকেজ", icon: Map },
  { href: "/packages?season=bumper", label: "অফার", icon: Flame },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 backdrop-blur-md pb-safe lg:hidden">
      <div className="grid grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href.split("?")[0] && !href.includes("?");
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 font-bengali text-[11px]",
                active ? "text-indigo-brand" : "text-ink/60"
              )}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
        <a
          href={telUrl}
          className="flex flex-col items-center justify-center gap-0.5 py-2 font-bengali text-[11px] text-indigo-brand"
        >
          <Phone size={20} />
          কল
        </a>
        <a
          href={waGeneralUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 py-2 font-bengali text-[11px] text-[#25D366]"
        >
          <MessageCircle size={20} />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
