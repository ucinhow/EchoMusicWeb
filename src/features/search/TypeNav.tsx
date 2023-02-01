import { SearchType, SetState } from "@src/common/typings";
import { composeClass } from "@src/common/utils";
import { FC } from "react";

const typeList = [
  { type: SearchType.song, title: "歌曲" },
  { type: SearchType.album, title: "专辑" },
  { type: SearchType.songlist, title: "歌单" },
];

const TypeNav: FC<{
  className?: string;
  searchType: SearchType;
  setSearchType: SetState<SearchType>;
}> = ({ className, searchType, setSearchType }) => {
  return (
    <ul
      className={composeClass(
        "flex w-full text-lg h-9 items-center space-x-8",
        className
      )}
    >
      {typeList.map(({ type, title }, idx) => (
        <li
          className={composeClass(
            "no-underline",
            searchType === type ? "link-primary" : "link"
          )}
          key={idx}
        >
          <a onClick={() => setSearchType(type)} className="">
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TypeNav;
