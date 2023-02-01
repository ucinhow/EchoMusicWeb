import { useRequest as useARequest } from "ahooks";
import { Service, Options } from "ahooks/es/useRequest/src/types";
import { useToast } from "../components";
import { REQUEST_ERROR_MSG } from "@src/common/constants";

const useRequest = <TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {}
) => {
  const toast = useToast();
  return useARequest(service, {
    ...options,
    onError: (err) => {
      toast.error(REQUEST_ERROR_MSG);
      console.log(err.message);
    },
    // manual: true,
  });
};

export default useRequest;
