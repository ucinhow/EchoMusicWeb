import { context } from "@src/common/components";
import { useCallback, useContext } from "react";

const useToTop = () => {
  const { toTop } = useContext(context);
  const ret = useCallback(() => {
    toTop?.();
  }, [toTop]);
  return ret;
};

export default useToTop;
