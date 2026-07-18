"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

export default function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: FAQItemProps) {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.35,
      }}
      className={`
        overflow-hidden
        rounded-2xl
        border
        shadow-lg
        transition-all
        duration-300

        ${
          isOpen
            ? "border-orange-500 bg-[#1B2A49] shadow-orange-500/10"
            : "border-[#2B3A5B] bg-[#16213E] hover:border-orange-400/60 hover:shadow-xl"
        }
      `}
    >
      {/* Question */}

      <button
        onClick={onClick}
        className="
          flex
          w-full
          items-center
          justify-between
          px-6
          py-5
          text-left
        "
      >
        <h3 className="pr-6 text-base font-semibold text-white lg:text-lg">
          {question}
        </h3>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            transition-all

            ${
              isOpen
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                : "border border-orange-500/30 bg-orange-500/15 text-orange-400 hover:bg-orange-500 hover:text-white"
            }
          `}
        >
          {isOpen ? (
            <Minus size={18} />
          ) : (
            <Plus size={18} />
          )}
        </motion.div>
      </button>

      {/* Answer */}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <div className="border-t border-[#2B3A5B] px-6 py-5">
              <p className="text-sm leading-7 text-slate-300">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}