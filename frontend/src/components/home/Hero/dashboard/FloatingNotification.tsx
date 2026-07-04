"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CarFront, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

const notifications = [
  {
    icon: CarFront,
    title: "New Vehicle Listed",
    subtitle: "Tesla Model Y • Just now",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: UserPlus,
    title: "New Lead Received",
    subtitle: "Michael Johnson • 2 min ago",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: CheckCircle2,
    title: "Vehicle Sold",
    subtitle: "BMW X5 • Completed",
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function FloatingNotification() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % notifications.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const item = notifications[active];
  const Icon = item.icon;

  return (
    <div
      className="
        absolute

        -right-8
        top-10

        z-30

        hidden
        xl:block
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{
            opacity: 0,
            x: 40,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: 40,
            scale: 0.9,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            flex
            items-center
            gap-4

            rounded-2xl

            border
            border-white/70

            bg-white/95
            backdrop-blur-xl

            px-5
            py-4

            shadow-2xl
            shadow-blue-200/40
          "
        >
          {/* Icon */}

          <div
            className={`
              ${item.color}

              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-xl
            `}
          >
            <Icon size={20} />
          </div>

          {/* Text */}

          <div>
            <p className="text-sm font-bold text-slate-900">
              {item.title}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {item.subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}