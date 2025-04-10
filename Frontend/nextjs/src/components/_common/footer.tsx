import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full text-center mt-30 py-10">
      <div className="flex justify-center gap-5 mb-2">
        <a className="underline hover:text-attention" href="https://forms.gle/Bcv8mHhJvipuBhd18" target="_blank" rel="noopener">
          お問い合わせ
        </a>
        <Link className="underline hover:text-attention" href="kiyaku">
          利用規約
        </Link>
        <Link className="underline hover:text-attention" href="privacy">
          プライバシーポリシー
        </Link>
      </div>

      <p>Copyright &copy; {`${new Date().getFullYear()}`} kapy</p>
    </footer>
  );
}
