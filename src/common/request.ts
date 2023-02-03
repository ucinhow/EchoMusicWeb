import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:3001";

const instance = axios.create({ baseURL: baseUrl });

export const get = <Rsp>(
  url: string,
  params?: Record<string, string | number | string[]>
) => instance.get<Rsp>(url, { params }).then((res) => res.data);
