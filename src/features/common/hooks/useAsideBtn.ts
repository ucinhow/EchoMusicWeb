import { context } from "@src/common/components";
import { AsideBtnKey } from "@src/common/typings";
import { useContext, useCallback } from "react";

export const useAsideBtn = () => {
  const { setStore } = useContext(context);
  const add = useCallback(
    (btnKey: AsideBtnKey) => {
      setStore?.((pre) => ({
        asideButtons: { ...pre.asideButtons, [btnKey]: true },
      }));
    },
    [setStore]
  );
  const remove = useCallback(
    (btnKey: AsideBtnKey) => {
      setStore?.((pre) => ({
        asideButtons: { ...pre.asideButtons, [btnKey]: false },
      }));
    },
    [setStore]
  );

  return [add, remove];
};
