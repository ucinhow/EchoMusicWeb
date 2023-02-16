import { ReactNode } from "react";
import { context, ToastConfig, Store } from "../components";
import { AsideBtnKey, SongItem } from "../typings";
import type { SetState } from "ahooks/lib/useSetState";
import { useContextSelector, useContextUpdate } from "use-context-selector";
const useSetStore = (): SetState<Store> => {
  const setStore = useContextSelector(context, ({ setStore }) => setStore);
  const update = useContextUpdate(context);
  return (state) => {
    update(() => setStore(state));
  };
};

export const useSetPlay = () => {
  const setStore = useSetStore();
  const setPlay = (
    playIdx: number,
    updater?: Array<SongItem> | ((prev: Array<SongItem>) => Array<SongItem>)
  ) => {
    if (updater === undefined) return { playIdx };
    setStore((state) => {
      const newList =
        typeof updater === "function" ? updater(state.playlist) : updater;
      return {
        playlist: newList,
        playIdx,
      };
    });
  };
  return setPlay;
};

export const useSetToast = () => {
  const setStore = useSetStore();

  const setToast = (
    updater: ToastConfig[] | ((prev: ToastConfig[]) => ToastConfig[])
  ) => {
    setStore((state) => {
      const newList =
        typeof updater === "function" ? updater(state.toastList) : updater;
      return {
        toastList: newList,
      };
    });
  };
  return setToast;
};

export const useSetModalContent = () => {
  const setStore = useSetStore();
  const setModalContent = (content: ReactNode) => {
    setStore({ modalContent: content });
  };
  return setModalContent;
};

export const useSetAsideBtns = () => {
  const setStore = useSetStore();

  const switchAsideBtn = (key: AsideBtnKey, show: boolean) => {
    setStore((state) => {
      const newAsideBtns = {
        ...state.asideButtons,
        [key]: show,
      };
      return { asideButtons: newAsideBtns };
    });
  };
  return switchAsideBtn;
};

export const useSetToTop = () => {
  const setStore = useSetStore();

  const setToTop = (fn: VoidFunction) => {
    setStore({ toTop: fn });
  };
  return setToTop;
};

export const useSetShowPlayer = () => {
  const setStore = useSetStore();

  const setShowPlayer = (show: boolean) => setStore({ showPlayer: show });
  return setShowPlayer;
};

export const useSetTransSrc = () => {
  const setStore = useSetStore();

  const setTransSrc = (fn: VoidFunction) => {
    setStore({ transSrc: fn });
  };
  return setTransSrc;
};
