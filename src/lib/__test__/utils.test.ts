import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn", () => {
  it("should merge class names correctly", () => {
    const className1 = "bg-red-500";
    const className2 = "text-white";
    const merged = cn(className1, className2);

    expect(merged).toBe("bg-red-500 text-white");
  });

  it("should handle conditional class names", () => {
    const isActive = true;
    const className = cn("bg-red-500", isActive && "text-white");

    expect(className).toBe("bg-red-500 text-white");
  });

  it("should handle false conditional class names", () => {
    const isActive = false;
    const className = cn("bg-red-500", isActive && "text-white");

    expect(className).toBe("bg-red-500");
  });

  it("should handle undefined and null values", () => {
    const className = cn("bg-red-500", undefined, null, "text-white");

    expect(className).toBe("bg-red-500 text-white");
  });

  it("should merge Tailwind class names correctly", () => {
    const className1 = "p-2";
    const className2 = "p-4";
    const merged = cn(className1, className2);

    expect(merged).toBe("p-4"); // twMerge should merge the padding classes correctly
  });
});
