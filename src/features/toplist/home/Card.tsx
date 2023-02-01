import { Source } from "@src/common/typings";
import {
  Card as BaseCard,
  PicSkeleton,
  TextSkeleton,
} from "@src/common/components";
import { useDetail } from "../hooks/useDetail";
import { usePlay } from "@src/features/common/hooks";
import { FC } from "react";
import { composeClass, formatUpdateTime } from "@src/common/utils";
import { Item, Skeleton } from "@src/features/song";

const PAGE = 1;
const SIZE = 5;

interface Props {
  id: number;
  src: Source;
  className?: string;
}

// const Skeleton = () => (
//   <div role="status" className="animate-pulse flex space-x-5 w-full">
//     <div className="flex flex-col space-y-1.5 justify-start">
//       <div className="flex items-center justify-center w-60 h-60 flex-grow-0 bg-gray-300 rounded-lg dark:bg-gray-700">
//         <svg
//           className="w-20 h-20 text-gray-200"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//           fill="currentColor"
//           viewBox="0 0 640 512"
//         >
//           <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
//         </svg>
//       </div>
//       <div className="h-[1.125rem] bg-gray-200 rounded dark:bg-gray-700 w-1/2"></div>
//       <div className="h-3 bg-gray-200 rounded-sm dark:bg-gray-700 w-1/3"></div>
//     </div>

//     <div className="flex-1 space-y-4">
//       {new Array(5).fill(1).map((_, idx) => (
//         <div
//           className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 w-full"
//           key={idx}
//         ></div>
//       ))}
//     </div>
//   </div>
// );
const Card: FC<Props> = ({ id, src, className }) => {
  const { data, loading } = useDetail(id, PAGE, SIZE, src);
  const { play } = usePlay();
  const { picUrl, songlist, name, updateTime } = data || {};
  return (
    <BaseCard className={composeClass("flex flex-row space-x-5", className)}>
      {picUrl && updateTime ? (
        <div className="flex flex-col">
          <img src={picUrl} alt="" className="w-60 h-60 rounded-lg mb-1" />
          <span className="text-lg font-bold text-base-content">{name}</span>
          <span className="text-xs text-secondary">
            更新时间：{formatUpdateTime(updateTime)}
          </span>
        </div>
      ) : (
        <div className="flex flex-col">
          <PicSkeleton className="w-60 h-60 rounded-lg mb-1" />
          <TextSkeleton className="w-1/3 h-7" />
          <TextSkeleton className="w-1/3 h-4" />
        </div>
      )}
      {songlist ? (
        <ul className="flex flex-col flex-1 space-y-4">
          {songlist.map((item, idx) => {
            const { name, singerName, duration } = item;
            return (
              <li key={idx}>
                <Item
                  item={item}
                  onPlayClick={() => play(songlist, idx)}
                  small
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="flex flex-col flex-1 space-y-4">
          {new Array(SIZE).fill(1).map((_, idx) => (
            <Skeleton key={idx} small={true} />
          ))}
        </ul>
      )}
    </BaseCard>
  );
};

export default Card;
