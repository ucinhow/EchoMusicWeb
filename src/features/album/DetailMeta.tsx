import { formatPublicTime } from "@src/common/utils";
import { FC } from "react";
import { DetailResponse } from "./hooks";
import { usePlay } from "@src/features/common/hooks";
import { BiPlay } from "react-icons/bi";
import { PicSkeleton, TextSkeleton } from "@src/common/components";
export const DetailMeta: FC<{
  data?: DetailResponse;
  loading: boolean;
}> = ({ data, loading }) => {
  const { play } = usePlay();
  return data && !loading ? (
    <div className="flex space-x-16">
      <img src={data.picUrl} alt="" className="w-64 h-64 rounded-lg" />
      <div className="flex flex-col justify-between text-secondary">
        <span className="font-bold text-xl text-base-content">{data.name}</span>
        <span>{data.singer.map((s) => s.name).join(" | ")}</span>
        <span>
          发行时间：
          {data.publicTime ? formatPublicTime(data.publicTime) : "暂无信息"}
        </span>
        <span>歌曲数量：{data.songlist.length}</span>
        {/* <span>播放量：{detail.playCount}</span> */}
        <p className="truncate-3">介绍：{data.desc}</p>
        <div>
          <button
            type="button"
            className="btn btn-primary px-3 h-auto min-h-0 py-1 text-base"
            onClick={() => play(data.songlist, 0)}
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
        <TextSkeleton key={5} className="h-4 w-60" />
        <TextSkeleton key={6} className="h-9 w-16" />
      </div>
    </div>
  );
};
