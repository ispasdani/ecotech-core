import { RxButton, RxUnderlineLink } from "@/components/sections/rx-blocks";

export default function NotFound() {
  return (
    <main className="section-dark flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <span className="text-[18px] text-[#999999]">
          (404)
        </span>
        <h1 className="rx-section-title mt-6">
          Route not found
        </h1>
        <p className="mt-5 text-base leading-relaxed text-neutral-400">
          The page you requested does not exist or has moved. Explore our
          services, proprietary platforms, or return to the homepage.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          <RxButton href="/">Back to home</RxButton>
          <RxUnderlineLink href="/products">View platforms</RxUnderlineLink>
        </div>
      </div>
    </main>
  );
}
