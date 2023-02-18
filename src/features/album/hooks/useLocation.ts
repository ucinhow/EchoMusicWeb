import { SrcMeta } from "@src/common/typings";
import { useLocation as useRouterLocation } from "react-router-dom";
import { SOURCE } from "@src/common/constants";
export type LocationState = SrcMeta<{ id: string }>;

export const useLocation = () => {
  const { state } = useRouterLocation();
  const item = state as LocationState;
  const src = SOURCE.find((src) => item[src] !== undefined);
  const id = src ? item[src]?.id : undefined;
  return { src, id };
};
