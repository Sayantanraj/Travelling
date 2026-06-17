"use client";
import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { PRIMARY_PHONE } from "@/lib/utils/whatsapp";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tour, setTour] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Howladar Tours — নতুন অনুসন্ধান\n` +
      `নাম: ${name}\nফোন: ${phone}\n` +
      (tour ? `প্যাকেজ: ${tour}\n` : "") +
      (msg ? `বার্তা: ${msg}` : "");
    window.open(
      `https://wa.me/${PRIMARY_PHONE}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const field =
    "mt-1 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 font-bengali text-ink outline-none focus:border-indigo-brand";

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-brand">
      <h3 className="font-bengali text-xl font-bold text-ink">অনুসন্ধান পাঠান</h3>
      <p className="font-bengali text-sm text-ink/60">ফর্মটি WhatsApp এ পাঠানো হবে</p>

      <div className="mt-5 space-y-4">
        <label className="block font-bengali text-sm font-medium text-ink/70">
          আপনার নাম
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} required placeholder="নাম লিখুন" />
        </label>
        <label className="block font-bengali text-sm font-medium text-ink/70">
          ফোন নম্বর
          <input className={field} value={phone} onChange={(e) => setPhone(e.target.value)} required type="tel" inputMode="tel" placeholder="১০ সংখ্যার নম্বর" />
        </label>
        <label className="block font-bengali text-sm font-medium text-ink/70">
          পছন্দের প্যাকেজ (ঐচ্ছিক)
          <input className={field} value={tour} onChange={(e) => setTour(e.target.value)} placeholder="যেমন: কাশ্মীর, পুরী" />
        </label>
        <label className="block font-bengali text-sm font-medium text-ink/70">
          বার্তা (ঐচ্ছিক)
          <textarea className={field} value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder="আপনার প্রশ্ন লিখুন" />
        </label>
      </div>

      <button type="submit" className="btn-saffron mt-5 w-full bg-[#25D366]">
        <MessageCircle size={18} /> WhatsApp এ পাঠান <Send size={16} />
      </button>
    </form>
  );
}
