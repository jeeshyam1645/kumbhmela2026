import { pageMeta } from "@/lib/site";

export const metadata = pageMeta(
  "Photo credits | Magh Mela Stays",
  "Photographers and licences for tent photos that are not pictures of this camp.",
  "/credits",
);

export default function CreditsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="font-serif text-4xl">Photo credits</h1>
      <p className="mt-4 text-ink/75">
        The Swiss Cottage photographs are the camp owner&apos;s own pictures of that tent. The video tour was taken for this camp. The Deluxe Tent and Dormitory cards use photographs of tents at the 2019 Prayagraj Kumbh Mela. Those two pictures were resized and saved as WebP.
      </p>
      <h2 className="mt-8 font-serif text-2xl">Swiss Cottage</h2>
      <p className="mt-2 text-sm">
        The camp owner&apos;s photographs of the Swiss Cottage tent: the walkway at night, the row of tents outside, a double bed with floral blankets, an interior with several beds, and a tent with a double bed.
      </p>
      <h2 className="mt-8 font-serif text-2xl">Deluxe Tent</h2>
      <p className="mt-2 text-sm">
        Ninara, <cite>Kumbh Mela tents, Prayagraj, 2019</cite>.{" "}
        <a className="underline" href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.{" "}
        <a className="underline" href="https://commons.wikimedia.org/wiki/File:Kumbh_Mela_2019,_January_15_-_March_4_(33383307738).jpg">Source</a>.
      </p>
      <h2 className="mt-8 font-serif text-2xl">Dormitory</h2>
      <p className="mt-2 text-sm">
        Ninara, <cite>Pilgrims&apos; tents, Prayagraj Kumbh Mela, 2019</cite>.{" "}
        <a className="underline" href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.{" "}
        <a className="underline" href="https://commons.wikimedia.org/wiki/File:Kumbh_Mela_2019,_January_15_-_March_4_(33383311278).jpg">Source</a>.
      </p>
    </article>
  );
}
