import { SonglistItem, Source } from "@src/common/typings";
import { FC } from "react";
import { PicSkeleton, TextSkeleton } from "@src/common/components";
import { composeClass } from "@src/common/utils";
import { useToSonglistDetail } from "@src/common/hooks/navigate";

export const Item: FC<{
  item: SonglistItem;
  className?: string;
}> = ({ item, className }) => {
  const { name, picUrl } = item;
  const toDetail = useToSonglistDetail();
  return (
    <a
      className={composeClass(
        "flex flex-col w-[14.5rem] space-y-1 cursor-pointer",
        className
      )}
      onClick={() => toDetail(item)}
    >
      <img src={picUrl} alt="" className="w-full h-[14.5rem] rounded-lg" />
      <div className="flex flex-col">
        <span className="text-base font-bold text-base-content truncate">
          {name}
        </span>
      </div>
    </a>
  );
};

export const Skeleton = () => (
  <div className="flex flex-col w-[14.5rem] space-y-1">
    <PicSkeleton className="w-[14.5rem] h-[14.5rem] rounded-lg" />
    <TextSkeleton className="h-6 w-1/3" />
    {/* <TextSkeleton className="h-6 w-1/3" /> */}
  </div>
);

// export default Item;
