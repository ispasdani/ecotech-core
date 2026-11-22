import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#111111] px-6 py-24 text-[#FCF7F3]">
      <div className="max-w-xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF6A3A]">
          Error 404
        </span>
        <h1 className="font-heading mt-4 text-5xl font-medium tracking-[-0.05em] text-white sm:text-7xl">
          Route not found
        </h1>
        <p className="mt-5 text-base leading-relaxed text-neutral-400">
          The page you requested does not exist or has moved. Explore our
          services, proprietary platforms, or return to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rr-btn rr-btn-light">
            <span className="btn-wrap">
              <span className="text-one">Back to Home</span>
              <span className="text-two">Back to Home</span>
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link href="/products" className="rr-btn rr-btn-outline-light">
            <span className="btn-wrap">
              <span className="text-one">View Products</span>
              <span className="text-two">View Products</span>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
