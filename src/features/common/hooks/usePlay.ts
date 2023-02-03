import { context } from "@src/common/components";
import { SongItem } from "@src/common/typings";
import { useCallback, useContext } from "react";
const usePlay = () => {
  const { setStore } = useContext(context);
  const play = useCallback(
    (items: SongItem[], idx: number = 0) => {
      setStore?.({ playlist: items, playIdx: idx, showPlayer: true });
    },
    [setStore]
  );
  return { play };
};

export default usePlay;
