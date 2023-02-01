import { composeClass } from "@src/common/utils";
import { useKeyPress } from "ahooks";
import { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar: FC<{
  className?: string;
  value?: string;
}> = ({ className, value }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (inputRef.current && value) inputRef.current.value = value;
  }, [value]);
  useKeyPress("enter", () => {
    if (!inputRef.current) return;
    navigate(`/search/${encodeURIComponent(inputRef.current.value)}`);
  });
  return (
    <div className={composeClass("w-full flex justify-center py-8", className)}>
      <input
        type="text"
        placeholder="Search"
        className={composeClass(
          "input input-primary input-bordered right-0 rounded-lg w-[30rem]"
        )}
        ref={inputRef}
      />
    </div>
  );
};

export default SearchBar;
