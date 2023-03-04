import { FC, ReactNode } from "react";
import { IconType } from "react-icons";
import { composeClass } from "../utils";
import { ModalLabel } from "./Modal";
interface Props {
  className?: string;
  iconCls?: string;
  onClick?: VoidFunction;
  withModalLabel?: boolean;
  modalContent?: ReactNode;
}

export const createIconButton =
  (Icon: IconType): FC<Props> =>
  ({ className, iconCls, onClick, withModalLabel = false, modalContent }) => {
    return withModalLabel ? (
      <ModalLabel
        content={modalContent}
        className={composeClass(
          "btn-circle btn-primary w-7 h-7 flex justify-center items-center transition-colors",
          className
        )}
        onClick={onClick}
      >
        <Icon className={composeClass("w-4 h-4", iconCls)} />
      </ModalLabel>
    ) : (
      <button
        type="button"
        className={composeClass(
          "btn-circle btn-primary w-7 h-7 flex justify-center items-center transition-colors",
          className
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        <Icon className={composeClass("w-4 h-4", iconCls)} />
      </button>
    );
  };

export type ButtonType = FC<Props>;
