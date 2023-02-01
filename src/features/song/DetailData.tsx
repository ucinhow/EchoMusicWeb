import { formatDuration, formatPublicTime } from "@src/common/utils";
import { FC } from "react";
import { useDetail } from "./hooks";
import { BiPlay } from "react-icons/bi";
import { usePlay } from "@src/features/common/hooks";
import { SongItem } from "@src/common/typings";
import { PicSkeleton, TextSkeleton } from "@src/common/components";
export const DetailData: FC<{ id?: string; src?: string; item: SongItem }> = ({
  id,
  src,
  item,
}) => {
  const { data, loading } = useDetail(id, src);
  const { play } = usePlay();
  return data && !loading ? (
    <div className="flex space-x-16">
      <img src={data.picUrl} alt="" className="w-64 h-64 rounded-lg" />
      <div className="flex flex-col text-secondary justify-between">
        <span className="font-bold text-xl text-base-content">{data.name}</span>
        <span>{data.singer.map((s) => s.name).join(" | ")}</span>
        <span>
          发行时间：
          {data.publicTime ? formatPublicTime(data.publicTime) : "暂无信息"}
        </span>
        <span>专辑：{data.album.name}</span>
        <span>时长：{formatDuration(data.duration)}</span>
        <div>
          <button
            type="button"
            className="btn btn-primary px-3 h-auto min-h-0 py-1 text-base"
            onClick={() => play([item], 0)}
          >
            <BiPlay />
            播放
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex space-x-16">
      <PicSkeleton className="w-64 h-64 rounded-lg" />
      <div className="flex flex-col justify-between text-secondary">
        {new Array(5).fill(1).map((_, idx) => (
          <TextSkeleton key={idx} className="h-4 w-20" />
        ))}
        <TextSkeleton key={5} className="h-9 w-16" />
      </div>
    </div>
  );
};
