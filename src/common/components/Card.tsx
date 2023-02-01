// a basic card component
import { FC, PropsWithChildren, forwardRef } from "react";
import { composeClass } from "../utils";
interface Props {
  className?: string;
  href?: string;
}

const Card: FC<PropsWithChildren<Props>> = ({ className, children, href }) => {
  return href ? (
    <a
      href={href}
      className={composeClass(
        className,
        "card p-[calc(1.25rem-1px)] bg-base-200 shadow-xl hover:shadow-2xl rounded-lg"
      )}
    >
      {children}
    </a>
  ) : (
    <div
      className={composeClass(
        className,
        "card p-[calc(1.25rem-1px)] bg-base-300 shadow-xl hover:shadow-2xl rounded-lg"
      )}
    >
      {children}
    </div>
  );
};

export default Card;
