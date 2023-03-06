import {
  FC,
  useState,
  PropsWithChildren,
  Children,
  useEffect,
  useCallback,
} from "react";
import { composeClass } from "../utils";

interface Props {
  embedIndictor?: boolean;
  auto?: number;
}

const Indictor: FC<{ num: number; active: number; className?: string }> = ({
  num,
  active,
  className,
}) => (
  <ul className={composeClass(className, "flex space-x-1 justify-center")}>
    {new Array(num).fill(1).map((_, idx) => (
      <li
        className={composeClass(
          "rounded-full border w-[0.625rem] h-[0.625rem] border-base-content",
          active === idx ? "bg-base-100" : "bg-base-content"
        )}
        key={idx}
      ></li>
    ))}
  </ul>
);

const Carousel: FC<PropsWithChildren<Props>> = ({
  children,
  embedIndictor = false,
  auto,
}) => {
  const childs = Children.toArray(children);
  const renderChilds = childs.length
    ? [childs[childs.length - 1], ...childs, childs[0]]
    : [];

  const [index, setIndex] = useState(1); // index of the current item
  const [inTransition, setInTransition] = useState(true);

  const count = renderChilds.length;
  const ulTranslateX = `translateX(${(-index * 100) / count}%)`;
  const ulWidth = `calc(${count} * 100%)`;

  const calcActive = () => {
    if (index === 0) return childs.length - 1;
    else if (index === renderChilds.length - 1) return 0;
    return index - 1;
  };

  const prev = () => {
    if (index === 0) return;
    setInTransition(true);
    setIndex((index + count - 1) % count);
  };

  const next = useCallback(() => {
    if (index === count - 1) return;
    setInTransition(true);
    setIndex((index + 1) % count);
  }, [index]);

  const onUlTransitionEnd = () => {
    if (index === 0 || index === count - 1) {
      setInTransition(false);
    }
  };

  useEffect(() => {
    if (inTransition === true) return;
    if (index === 0) setIndex(count - 2);
    else if (index === count - 1) setIndex(1);
  }, [inTransition]);

  useEffect(() => {
    if (auto === undefined) return;
    const timer = setTimeout(next, auto);
    return () => clearTimeout(timer);
  }, [next, auto]);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg">
      <ul
        style={{
          transform: ulTranslateX,
          width: ulWidth,
        }}
        className={composeClass(
          "flex",
          inTransition ? "transition-transform duration-500" : ""
        )}
        onTransitionEnd={onUlTransitionEnd}
      >
        {renderChilds.map((child, idx) => (
          <li className="relative flex-1" key={idx}>
            {child}
          </li>
        ))}
      </ul>
      <div className="absolute top-1/2 -translate-y-1/2 left-5">
        <button
          className="btn btn-circle btn-primary btn-sm"
          type="button"
          onClick={prev}
        >
          ❮
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-5">
        <button
          className="btn btn-circle btn-primary btn-sm"
          type="button"
          onClick={next}
        >
          ❯
        </button>
      </div>

      <Indictor
        num={childs.length}
        active={calcActive()}
        className={
          embedIndictor ? "absolute bottom-2 left-1/2 -translate-x-1/2" : "mt-2"
        }
      />
    </div>
  );
};

export default Carousel;
