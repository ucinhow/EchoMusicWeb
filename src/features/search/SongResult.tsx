import { FC } from "react";
import { useSongResult } from "./hooks";
import { Spinner } from "@src/common/components";
import { Item, ItemTitle } from "@src/features/song";
import { usePlay } from "@src/features/common/hooks";
const SongResult: FC<{ keyword: string }> = ({ keyword }) => {
  const { data, loading, pagination } = useSongResult(keyword);
  const { play } = usePlay();
  const { current, changeCurrent, totalPage } = pagination;
  return (
    <div className="flex flex-col items-center">
      {data && !loading ? (
        <ul className="rounded-lg overflow-hidden w-full">
          <li key={"title"}>
            <ItemTitle />
          </li>
          {data.list.map((item, idx) => (
            <li key={idx}>
              <Item item={item} onPlayClick={() => play(data.list, idx)} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-[57.75rem] flex justify-center items-center">
          <Spinner />
        </div>
      )}
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

export default SongResult;
