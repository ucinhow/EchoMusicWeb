import { useRequest } from "@src/common/hooks";
import { get } from "@src/common/request";
import { PlaySource } from "@src/common/typings";
import { isPlaySrc } from "@src/common/utils";
import { useEffect } from "react";

interface LyricResponse {
  lyricExist: boolean;
  lyric: [number, string][]; // [ms, 'lyric']
}

const fetchLyric = (id: string, src: PlaySource) =>
  get<LyricResponse>("/song/lyric", { id, src });

export const useLyric = (id?: string, src?: string) => {
  const { run, data, loading } = useRequest(fetchLyric, { manual: true });
  useEffect(() => {
    if (id === undefined || !isPlaySrc(src)) return;
    run(id, src);
  }, [id, src]);
  return { data, loading };
};
