import { usePagination as useAPagination } from "ahooks";
import {
  Data,
  Params,
  Service,
  PaginationOptions,
} from "ahooks/lib/usePagination/types";
import { useToast } from "../components";
import { REQUEST_ERROR_MSG } from "@src/common/constants";

const usePagination = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options?: PaginationOptions<TData, TParams>
) => {
  const toast = useToast();

  return useAPagination(service, {
    ...options,
    onError: (err) => {
      toast.error(REQUEST_ERROR_MSG);
      console.log(err.message);
    },
  });
};

export default usePagination;
