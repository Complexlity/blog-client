import { clsx, type ClassValue } from "clsx";
import dayjs from 'dayjs';
dayjs.extend(relativeTime);
import relativeTime from "dayjs/plugin/relativeTime";
import { twMerge } from "tailwind-merge";
import { PostCategory } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, type = 'relative') {
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

export function getCategoryColor(category: PostCategory | null) {
  switch (category) {
    case "technology":
      return "#2196F3"; // Red color for technology category
    case "advice":
      return "#4CAF50"; // Green color for advice category
    case "general":
      return "#F44336"; // Blue color for general category
    case "stackies":
      return "#FFEB3B"; // Yellow color for stackies category
    default:
      return "gray"; // Black color for unknown category
  }
}
