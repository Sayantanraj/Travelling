import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { destImages } from "@/lib/data/images";
import { company } from "@/lib/data/company";
import { telUrl, waGeneralUrl } from "@/lib/utils/whatsapp";
import { FadeIn } from "@/components/animations/FadeIn";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20">
      <Image src={destImages.andaman} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 to-indigo-brand/80" />

      <div className="container-px relative z-10 text-center text-white">
        <FadeIn>
          <h2
            className="mx-auto max-w-2xl font-bengali font-bold leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)" }}
          >
            আপনার পরবর্তী ভ্রমণ আজই বুক করুন
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-bengali text-white/80">
            ৩০ সেকেন্ডে WhatsApp বা ফোনে যোগাযোগ করুন। আমাদের টিম আপনাকে
            সেরা প্যাকেজটি বেছে দিতে সাহায্য করবে।
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-saffron bg-[#25D366] text-base"
            >
              <MessageCircle size={20} /> WhatsApp এ মেসেজ
            </a>
            <a href={telUrl} className="btn-outline text-base">
              <Phone size={20} /> {company.phones[0]}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-bengali text-sm text-white/70">
            {company.phones.map((p) => (
              <a key={p} href={`tel:+91${p}`} className="hover:text-saffron">
                {p}
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
