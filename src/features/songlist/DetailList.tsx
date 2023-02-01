import { FC } from "react";
import { Result } from "./hooks";
import { Item, ItemTitle, Skeleton } from "@src/features/song";
import { usePlay } from "@src/features/common/hooks";

export const DetailList: FC<{
  data: Result;
}> = ({ data }) => {
  const { data: detail, loading, pagination } = data;
  const { play } = usePlay();
  const { current, changeCurrent, totalPage } = pagination;
  return (
    <div className="flex flex-col items-center">
      <ul className="rounded-lg overflow-hidden w-full">
        <li key={"title"}>
          <ItemTitle />
        </li>
        {detail && !loading
          ? detail.list.map((item, idx) => (
              <li key={idx}>
                <Item item={item} onPlayClick={() => play(detail.list, idx)} />
              </li>
            ))
          : new Array(20).fill(1).map((_, idx) => <Skeleton key={idx} />)}
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
