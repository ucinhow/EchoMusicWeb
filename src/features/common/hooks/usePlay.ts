import { SongItem } from "@src/common/typings";
import useSetStore from "@src/common/hooks/useSetStore";
import { useCallback } from "react";
const usePlay = () => {
  const setStore = useSetStore();
  const play = useCallback(
    (items: SongItem[], idx: number = 0) => {
      setStore?.({ playlist: items, playIdx: idx, showPlayer: true });
    },
    [setStore]
  );
  return { play };
};

export default usePlay;
