import { context } from "@src/common/components/GlobalProvider";
import { FC, PropsWithChildren, useCallback, useContext } from "react";

enum Type {
  success = "success",
  error = "error",
  info = "info",
  warning = "warning",
}

export interface ToastConfig {
  msg: string;
  type: Type;
}

const Alert: FC<PropsWithChildren<{ type: Type }>> = ({ type, children }) => {
  switch (type) {
    case Type.success:
      return <div className="alert alert-success rounded-lg">{children}</div>;
    case Type.error:
      return <div className="alert alert-error rounded-lg">{children}</div>;
    case Type.warning:
      return <div className="alert alert-warning rounded-lg">{children}</div>;
    default:
      return <div className="alert alert-info rounded-lg">{children}</div>;
  }
};

const Toast = () => {
  const { toastList } = useContext(context);
  return (
    <ul className="toast toast-end toast-top z-50">
      {toastList.map(({ msg, type }, idx) => (
        <Alert type={type} key={idx}>
          {msg}
        </Alert>
      ))}
    </ul>
  );
};

export const useToast = () => {
  const { setStore } = useContext(context);
  const add = useCallback(
    (msg: string, type: Type) => {
      const toastObj = { msg, type };
      setStore?.((pre) => ({ toastList: [...pre.toastList, toastObj] }));
      return () =>
        setStore?.((pre) => ({
          toastList: pre.toastList.filter((item) => item !== toastObj),
        }));
    },
    [setStore]
  );
  const api = (msg: string, type: Type, duration: number) => {
    const remove = add(msg, type);
    setTimeout(remove, duration);
  };
  return {
    success: (msg: string, duration: number = 3000) =>
      api(msg, Type.success, duration),
    error: (msg: string, duration: number = 3000) =>
      api(msg, Type.error, duration),
    info: (msg: string, duration: number = 3000) =>
      api(msg, Type.info, duration),
    warning: (msg: string, duration: number = 3000) =>
      api(msg, Type.warning, duration),
  };
};

export default Toast;
