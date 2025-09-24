import { useICBoxPFStore } from "@/lib/store";
import { handleErrors } from "@/utils/handleErrors";
import axios, { AxiosError } from "axios";
import { APIGEE_URL } from "../config.js";

export const api = axios.create({
  baseURL: APIGEE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (request) => {
    useICBoxPFStore.setState({ loading: true });
    return request;
  },
  (error: AxiosError) => {
    useICBoxPFStore.setState({ loading: false });
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    useICBoxPFStore.setState({ loading: false });
    return response;
  },
  (error: AxiosError) => {
    const e = handleErrors(
      error.response?.status ?? error.request?.status,
      error.response?.statusText ?? error.request?.statusText
    );
    useICBoxPFStore.getState().setError(e);
    useICBoxPFStore.setState({ loading: false });
    return Promise.reject(error);
  }
);
