import Container from "@/components/layout/Container";

import FAQHeader from "./FAQHeader";
import FAQList from "./FAQList";

export default function FAQSection() {
  return (
    <section className="relative overflow-hidden bg-[#101828] py-24 lg:py-32">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-28 -right-24 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Subtle Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <Container>
          <FAQHeader />
          <FAQList />
        </Container>
      </div>
    </section>
  );
}