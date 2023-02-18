import { useLocation as useRouterLocation } from "react-router-dom";
import { Source } from "@src/common/typings";

export interface LocationState {
  id: string;
  src: Source;
}

export const useLocation = () => {
  const { state } = useRouterLocation();
  const { id, src } = state as LocationState;
  return { id, src };
};
