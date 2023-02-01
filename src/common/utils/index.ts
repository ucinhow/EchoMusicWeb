export const composeClass = (...classes: (string | undefined)[]) =>
  classes.filter((cls) => cls !== undefined && cls !== "").join(" ");

export * from "./format";
export * from "./nec";
