import { isPlaySrc } from "@src/common/utils/nec";
import { RefObject, useCallback, useContext, useEffect, useState } from "react";
import { context, useToast } from "@src/common/components";
import { useDetail, useUrl } from "@src/features/song";
import usePlayableSrc from "./usePlayableSrc";
import { useSetPlay } from "@src/common/hooks/setContext";
import { useContextSelector } from "use-context-selector";
export enum Mode {
  loop = "loop",
  lock = "lock",
  random = "random",
}

const modeList = Object.values(Mode);

const usePlayer = (audioRef: RefObject<HTMLAudioElement>) => {
  const { playIdx, playlist } = useContextSelector(context, ({ store }) => ({
    playlist: store.playlist,
    playIdx: store.playIdx,
  }));
  const setPlay = useSetPlay();
  const len = playlist.length;
  const item = playlist[playIdx];
  const { src, transfer } = usePlayableSrc(item);
  const id = isPlaySrc(src) ? item[src]?.id : undefined;
  const { data: detail } = useDetail(id, src);
  const { data: url } = useUrl(id, src);
  const [mode, setMode] = useState(Mode.loop);
  const randomIdx = () => {
    const newIdx = Math.floor(Math.random() * len);
    return newIdx === playIdx ? len - 1 : newIdx;
  };
  const toast = useToast();
  const audio = audioRef.current;
  const next = () => {
    if (len > 0) {
      switch (mode) {
        case Mode.lock:
          if (audio) {
            audio.currentTime = 0;
            audio.play();
          }
          return;
        case Mode.random:
          setPlay(randomIdx());
          audio?.play?.();
          return;
        default:
          setPlay((playIdx + 1) % len);
          audio?.play?.();
          return;
      }
    }
  };
  const prev = () => {
    if (len > 0) {
      switch (mode) {
        case Mode.lock:
          if (audio) {
            audio.currentTime = 0;
            audio.play();
          }
          return;
        case Mode.random:
          setPlay(randomIdx());
          audio?.play?.();
          return;
        default:
          setPlay((playIdx - 1 + len) % len);
          audio?.play?.();
          return;
      }
    }
  };

  const changeMode = () => {
    const idx = modeList.indexOf(mode);
    const newIdx = (idx + 1) % modeList.length;
    setMode(modeList[newIdx]);
    switch (modeList[newIdx]) {
      case Mode.lock:
        toast.info("单曲循环");
        return;
      case Mode.random:
        toast.info("随机播放");
        return;
      default:
        toast.info("列表循环");
        return;
    }
  };

  useEffect(() => {
    if (src === undefined) next();
  }, [src]);

  useEffect(() => {
    audio && audio.paused && audio.play();
  }, [url]);

  return {
    next,
    prev,
    detail,
    url,
    transferSrc: transfer,
    playlist,
    transferMode: changeMode,
    mode,
  };
};

export default usePlayer;
