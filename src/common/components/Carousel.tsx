import { FC, useState, PropsWithChildren, Children, useEffect } from "react";
import { composeClass } from "../utils";
interface Props {
  embedIndictor?: boolean;
}

enum Move {
  right = 1,
  left = 2,
  none = 3,
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
          active === idx + 1 ? "bg-base-100" : "bg-base-content"
        )}
        key={idx}
      ></li>
    ))}
  </ul>
);

const Carousel: FC<PropsWithChildren<Props>> = ({
  children,
  embedIndictor = false,
}) => {
  const childs = Children.toArray(children);

  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);
  const [firstLeft, setFirstLeft] = useState(0);
  const [lastLeft, setLastLeft] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [move, setMove] = useState(Move.none);
  const count = childs.length;
  const step = 100 / count;

  useEffect(() => {
    if (move === Move.none) {
      firstLeft !== 0 && setFirstLeft(0);
      lastLeft !== 0 && setLastLeft(0);
      return;
    }
    setAnimated(true);
    const newOffset = offset + (move === Move.right ? -step : step);
    setOffset(newOffset);
    setMove(Move.none);
  });

  const prev = () => {
    if (current === 1) {
      setAnimated(false);
      setFirstLeft(100);
      setOffset(-100);
    }
    setCurrent(current === 1 ? count : current - 1);
    setMove(Move.left);
  };

  const next = () => {
    if (current === count) {
      setAnimated(false);
      setLastLeft(-100);
      setOffset(step);
    }
    setCurrent(current === count ? 1 : current + 1);
    setMove(Move.right);
  };

  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg">
      <ul
        style={{
          transform: `translateX(${offset}%)`,
          width: `calc(${count} * 100%)`,
        }}
        className={composeClass(
          "flex",
          animated ? "transition-transform duration-500" : ""
        )}
      >
        {childs.map((child, idx) => {
          const cls = "relative flex-1";
          if (idx === 0)
            return (
              <li style={{ left: `${firstLeft}%` }} className={cls} key={idx}>
                {child}
              </li>
            );
          if (idx === count - 1)
            return (
              <li style={{ left: `${lastLeft}%` }} className={cls} key={idx}>
                {child}
              </li>
            );
          return (
            <li className={cls} key={idx}>
              {child}
            </li>
          );
        })}
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
        num={count}
        active={current}
        className={
          embedIndictor ? "absolute bottom-2 left-1/2 -translate-x-1/2" : "mt-2"
        }
      />
    </div>
  );
};

export default Carousel;
