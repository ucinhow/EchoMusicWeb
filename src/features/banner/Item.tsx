import { FC } from "react";
import { composeClass } from "@src/common/utils";

interface Props {
  className: string;
  src: string;
  onClick?: VoidFunction;
}
const Item: FC<Props> = ({ className, src, onClick }) => {
  return (
    <div
      className={
        (composeClass(className), "relative flex justify-center cursor-pointer")
      }
      onClick={onClick}
    >
      <div
        style={{
          backgroundImage: `url("${src}")`,
        }}
        className="blur-2xl absolute -z-50 bg-cover w-full h-full"
      ></div>
      <img src={src} alt="" className="h-80" />
    </div>
  );
};

export default Item;
