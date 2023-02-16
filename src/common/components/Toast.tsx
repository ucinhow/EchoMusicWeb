import { context } from "@src/common/components/GlobalProvider";
import { FC, PropsWithChildren } from "react";
import { useSetToast } from "../hooks/setContext";
import { useContextSelector } from "use-context-selector";
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
  const toastList = useContextSelector(context, ({ store }) => store.toastList);
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
  const set = useSetToast();
  const add = (msg: string, type: Type) => {
    const toastObj = { msg, type };
    set((prev) => [...prev, toastObj]);
    return () => set((prev) => prev.filter((item) => item !== toastObj));
  };

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
