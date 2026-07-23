import { solutions } from "@/config/solutions";
import SolutionPage from "../[slug]/page";

export default async function Page() {
  return SolutionPage({
    params: Promise.resolve({
      slug: "inventory",
    }),
  });
}