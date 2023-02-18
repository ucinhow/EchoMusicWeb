import { SongItem } from "@src/common/typings";
import { FC } from "react";
import { PlayButton } from "@src/common/components";
import { composeClass, formatDuration } from "@src/common/utils";
import { TextSkeleton } from "@src/common/components";
import { useToSongDetail } from "@src/common/hooks/navigate";

const colorCls = "bg-neutral text-neutral-content";
const hoverBgCls = "hover:bg-neutral-focus";
const gridCls = "grid grid-cols-[3fr_3fr_3fr_1fr_1fr] items-center gap-4";

export const ItemTitle: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={composeClass(
        "h-14  px-5 w-full text-primary font-bold bg-neutral",
        gridCls
      )}
    >
      <span>歌曲</span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>
  );
};

export const Item: FC<{
  item: SongItem;
  onPlayClick: VoidFunction;
  small?: boolean;
}> = ({ item, onPlayClick, small = false }) => {
  const { name, singerName, duration, albumName } = item;
  const toDetail = useToSongDetail();
  return !small ? (
    <a
      onClick={() => toDetail(item)}
      className={composeClass(
        "h-12 px-5 w-full text-sm cursor-pointer font-bold",
        colorCls,
        hoverBgCls,
        gridCls
      )}
    >
      <span className="truncate">{name}</span>
      <span className="truncate font-normal">{singerName.join(" | ")}</span>
      <span className="truncate">{albumName}</span>
      <span>{formatDuration(duration)}</span>
      <div className="flex justify-end">
        <PlayButton onClick={onPlayClick} />
      </div>
    </a>
  ) : (
    <a
      onClick={() => toDetail(item)}
      className={composeClass(
        "flex justify-between h-11 rounded-lg px-5 cursor-pointer",
        colorCls,
        hoverBgCls
      )}
    >
      <div className="flex flex-col justify-center">
        <span className="text-sm font-bold">{name}</span>
        <span className="text-[0.625rem]">{singerName.join(" | ")}</span>
      </div>
      <div className="flex items-center space-x-6">
        <span className="text-xs">{formatDuration(duration)}</span>
        <PlayButton onClick={onPlayClick} />
      </div>
    </a>
  );
};

export const Skeleton: FC<{ small?: boolean }> = ({ small = false }) => {
  return !small ? (
    <div className={composeClass("h-12 px-5", colorCls, gridCls)}>
      {new Array(4).fill(1).map((_, idx) => (
        <TextSkeleton key={idx} className="h-4 w-14" />
      ))}
      <div className="flex justify-end">
        <PlayButton key={4} />
      </div>
    </div>
  ) : (
    <div
      className={composeClass(
        "flex justify-between h-11 rounded-lg px-5 cursor-pointer",
        colorCls
      )}
    >
      <div className="flex flex-col justify-evenly">
        <TextSkeleton className="h-5 w-12" />
        <TextSkeleton className="h-[0.625rem] w-16" />
      </div>
      <div className="flex items-center space-x-6">
        <TextSkeleton className="h-4 w-12" />
        <PlayButton />
      </div>
    </div>
  );
};

// export default Item;
