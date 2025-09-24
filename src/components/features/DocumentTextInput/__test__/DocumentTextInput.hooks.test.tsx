import { renderHook } from "@testing-library/react";
import { useCPFInput } from "../hooks";

describe("useCPFInput", () => {
  it("should format CPF correctly", () => {
    const { result } = renderHook(() => useCPFInput());

    expect(result.current.formatCPF("123.456.789-00")).toBe("12345678900");
    expect(result.current.formatCPF("")).toBe("");
    expect(result.current.formatCPF("")).toBe("");
  });

  it("should handle focus correctly", () => {
    const { result } = renderHook(() => useCPFInput());
    const mockEvent = {
      target: {
        select: vi.fn(),
      },
    };

    // @ts-expect-error not all methods are been used
    result.current.handleFocus(mockEvent);

    expect(mockEvent.target.select).toHaveBeenCalled();
  });

  it("should handle key press correctly", () => {
    const { result } = renderHook(() => useCPFInput());
    const mockEvent = {
      key: "Enter",
      currentTarget: {
        blur: vi.fn(),
        focus: vi.fn(),
      },
    };

    // @ts-expect-error not all methods are been used
    result.current.handleKeyPress(mockEvent);

    expect(mockEvent.currentTarget.blur).toHaveBeenCalled();
    expect(mockEvent.currentTarget.focus).toHaveBeenCalled();
  });
});
