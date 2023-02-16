import { context } from "@src/common/components";
import { useCallback } from "react";
import { useContextSelector } from "use-context-selector";
const useToTop = () => {
  const toTop = useContextSelector(context, ({ store: { toTop } }) => toTop);
  const ret = useCallback(() => {
    toTop?.();
  }, [toTop]);
  return ret;
};

export default useToTop;
