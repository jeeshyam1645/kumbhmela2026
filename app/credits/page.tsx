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
        The Swiss Cottage and EP Tent photographs are the camp owner&apos;s own pictures. The Swiss Cottage video tour was taken for this camp. The Deluxe Tent card uses a photograph of tents at the 2019 Prayagraj Kumbh Mela. That picture was resized and saved as WebP.
      </p>
      <h2 className="mt-8 font-serif text-2xl">Swiss Cottage</h2>
      <p className="mt-2 text-sm">
        The camp owner&apos;s photographs of the Swiss Cottage tent. The main picture shows the tents along a walkway. The interiors show a double bed, several single beds, and a double bed in a room with blue walls.
      </p>
      <h2 className="mt-8 font-serif text-2xl">Deluxe Tent</h2>
      <p className="mt-2 text-sm">
        Ninara, <cite>Kumbh Mela tents, Prayagraj, 2019</cite>.{" "}
        <a className="underline" href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.{" "}
        <a className="underline" href="https://commons.wikimedia.org/wiki/File:Kumbh_Mela_2019,_January_15_-_March_4_(33383307738).jpg">Source</a>.
      </p>
      <h2 className="mt-8 font-serif text-2xl">EP Tent</h2>
      <p className="mt-2 text-sm">
        The camp owner&apos;s photographs: the yellow and white tent, floor bedding with a gadda, pillow and blanket, and takht beds for a family.
      </p>
    </article>
  );
}
