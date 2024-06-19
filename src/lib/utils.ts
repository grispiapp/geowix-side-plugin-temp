import { type ClassValue, clsx } from "clsx";
import { formatDistance as baseFormatDistance } from "date-fns";
import { tr } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistance(date: string) {
  return baseFormatDistance(new Date(date), new Date(), {
    addSuffix: true,
    locale: tr,
  });
}
