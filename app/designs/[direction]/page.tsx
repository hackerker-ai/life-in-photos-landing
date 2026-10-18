import { notFound } from "next/navigation";
import { Cinema, Gallery, Journal, Scrapbook } from "../../../components/design-directions";

const pages = { journal: Journal, scrapbook: Scrapbook, cinema: Cinema, gallery: Gallery };

export function generateStaticParams() {
  return Object.keys(pages).map((direction) => ({ direction }));
}

export default async function DirectionPage({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  if (!Object.prototype.hasOwnProperty.call(pages, direction)) notFound();
  const Page = pages[direction as keyof typeof pages];
  return <Page />;
}
