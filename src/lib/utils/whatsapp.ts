export const PRIMARY_PHONE = "919123861588";

export const waUrl = (packageTitle: string) =>
  `https://wa.me/${PRIMARY_PHONE}?text=${encodeURIComponent(
    `Howladar Tours — "${packageTitle}" সম্পর্কে বিস্তারিত জানতে চাই। দয়া করে যোগাযোগ করুন।`
  )}`;

export const waGeneralUrl = () =>
  `https://wa.me/${PRIMARY_PHONE}?text=${encodeURIComponent(
    `Howladar Tour & Travels — ভ্রমণ প্যাকেজ সম্পর্কে জানতে চাই। দয়া করে যোগাযোগ করুন।`
  )}`;

export const telUrl = "tel:+919123861588";

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");
