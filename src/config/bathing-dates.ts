/**
 * Magh Mela 2027 bathing dates, as announced by the Prayagraj Mela Authority
 * (reported by Hindustan Times and Dainik Jagran, 2 Aug 2026).
 * Moves to an admin-editable table in Part 2.
 */
export type BathingDate = {
  date: string;
  nameEn: string;
  nameHi: string;
  importance: "high" | "highest";
};

export const bathingDates: BathingDate[] = [
  { date: "2027-01-15", nameEn: "Makar Sankranti", nameHi: "मकर संक्रांति", importance: "high" },
  { date: "2027-01-22", nameEn: "Paush Purnima", nameHi: "पौष पूर्णिमा", importance: "high" },
  { date: "2027-02-06", nameEn: "Mauni Amavasya", nameHi: "मौनी अमावस्या", importance: "highest" },
  { date: "2027-02-11", nameEn: "Basant Panchami", nameHi: "बसंत पंचमी", importance: "high" },
  { date: "2027-02-20", nameEn: "Maghi Purnima", nameHi: "माघी पूर्णिमा", importance: "high" },
  { date: "2027-03-06", nameEn: "Maha Shivratri", nameHi: "महाशिवरात्रि", importance: "highest" },
];
