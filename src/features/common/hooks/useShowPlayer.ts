import { useSetStore } from "@src/common/hooks";
import { useCallback } from "react";

const useShowPlayer = () => {
  const setStore = useSetStore();
  const show = useCallback(() => {
    setStore?.({ showPlayer: true });
  }, [setStore]);
  const hide = useCallback(() => {
    setStore?.({ showPlayer: false });
  }, [setStore]);
  return [show, hide];
};
export default useShowPlayer;
