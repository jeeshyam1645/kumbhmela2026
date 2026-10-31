import { Helmet } from "react-helmet-async";
import { OG_IMAGE_PATH, SITE_NAME, absoluteUrl } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function Seo({
  title,
  description,
  path,
  jsonLd,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  jsonLd?: JsonLd[];
  noindex?: boolean;
}) {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(OG_IMAGE_PATH);
  const fullTitle = title.includes("Magh Mela") ? title : `${title} | ${SITE_NAME}`;
  const graph = jsonLd
    ? { "@context": "https://schema.org", "@graph": jsonLd }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Magh Mela 2026, Kumbh Mela, Prayagraj camp booking, Sangam accommodation, Swiss Cottage, Deluxe Tent"
      />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      {graph ? (
        <script type="application/ld+json">{JSON.stringify(graph)}</script>
      ) : null}
    </Helmet>
  );
}
