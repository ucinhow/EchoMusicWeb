import { useLocation as useRouterLocation } from "react-router-dom";
import { SongItem } from "@src/common/typings";
import { PLAYSOURCE } from "@src/common/constants";
export type LocationState = SongItem;

export const useLocation = () => {
  const { state } = useRouterLocation();
  const item = state as LocationState;
  const src = PLAYSOURCE.find((src) => item[src] !== undefined);
  const id = src ? item[src]?.id : undefined;
  return { item, src, id };
};
