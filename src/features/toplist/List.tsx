import { context, Spinner, Card } from "@src/common/components";
import { FC, useContext } from "react";
import { useDetailPagination } from "./hooks";
import { composeClass } from "@src/common/utils";
import { Item, ItemTitle, Skeleton } from "@src/features/song";
import { usePlay } from "../common/hooks";
import { Source } from "@src/common/typings";

const List: FC<{ className?: string; id?: number; src: Source }> = ({
  className,
  id,
  src,
}) => {
  const { data, loading, pagination } = useDetailPagination(id, src);
  const { play } = usePlay();
  const { current, changeCurrent, totalPage } = pagination;

  return (
    <Card
      className={composeClass("flex-1 flex flex-col items-center", className)}
    >
      <ul className="flex flex-col w-full overflow-hidden rounded-lg">
        <li key={-1}>
          <ItemTitle />
        </li>
        {data && !loading
          ? data.list.map((item, idx) => (
              <li key={idx}>
                <Item item={item} onPlayClick={() => play(data.list, idx)} />
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
    </Card>
  );
};

export default List;
