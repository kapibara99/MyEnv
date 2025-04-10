import Link from "next/link";

export default function Header() {
  return (
    <header className="text-center p-4 shadow-md">
      <h1 className="text-3xl font-bold text-base-strong">
        <Link href="/">MANDALA CHART GENERATOR</Link>
      </h1>
    </header>
  );
}
