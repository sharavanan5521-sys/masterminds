import { NetworkCanvas } from "@/components/motion/network-canvas";
import { Button, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80dvh] place-items-center overflow-hidden bg-navy-950 pt-20 text-center text-white">
      <NetworkCanvas className="-z-10 opacity-60" />
      <Container>
        <p className="font-display text-7xl font-semibold text-gradient sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">This page took a different learning path.</h1>
        <p className="mt-3 text-white/65">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Button href="/" variant="gold" className="mt-8">
          Back to home
        </Button>
      </Container>
    </section>
  );
}
