import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

export function formatYear(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric'
  }).format(new Date(date));
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function splitVenueHighlight(venue?: string): { prefix: string; highlight: string } {
  if (!venue) return { prefix: '', highlight: '' };
  const idx = venue.lastIndexOf('(');
  if (idx === -1) return { prefix: venue, highlight: '' };
  return { prefix: venue.slice(0, idx), highlight: venue.slice(idx) };
}