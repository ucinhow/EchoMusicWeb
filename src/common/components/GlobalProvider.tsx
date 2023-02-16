import { FC, PropsWithChildren, ReactNode } from "react";
import { SongItem, AsideBtnKey, SetAhookState } from "@src/common/typings";
import { useSetState } from "ahooks";
import { ToastConfig } from "@src/common/components/Toast";
import { createContext } from "use-context-selector";
export type SetStore = SetAhookState<Store>;

export interface Store {
  playlist: Array<SongItem>;
  playIdx: number;
  toastList: ToastConfig[];
  modalContent?: ReactNode;
  asideButtons: Record<AsideBtnKey, boolean>;
  toTop?: VoidFunction;
  showPlayer: boolean;
  transSrc?: VoidFunction;
}

const defaultStore: Store = {
  playlist: [],
  playIdx: 0,
  toastList: [],
  asideButtons: {
    [AsideBtnKey.backTop]: false,
    [AsideBtnKey.showPlayer]: true,
    [AsideBtnKey.transferSrc]: false,
  },
  showPlayer: false,
  transSrc: () => {},
};

export const context = createContext<{
  store: Store;
  setStore: SetAhookState<Store>;
}>({
  store: defaultStore,
  setStore: () => {},
});
const Provider = context.Provider;

const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [store, setStore] = useSetState(defaultStore);
  return <Provider value={{ store, setStore }}>{children}</Provider>;
};

export default GlobalProvider;
