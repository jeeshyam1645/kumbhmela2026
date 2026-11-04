import { cloudinaryUrl } from "@/lib/media";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "About Us | Magh Mela Stays, Prayagraj 2027",
  "Tent and camp stays near the Sangam for Magh Mela 2027 (15 January – 6 March 2027). Hosted by a Prayagraj family, including Acharya Rajendra Mishra.",
  "/about-us",
);

const people = [
  ["Acharya Rajendra Mishra", "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766414799/WhatsApp_Image_2025-12-21_at_10.57.45_PM_kndk1l.jpg"],
  ["Acharya Ratan Mishra", "https://res.cloudinary.com/dh7bx2qib/image/upload/v1766493490/WhatsApp_Image_2025-12-23_at_6.07.41_PM_bzfhtf.jpg"],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-16">
      <h1 className="text-center font-serif text-5xl">Atithi Devo Bhava</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ink/70">Tent and camp stays near the Sangam for Magh Mela 2027, 15 January – 6 March. A Prayagraj family hosts pilgrims, with bedding for the January cold and a guarded compound.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-saffron-dark">Years of service</h2>
          <p className="mt-3 text-ink/75">The family has assisted the Police Pooja at Magh Mela for years. The 2026 Bhumi Pujan for the Reserve Police Line included Shri Jairam Mishra, Rajendra Mishra, and Ratan Mishra, with Police Commissioner Tarun Gauba.</p>
        </div>
        <video
          className="aspect-video w-full rounded-2xl bg-black"
          controls
          preload="none"
          playsInline
          src={cloudinaryUrl("https://res.cloudinary.com/dh7bx2qib/video/upload/v1766509802/WhatsApp_Video_2025-12-22_at_9.01.30_PM_zhdhkk.mp4")}
        />
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {people.map(([name, photo]) => (
          <figure key={name}>
            <img src={cloudinaryUrl(photo)} alt={name} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            <figcaption className="mt-3 text-center font-serif text-2xl">{name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
