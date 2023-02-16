import { useSetAsideBtns } from "@src/common/hooks/setContext";
import { AsideBtnKey } from "@src/common/typings";

export const useAsideBtn = () => {
  const setAsideBtns = useSetAsideBtns();
  const add = (btnKey: AsideBtnKey) => {
    setAsideBtns(btnKey, true);
  };
  const remove = (btnKey: AsideBtnKey) => {
    setAsideBtns(btnKey, false);
  };

  return [add, remove];
};
