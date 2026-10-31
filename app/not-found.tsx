import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-32 text-center">
      <h1 className="font-serif text-4xl">Page not found</h1>
      <p className="mt-3 text-ink/70">That address is not on this site.</p>
      <Link className="btn-primary mt-6" href="/">Magh Mela camp home</Link>
    </div>
  );
}
