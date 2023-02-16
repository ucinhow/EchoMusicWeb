import { useAsideBtn } from "./useAsideBtn";
import { useEffect } from "react";
import { AsideBtnKey, SetState, Source } from "@src/common/typings";
import { SOURCE } from "@src/common/constants";
import { useSetTransSrc } from "@src/common/hooks/setContext";
export const useTransferSrc = (
  src: Source,
  setSrc: SetState<Source>,
  extraOpt?: VoidFunction
) => {
  const setTransSrc = useSetTransSrc();
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
    setTransSrc(() => {
      setSrc(newSrc);
      extraOpt?.();
    });
  }, [src]);
};
