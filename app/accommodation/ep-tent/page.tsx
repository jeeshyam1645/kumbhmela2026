import { EpTentStay } from "@/components/EpTentStay";
import { epTentPhotos } from "@/lib/media";
import { listCamps } from "@/lib/queries";
import { EP_SHARED_NAME, EP_SHARED_PRICE, pageMeta, site } from "@/lib/site";

const description = "EP tent near Sangam for Magh Mela 2027: a shared floor dormitory with gadda, pillow and blanket, or the whole tent for one family with takht beds.";
const image = `${site.url}${epTentPhotos.sharedExterior.webp}`;

export const metadata = pageMeta("EP Tent | Magh Mela Stays", description, "/accommodation/ep-tent", image);

export default async function EpTentPage({ searchParams }: { searchParams: Promise<{ option?: string }> }) {
  const params = await searchParams;
  const initial = params.option === "family" ? "family" : "shared";
  const { camps } = await listCamps();
  const shared = camps.find((camp) => camp.nameEn === EP_SHARED_NAME || camp.nameEn.toLowerCase() === "dormitory");
  const sharedPrice = shared && shared.price > 0 ? shared.price : EP_SHARED_PRICE;
  return <EpTentStay initial={initial} sharedPrice={sharedPrice} />;
}
