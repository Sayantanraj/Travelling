"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Map, ChevronDown } from "lucide-react";
import { heroMontage, heroVideo } from "@/lib/data/images";
import { trustStats } from "@/lib/data/company";
import { CountUp } from "@/components/animations/CountUp";
import { waGeneralUrl } from "@/lib/utils/whatsapp";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <section className="relative flex h-[100svh] min-h-[600px] flex-col items-center justify-center overflow-hidden">
      {/* Ken-Burns image montage (guaranteed background) */}
      <div className="absolute inset-0">
        {heroMontage.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 animate-[fade_24s_linear_infinite]"
            style={{ animationDelay: `${i * 6}s`, opacity: i === 0 ? 1 : 0 }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="animate-ken-burns object-cover"
            />
          </div>
        ))}
      </div>

      {/* Single looping sea video — hides on error and reveals the montage. */}
      {videoOk && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroMontage[0]}
          onError={() => setVideoOk(false)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

      {/* Content */}
      <div className="container-px relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="rounded-full glass px-4 py-1.5 font-bengali text-sm font-medium text-white"
        >
          🪔 ২১তম বর্ষপূর্তি স্পেশাল · ২০২৬–২৭
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.18 }}
          className="mt-5 font-bengali font-bold leading-tight text-white"
          style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
        >
          ভ্রমণের ২১ বছরের বিশ্বাস
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.26 }}
          className="mt-4 max-w-2xl font-bengali text-base text-white/85 sm:text-lg"
        >
          কাশ্মীর থেকে কন্যাকুমারী, আন্দামান থেকে অরুণাচল — পরিবারের সাথে
          নিশ্চিন্ত ভ্রমণের ৫০+ প্যাকেজ। প্রতিটি বুকিংয়ে ফ্যামিলি গিফট ভাউচার।
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.34 }}
          className="mt-7 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href={waGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-saffron bg-[#25D366] text-base"
          >
            <MessageCircle size={20} /> WhatsApp এ বুকিং
          </a>
          <Link href="/packages" className="btn-outline text-base">
            <Map size={20} /> সব প্যাকেজ দেখুন
          </Link>
        </motion.div>
      </div>

      {/* Trust strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.5 }}
        className="absolute bottom-8 z-10 w-full px-4"
      >
        <div className="container-px">
          <div className="mx-auto flex max-w-2xl items-center justify-around rounded-2xl glass py-3 text-white">
            {trustStats.map((s) => (
              <div key={s.labelBn} className="text-center">
                <div className="text-2xl font-extrabold sm:text-3xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="font-bengali text-xs text-white/80">{s.labelBn}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-white/60">
        <ChevronDown className="animate-bounce" size={22} />
      </div>

      <style jsx>{`
        @keyframes fade {
          0%, 25% { opacity: 1; }
          33%, 92% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
