import { FC, useState } from "react";
import { DetailResponse } from "./hooks";
import { Item, ItemTitle, Skeleton } from "@src/features/song";
import { usePlay } from "@src/features/common/hooks";

const SIZE = 20;

export const DetailList: FC<{
  data?: DetailResponse;
  loading: boolean;
}> = ({ data, loading }) => {
  const [current, setCurrent] = useState(1);
  const len = data?.songlist?.length || 0;
  const { play } = usePlay();
  return (
    <div className="flex flex-col items-center">
      <ul className="rounded-lg overflow-hidden w-full">
        <li key={"title"}>
          <ItemTitle />
        </li>
        {data && !loading
          ? data.songlist.slice((current - 1) * SIZE, SIZE).map((item, idx) => (
              <li key={idx}>
                <Item
                  item={item}
                  onPlayClick={() => play(data.songlist, idx)}
                />
              </li>
            ))
          : new Array(20).fill(1).map((_, idx) => <Skeleton key={idx} />)}
      </ul>
      <div className="btn-group mt-5">
        <button
          className="btn"
          onClick={() => setCurrent(current - 1)}
          disabled={current === 1}
        >
          «
        </button>
        <button className="btn">Page {current}</button>
        <button
          className="btn"
          onClick={() => setCurrent(current + 1)}
          disabled={current * SIZE >= len}
        >
          »
        </button>
      </div>
    </div>
  );
};
