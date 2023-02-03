import { useAsideBtn } from "./useAsideBtn";
import { useContext, useEffect } from "react";
import { AsideBtnKey, SetState, Source } from "@src/common/typings";
import { context } from "@src/common/components";
import { SOURCE } from "@src/common/constants";
export const useTransferSrc = (
  src: Source,
  setSrc: SetState<Source>,
  extraOpt?: VoidFunction
) => {
  const { setStore } = useContext(context);
  const [add, remove] = useAsideBtn();
  useEffect(() => {
    add(AsideBtnKey.transferSrc);
    return () => {
      remove(AsideBtnKey.transferSrc);
    };
  }, [add, remove]);
  useEffect(() => {
    const index = SOURCE.indexOf(src);
    const newSrc = SOURCE[(index + 1) % SOURCE.length];
    setStore?.({
      transSrc: () => {
        setSrc(newSrc);
        extraOpt?.();
      },
    });
  }, [setStore, src]);
};
