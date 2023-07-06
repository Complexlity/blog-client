import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, type = 'relative') {
  if (type === 'full') {
    const newdate = new Date(date)
    return newdate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
    return dayjs(date).fromNow();
}


export function calculateTimeToReadPost(content: string) {
  const wordsPerMinute = 200;
const wordCount = content.split(" ").length;
const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}
