import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

/**
 * Combines Tailwind classes conditionally
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }
  return format(date, "MMMM d, yyyy");
}

/**
 * Formats price with Indian currency format (e.g., ₹1,25,000)
 */
export function formatIndianPrice(price: number): string {
  return price.toLocaleString('en-IN');
}

/**
 * Format property price with appropriate suffixes (Cr, Lakh, etc.)
 */
export function formatPropertyPrice(price: number, priceUnit: string | null = "₹", suffix: string | null = ""): string {
  if (price >= 10000000) {
    return `${priceUnit}${(price / 10000000).toFixed(2)} Cr${suffix ? ` ${suffix}` : ''}`;
  } else if (price >= 100000) {
    return `${priceUnit}${(price / 100000).toFixed(2)} Lakh${suffix ? ` ${suffix}` : ''}`;
  } else {
    return `${priceUnit}${formatIndianPrice(price)}${suffix ? ` ${suffix}` : ''}`;
  }
}

/**
 * Truncates text with ellipsis if it exceeds maxLength
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Converts a property type to a more readable format (e.g., "commercial" -> "Commercial")
 */
export function formatPropertyType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

/**
 * Formats a listing status to a readable format (e.g., "for_sale" -> "For Sale")
 */
export function formatListingStatus(status: string): string {
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
