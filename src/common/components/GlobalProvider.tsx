import {
  FC,
  PropsWithChildren,
  useEffect,
  createContext,
  ReactNode,
} from "react";
import { SongItem, AsideBtnKey, SetAhookState } from "@src/common/typings";
import { useSetState } from "ahooks";
import { ToastConfig } from "@src/common/components/Toast";

export type SetStore = SetAhookState<Store>;

export interface Store {
  playlist: Array<SongItem>;
  playIdx: number;
  toastList: ToastConfig[];
  modalContent?: ReactNode;
  asideButtons: Record<AsideBtnKey, boolean>;
  setStore?: SetStore;
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

export const context = createContext<Store>(defaultStore);
const Provider = context.Provider;
const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [store, setStore] = useSetState<Store>(defaultStore);
  useEffect(() => {
    setStore({ setStore: setStore });
  }, []);
  return <Provider value={store}>{children}</Provider>;
};

export default GlobalProvider;
