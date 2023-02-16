import { SongItem } from "@src/common/typings";
import { PLAYSOURCE } from "@src/common/constants";
import { useToast } from "@src/common/components";
import { useEffect, useState } from "react";

const usePlayableSrc = (item?: SongItem) => {
  const toastApi = useToast();
  const [index, setIndex] = useState(0);
  const playableList = PLAYSOURCE.filter(
    (src) => item && src in item && item[src]?.playable
  );
  const transferSrc = () => {
    if (playableList.length) setIndex((index + 1) % playableList.length);
  };
  useEffect(() => {
    if (item === undefined) return;
    setIndex(0);
    if (playableList.length === 0) toastApi.error("无可播放音源，请尝试搜索");
    // else toastApi.info(`切换至音源：${playableList[0].toUpperCase()}`);
  }, [item]);

  useEffect(() => {
    if (item === undefined) return;
    if (index >= playableList.length)
      toastApi.error("已无可播放音源，请尝试搜索");
    else toastApi.info(`切换至音源：${playableList[index].toUpperCase()}`);
  }, [index]);

  return {
    src: playableList[index],
    transfer: transferSrc,
  };
};

export default usePlayableSrc;
