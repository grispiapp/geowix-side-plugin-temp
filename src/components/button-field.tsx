import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ButtonHTMLAttributes, FC } from "react";

import { cn } from "@/lib/utils";

type ButtonFieldProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonField: FC<ButtonFieldProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        "flex w-full items-center justify-between rounded bg-white px-3 py-2 shadow",
        className
      )}
    >
      {children}
      <ArrowRightIcon className="size-5 text-slate-600" />
    </button>
  );
};
