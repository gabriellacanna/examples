/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { api } from "@/services/api";
import { useICBoxPFStore } from "../store"; // Adjust the import to the correct path
import { Result, ResponseError } from "../store/types"; // Adjust the import to the correct path
import { HelpTopics } from "../store/types";

vi.mock("@/services/api", () => ({
  api: {
    request: vi.fn(),
  },
}));

describe("useICBoxPFStore", () => {
  beforeEach(() => {
    // Reset the Zustand store state before each test
    useICBoxPFStore.setState({
      loading: false,
      result: {} as Result,
      authToken: "",
      error: {} as ResponseError,
      helpTopic: null,
      isHelpActive: false,
    });
  });

  it("should set authToken", () => {
    const token = "test_token";

    act(() => {
      useICBoxPFStore.getState().setAuthToken(token);
    });

    expect(useICBoxPFStore.getState().authToken).toBe(token);
  });

  it("should clear result", () => {
    act(() => {
      useICBoxPFStore.getState().clearResult();
    });

    expect(useICBoxPFStore.getState().result).toEqual({});
  });

  it("should set error", () => {
    const error: ResponseError = {
      status: 500,
      message: "Internal Server Error",
    };

    act(() => {
      useICBoxPFStore.getState().setError(error);
    });

    expect(useICBoxPFStore.getState().error).toEqual(error);
  });

  it("should toggle help active", () => {
    act(() => {
      useICBoxPFStore.getState().toggleHelpActive();
    });

    expect(useICBoxPFStore.getState().isHelpActive).toBe(true);

    act(() => {
      useICBoxPFStore.getState().toggleHelpActive();
    });

    expect(useICBoxPFStore.getState().isHelpActive).toBe(false);
  });

  it("should set help topic", () => {
    const helpTopic: HelpTopics = "recommendation";

    act(() => {
      useICBoxPFStore.getState().setHelpTopic(helpTopic);
    });

    expect(useICBoxPFStore.getState().helpTopic).toBe(helpTopic);
  });

  it("should get result and set state correctly", async () => {
    const data = {
      document: "12345678909",
      product: "",
      profile: "",
    };
    const mockResult: Result = {
      summary: {
        name: "John Doe",
        document: "12345678909",
        situation: "REGULAR",
      },
      decision: {
        code: "1",
        message: [],
      },
    };

    (api.request as any).mockResolvedValueOnce({ data: mockResult });

    await act(async () => {
      await useICBoxPFStore.getState().getResult(data);
    });

    expect(useICBoxPFStore.getState().result).toEqual(mockResult);
  });
});
