/** Home page photos and text. Becomes editable from the admin in Part 4. */

const cloudinary = "https://res.cloudinary.com/dh7bx2qib/image/upload";

export type HeroSlide = {
  image: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
};

export const heroSlides: HeroSlide[] = [
  {
    image: `${cloudinary}/v1766417368/WhatsApp_Image_2025-12-20_at_12.41.46_PM_xyhvwm.jpg`,
    titleEn: "The Sacred Beginning",
    titleHi: "पवित्र शुभारंभ",
    subtitleEn: "Continuing our family's tradition of performing the Bhumi Pujan for the Mela grounds",
    subtitleHi: "मेला क्षेत्र के भूमि पूजन की पारिवारिक परंपरा का निर्वहन करते हुए आचार्य गण",
  },
  {
    image: `${cloudinary}/v1766427144/WhatsApp_Image_2025-12-22_at_11.30.40_PM_pztjau.jpg`,
    titleEn: "Praying for Everyone's Safety",
    titleHi: "सर्वजन हिताय: सुरक्षा और शांति की प्रार्थना",
    subtitleEn: "Seeking divine blessings for a safe Mela alongside the Administration & Police force",
    subtitleHi: "मेला प्रशासन और पुलिस के साथ मिलकर निर्विघ्न आयोजन हेतु वैदिक प्रार्थना",
  },
  {
    image: `${cloudinary}/v1766055846/knocksense_2025-01-13_jcozh2xg_manoj-chhabra-81_bi4x8l.avif`,
    titleEn: "Your Sanctuary at Sangam",
    titleHi: "संगम तट पर आपका आध्यात्मिक घर",
    subtitleEn: "A quiet, safe space to rest after your holy dip",
    subtitleHi: "स्नान के बाद विश्राम के लिए एक शांत और सुरक्षित स्थान",
  },
];

export const acharyaPhoto = `${cloudinary}/v1766414799/WhatsApp_Image_2025-12-21_at_10.57.45_PM_kndk1l.jpg`;
