import { FC } from "react";
import { composeClass } from "@src/common/utils";
interface Props {
  className: string;
  src: string;
}
const Item: FC<Props> = ({ className, src }) => {
  return (
    <div className={(composeClass(className), "relative flex justify-center")}>
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
