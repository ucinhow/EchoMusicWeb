import { context } from "@src/common/components";
import { useCallback, useContext } from "react";

const useShowPlayer = () => {
  const { setStore } = useContext(context);
  const show = useCallback(() => {
    setStore?.({ showPlayer: true });
  }, [setStore]);
  const hide = useCallback(() => {
    setStore?.({ showPlayer: false });
  }, [setStore]);
  return [show, hide];
};
export default useShowPlayer;
