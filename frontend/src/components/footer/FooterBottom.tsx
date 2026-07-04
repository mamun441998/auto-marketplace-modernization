import Link from "next/link";

export default function FooterBottom() {
  return (
    <div className="border-t border-[#1e2a4a] py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#94a3b8]">
        
        <p>© {new Date().getFullYear()} MotoHave. All rights reserved.</p>

        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>

      </div>
    </div>
  );
}