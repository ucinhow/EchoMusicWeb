import { PropsWithChildren, FC, ReactNode } from "react";
import { context } from "./GlobalProvider";
import { useContextSelector } from "use-context-selector";
import { useSetModalContent } from "../hooks/setContext";
const Modal = () => {
  const modalContent = useContextSelector(
    context,
    ({ store }) => store.modalContent
  );
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

export const ModalLabel: FC<
  PropsWithChildren<{
    content: ReactNode;
    className?: string;
    onClick?: VoidFunction;
  }>
> = ({ children, content, className, onClick }) => {
  const setContent = useSetModalContent();
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
