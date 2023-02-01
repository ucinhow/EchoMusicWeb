import { useState, FC, useRef } from "react";
import { composeClass } from "@src/common/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { useKeyPress } from "ahooks";

const routerList = [
  { title: "首页", to: "/" },
  { title: "排行榜", to: "/toplist" },
  { title: "歌单", to: "/songlist" },
  // { title: "歌手", to: "/singer" },
];

const yCenterClass = "absolute top-1/2 -translate-y-1/2";
const xCenterClass = "right-1/2 translate-x-1/2";

const HeaderSearch: FC<{
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void;
}> = ({ isSearch, setIsSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const input = inputRef.current;
  const navigate = useNavigate();
  useKeyPress("enter", () => {
    if (!input || !input.value) return;
    navigate(`/search/${encodeURIComponent(input.value)}`);
  });
  return (
    <div
      className={composeClass(
        yCenterClass,
        `${isSearch ? ` ${xCenterClass}` : "right-0"}`,
        "transition-all duration-200 ease-linear"
      )}
      onClick={() => setIsSearch(true)}
      onBlur={() => setIsSearch(false)}
    >
      <input
        type="text"
        placeholder="Search"
        className={composeClass(
          "input input-primary input-bordered right-0 h-10",
          isSearch ? "w-80" : "w-60"
        )}
        ref={inputRef}
      />
    </div>
  );
};

const Header: FC<{ className?: string }> = ({ className }) => {
  const [isSearch, setIsSearch] = useState(false);
  return (
    <header
      className={composeClass(
        className,
        "sticky top-0 h-16 backdrop-blur z-10 flex-shrink-0"
      )}
    >
      {!isSearch && (
        <div className={composeClass(yCenterClass, "left-0")}>
          <span className="whitespace-nowrap text-2xl font-semibold text-neutral-700 dark:text-white font-mono cursor-default">
            EchoMusic
          </span>
        </div>
      )}
      <HeaderSearch isSearch={isSearch} setIsSearch={setIsSearch} />
      {!isSearch && (
        <ul
          className={composeClass(
            yCenterClass,
            "left-1/2 -translate-x-1/2 space-x-8 list-none flex"
          )}
        >
          {routerList.map(({ title, to }, idx) => (
            <li key={idx}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  composeClass(
                    "no-underline link",
                    isActive ? "text-primary" : ""
                  )
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
