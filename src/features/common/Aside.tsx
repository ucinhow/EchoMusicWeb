import {
  TransferButton,
  BackTopButton,
  context,
  ShowButton,
  ButtonType,
} from "@src/common/components";
import { composeClass } from "@src/common/utils";
import { FC, useRef } from "react";
import { AsideBtnKey } from "@src/common/typings";
import useToTop from "./hooks/useToTop";
import useShowPlayer from "./hooks/useShowPlayer";
import { useContextSelector } from "use-context-selector";
import { useZoomAnimation } from "@src/common/hooks";

const buttonKeys = Object.values(AsideBtnKey);

const Aside: FC<{ className?: string }> = ({ className }) => {
  const { asideButtons, transSrc, showPlayer } = useContextSelector(
    context,
    ({ store: { asideButtons, transSrc, showPlayer } }) => ({
      asideButtons,
      transSrc,
      showPlayer,
    })
  );
  const toTop = useToTop();
  const [show] = useShowPlayer();
  return (
    <aside className={composeClass("fixed right-8 top-2/3 w-10", className)}>
      <ul className="space-y-5">
        {buttonKeys.map((key) => {
          switch (key) {
            case AsideBtnKey.backTop:
              return (
                <Button
                  dataTip="返回顶部"
                  onClick={toTop}
                  ButtonCmp={BackTopButton}
                  show={asideButtons[key]}
                />
              );
            case AsideBtnKey.showPlayer:
              return (
                <Button
                  dataTip="显示播放栏"
                  onClick={show}
                  ButtonCmp={ShowButton}
                  show={asideButtons[key] && !showPlayer}
                />
              );

            default:
              return (
                <Button
                  dataTip="切换页面音源"
                  onClick={transSrc}
                  ButtonCmp={TransferButton}
                  show={asideButtons[key]}
                />
              );
          }
        })}
      </ul>
    </aside>
  );
};
const cls = "w-10 h-10 animate__zoomIn";
const iconCls = "w-5 h-5";
function Button({
  onClick,
  dataTip,
  ButtonCmp,
  show,
}: {
  onClick?: VoidFunction;
  dataTip: string;
  ButtonCmp: ButtonType;
  show: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [className, shouldMount] = useZoomAnimation(show, ref);
  return shouldMount ? (
    <li
      className={composeClass(
        "tooltip tooltip-primary tooltip-left transition-all ease-linear duration-200",
        className
      )}
      data-tip={dataTip}
      ref={ref}
    >
      <ButtonCmp className={cls} iconCls={iconCls} onClick={onClick} />
    </li>
  ) : null;
}

export default Aside;
