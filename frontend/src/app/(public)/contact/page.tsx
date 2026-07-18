export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
        {/* Top badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#171717] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[#FC5E01]" />
          <span className="text-sm font-medium text-white">
            Get in Touch
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Talk to Our <span className="text-[#FC5E01]">Sales Team</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-xl text-lg text-[#94A3B8]">
          Interested in Enterprise or have questions about MotoHave? Reach out
          and our team will get back to you within 24 hours.
        </p>

        {/* CTA button */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="mailto:sales@motohave.com"
            className="inline-flex items-center justify-center rounded-xl bg-[#FC5E01] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#E55A00]"
          >
            Email Sales Team
          </a>
        </div>
      </div>
    </main>
  );
}