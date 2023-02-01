import { useSonglistResult } from "./hooks";
import { FC } from "react";
import { Item, Skeleton } from "@src/features/songlist";
import { Spinner } from "@src/common/components";
const AlbumResult: FC<{ keyword: string }> = ({ keyword }) => {
  const { data, loading, pagination } = useSonglistResult(keyword);
  // const { play } = usePlay();
  const { current, changeCurrent, totalPage } = pagination;
  return (
    <div className="flex flex-col items-center">
      <ul className="rounded-lg overflow-hidden w-full grid grid-cols-5 gap-5">
        {data && !loading
          ? data.list.map((item) => (
              <li key={item.id}>
                <Item item={item} className="w-full" />
              </li>
            ))
          : new Array(20).fill(1).map((_, idx) => (
              <li key={idx}>
                <Skeleton />
              </li>
            ))}
      </ul>
      <div className="btn-group mt-5">
        <button
          className="btn"
          onClick={() => changeCurrent(current - 1)}
          disabled={current === 1}
        >
          «
        </button>
        <button className="btn">Page {current}</button>
        <button
          className="btn"
          onClick={() => changeCurrent(current + 1)}
          disabled={current === totalPage}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default AlbumResult;
