import {
  PropsWithChildren,
  useContext,
  FC,
  ReactNode,
  useCallback,
} from "react";
import { context } from "./GlobalProvider";

const Modal = () => {
  const { modalContent } = useContext(context);
  return (
    <>
      <input type="checkbox" id="modal" className="modal-toggle" />
      <label htmlFor="modal" className="modal cursor-pointer z-50">
        <label
          className="modal-box relative p-5 w-[40rem] max-w-none"
          htmlFor=""
        >
          {modalContent}
        </label>
      </label>
    </>
  );
};

const useModal = () => {
  const { setStore } = useContext(context);
  const setContent = useCallback(
    (content: ReactNode) => setStore?.({ modalContent: content }),
    [setStore]
  );
  return { setContent };
};

export const ModalLabel: FC<
  PropsWithChildren<{
    content: ReactNode;
    className?: string;
    onClick?: VoidFunction;
  }>
> = ({ children, content, className, onClick }) => {
  const { setContent } = useModal();
  return (
    <label
      htmlFor="modal"
      onClick={() => {
        setContent(content);
        onClick?.();
      }}
      className={className}
    >
      {children}
    </label>
  );
};
export default Modal;
