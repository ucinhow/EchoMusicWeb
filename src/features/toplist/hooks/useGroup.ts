import { get } from "@src/common/request";
import { SongItem, Source } from "@src/common/typings";
import { useRequest } from "ahooks";
import { useEffect } from "react";

// interface ToplistDetailResponse {
//   id: number;
//   name: string;
//   intro: string;
//   updateTime: number;
//   playCount: number;
//   total: number;
//   songlist: Array<SongItem>;
//   picUrl: string;
// }
export interface ToplistGroupResponse {
  groups: Array<{
    name: string;
    toplist: Array<{
      id: number; // 排行榜id
      name: string; // 排行榜标题
      intro: string; // 简介
      updateTime: number; // 排行榜更新时间
      // playCount: number; // 收听数
      // total: number; // 歌曲总数
      picUrl: string;
    }>;
  }>;
}

const getToplistGroup = (src: Source) =>
  get<ToplistGroupResponse>("/toplist/all", { src });

export const useGroup = (
  src: Source,
  onSuccess?: (data: ToplistGroupResponse, params: [src: Source]) => void
) => {
  const { data, loading, run } = useRequest(getToplistGroup, {
    defaultParams: [src],
    onSuccess,
    // refreshDeps: [src],
    manual: true,
  });
  useEffect(() => {
    run(src);
  }, [src]);
  return { data, loading };
};

// export default useGroup;
