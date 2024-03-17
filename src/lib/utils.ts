import { type ClassValue, clsx } from "clsx";
import { randomUUID } from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getItemFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const value = JSON.parse(localStorage.getItem(key)!);
    return value;
  }
  return null;
};

export const storeItemToLocalStorage = (key: string, value: any): boolean => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
  return false;
};

export const truncateText = (text: string, limit: number): string => {
  const truncateText = text.slice(0, limit);
  if (text.length > limit) return truncateText + " ...";
  return truncateText;
};

export const generateUniqueId = (prefix: string) => {
  const random = Math.random().toLocaleString();
  return prefix + random;
};

export const debounce = (func: any, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const formatDate = (isoDate: string) => {
  const date = isoDate.slice(0, isoDate.indexOf("T"));
  const milliseconds = new Date(isoDate).getTime();
  // console.log(Date.now(), milliseconds);

  const minutes = Math.floor((Date.now() - milliseconds) / 60000);
  if (minutes < 1) return "just now";
  else if (minutes >= 1 && minutes < 60) return `${minutes} mins ago`;
  else if (minutes > 60 && minutes < 1440)
    return `${Math.floor(minutes / 60)} hours ago`;
  else return date;
};
