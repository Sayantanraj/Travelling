export type BranchAgent = {
  city: string;
  cityBn: string;
  name: string;
  phone: string;
  // approximate position on the WB SVG map (percentage 0-100)
  x: number;
  y: number;
};

export const branchAgents: BranchAgent[] = [
  { city: "Durgapur", cityBn: "দুর্গাপুর", name: "Uttam Das", phone: "8101455697", x: 28, y: 42 },
  { city: "Kalyani", cityBn: "কল্যাণী", name: "Kanu Das", phone: "9874313600", x: 58, y: 46 },
  { city: "Pakuria", cityBn: "পাকুড়িয়া", name: "Gopal Ghosh", phone: "9836864420", x: 50, y: 30 },
  { city: "Bardhaman", cityBn: "বর্ধমান", name: "Ramkrishna Saha", phone: "7908894003", x: 40, y: 40 },
  { city: "Behala", cityBn: "বেহালা", name: "Kajol Majumder", phone: "7980274474", x: 60, y: 62 },
  { city: "Gangadharpur", cityBn: "গঙ্গাধরপুর", name: "Swapan Adak", phone: "9748823175", x: 52, y: 56 },
  { city: "Baruipur", cityBn: "বারুইপুর", name: "Chandan Das", phone: "9641629748", x: 64, y: 70 },
  { city: "Mosart", cityBn: "মশার্ট", name: "Indrajit Pal", phone: "9382272105", x: 46, y: 66 },
];
