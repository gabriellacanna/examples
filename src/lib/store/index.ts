import { api } from "@/services/api";
import { create } from "zustand";
import { Actions, ResponseError, Result, State } from "./types";
import { RouteKeys, routes } from "@/constants/routes";
import { APIGEE_CLIENT, APIGEE_SECRET } from "../../config.js";

export const useICBoxPFStore = create<State & Actions>()((set) => ({
  loading: false,
  result: {} as Result,
  version: "" as RouteKeys,
  setVersion: (version) => {
    set(() => ({
      version: version,
    }));
  },
  authToken: "",
  error: {} as ResponseError,
  setAuthToken: (token) => {
    set(() => ({
      authToken: token,
    }));
  },
  getResult: (data) => {
    api
      .request({
        method: "POST",
        url: `${routes[useICBoxPFStore.getState().version]}`,
        data,
        headers: {
          Authorization: `Bearer ${useICBoxPFStore.getState().authToken}`,
          client_id: APIGEE_CLIENT,
          client_secret: APIGEE_SECRET,
        },
      })
      .then((res) => {
        set(() => ({
          result: { ...res.data },
        }));
      });
  },
  clearResult: () => {
    set(() => ({ result: {} as Result }));
  },
  setError: (error) => {
    set(() => ({ error }));
  },
  helpTopic: null,
  setHelpTopic: (contentId) => {
    set(() => ({ helpTopic: contentId }));
  },
  isHelpActive: false,
  toggleHelpActive: () => {
    set(() => ({ isHelpActive: !useICBoxPFStore.getState().isHelpActive }));
  },
}));
