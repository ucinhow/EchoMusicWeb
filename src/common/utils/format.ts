import { format } from "date-fns";

const format2Num = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const formatUpdateTime = (ts: number) => format(new Date(ts), "M月d日");

export const formatDuration = (s: number) => {
  const minute = Math.floor(s / 60);
  const seconds = s % 60;
  return `${format2Num(minute)}:${format2Num(seconds)}`;
};

export const formatPublicTime = (ts: number) =>
  format(new Date(ts), "Y年M月d日");
