import { FC } from "react";
import { useLyric } from "./hooks/useLyric";
import { Spinner } from "@src/common/components";
export const DetailLyric: FC<{ id?: string; src?: string }> = ({ id, src }) => {
  const { data, loading } = useLyric(id, src);
  return (
    <div>
      <div className="font-bold text-xl text-center mb-5">歌词</div>
      {data && !loading ? (
        <ul className="flex flex-col items-center space-y-4 font-semibold text-secondary h-[60vh] overflow-scroll">
          {data.lyric.map(([time, lyric]) => (
            <li>{lyric}</li>
          ))}
        </ul>
      ) : (
        <div>
          <Spinner className="h-[60vh]" />
        </div>
      )}
    </div>
  );
};
