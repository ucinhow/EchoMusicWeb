import { SongItem } from "@src/common/typings";
import { useSetPlay } from "@src/common/hooks/setContext";
import useShowPlayer from "./useShowPlayer";
const usePlay = () => {
  const setPlay = useSetPlay();
  const [show] = useShowPlayer();
  const play = (items: SongItem[], idx: number = 0) => {
    setPlay(idx, items);
    show();
  };
  return { play };
};

export default usePlay;
