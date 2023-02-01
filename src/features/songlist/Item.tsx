import { SonglistItem, Source } from "@src/common/typings";
import { FC } from "react";
import { PicSkeleton, TextSkeleton } from "@src/common/components";
import { composeClass } from "@src/common/utils";
import { useNavigate } from "react-router-dom";

// const useSrcPic = (item: AlbumItem) => {
//   const toast = useToast();
//   let res = "";
//   SOURCE.forEach((src) => {
//     const meta = item[src];
//     if (meta === undefined) return;
//     res = meta.picUrl;
//   });
//   if (res === "") toast.error("无法加载图片");
//   return res;
// };

export const Item: FC<{
  item: SonglistItem;
  className?: string;
}> = ({ item, className }) => {
  const { name, picUrl } = item;
  const navigate = useNavigate();
  return (
    <a
      className={composeClass(
        "flex flex-col w-[14.5rem] space-y-1 cursor-pointer",
        className
      )}
      onClick={() => navigate("/songlist/detail", { state: item })}
    >
      <img src={picUrl} alt="" className="w-full h-[14.5rem] rounded-lg" />
      <div className="flex flex-col">
        <span className="text-base font-bold text-base-content truncate">
          {name}
        </span>
        {/* <span className="text-sm text-secondary truncate">
          {singerName.join(" | ")}
        </span> */}
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
