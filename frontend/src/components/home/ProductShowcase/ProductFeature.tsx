"use client";

import { motion } from "framer-motion";
import ProductPreview from "./ProductPreview";
import { FeatureItem } from "./types";

type Props = {
  active: FeatureItem;
};

export default function ProductFeature({
  active,
}: Props) {
  return (
    <motion.div
      key={active.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="relative w-full"
    >
      <ProductPreview active={active.id} />
    </motion.div>
  );
}