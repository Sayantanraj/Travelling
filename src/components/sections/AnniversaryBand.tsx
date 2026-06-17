import { Gift } from "lucide-react";

export default function AnniversaryBand() {
  return (
    <div className="bg-saffron py-3 text-white">
      <div className="container-px flex items-center justify-center gap-3 text-center">
        <Gift size={22} className="shrink-0" />
        <p className="font-bengali text-sm font-semibold sm:text-base">
          ২১তম বর্ষপূর্তি স্পেশাল | প্রতিটি বুকিংয়ে ফ্যামিলি গিফট ব্যাগ উপহার
        </p>
        <Gift size={22} className="shrink-0" />
      </div>
    </div>
  );
}
