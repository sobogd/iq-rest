import Image from "next/image";

export function Founder() {
  return (
    <section className="border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center max-w-4xl mx-auto">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-[10px] font-medium uppercase tracking-widest text-primary mb-3">
              Built by a restaurant owner
            </p>
            <p className="text-base sm:text-lg font-medium tracking-tight leading-snug mb-4">
              &ldquo;My wife and I opened a café and spent weeks looking for a system that
              could handle online orders, reservations and actually look modern. Everything
              we tried was clunky, ugly, or missing half the features we needed —{" "}
              <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                so we built the one we wished existed.
              </span>
              &rdquo;
            </p>
            <p className="text-xs text-muted-foreground">
              Bogdan Sokolov · founder, ex-café owner
            </p>
          </div>

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0 mx-auto lg:mx-0 order-1 lg:order-2">
            <Image
              src="/contacts.webp"
              alt="Bogdan, founder of IQ Rest"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
