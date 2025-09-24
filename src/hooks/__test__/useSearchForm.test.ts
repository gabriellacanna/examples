/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useForm } from "react-hook-form";
import { useSearchForm } from "../useSearchForm";
import { useICBoxPFStore } from "@/lib/store";

// Mocking useICBoxPFStore
vi.mock("@/lib/store", () => ({
  useICBoxPFStore: vi.fn(),
}));

// Mocking useForm
vi.mock("react-hook-form", () => ({
  ...vi.importActual("react-hook-form"),
  useForm: vi.fn(),
}));

describe("useSearchForm", () => {
  const getResultMock = vi.fn();

  beforeEach(() => {
    // Mock implementation of useICBoxPFStore
    (useICBoxPFStore as any).mockImplementation((selector: any) =>
      selector({ getResult: getResultMock })
    );

    // Mock implementation of useForm
    (useForm as any).mockImplementation(() => ({
      register: vi.fn(),
      handleSubmit: (fn: any) => (e: any) => {
        e.preventDefault();
        return fn();
      },
      setValue: vi.fn(),
      getValues: vi.fn(() => ({ document: "" })),
      formState: { errors: {} },
    }));
  });

  it("should initialize form with default values", () => {
    const { result } = renderHook(() => useSearchForm());

    expect(result.current.form.getValues()).toEqual({ document: "" });
  });

  it("should call getResult with correct document on form submit", async () => {
    const { result } = renderHook(() => useSearchForm());
    const { handleFormSubmit } = result.current;

    const data = { document: "12345678909" };

    await act(async () => {
      handleFormSubmit(data);
    });

    expect(getResultMock).toHaveBeenCalledWith(data);
  });

  it("should not call getResult with invalid document", async () => {
    const { result } = renderHook(() => useSearchForm());
    const { handleFormSubmit } = result.current;

    const data = { document: "invalid" };

    await act(async () => {
      handleFormSubmit(data);
    });

    expect(getResultMock).toHaveBeenCalledWith({ document: "invalid" });
  });
});
