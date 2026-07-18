import { ReactNode } from "react";
import clsx from "clsx";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={clsx(
        `
        relative
        mx-auto
        w-full

        max-w-[1600px]

        px-5
        sm:px-6
        md:px-8
        lg:px-10
        xl:px-12
        2xl:px-14
        `,
        className
      )}
    >
      {children}
    </div>
  );
}