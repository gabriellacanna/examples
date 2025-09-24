// AppRouter.test.tsx
import { useICBoxPFStore } from "@/lib/store";
import AppRouter from "@/routes/AppRouter";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock the store hook
vi.mock("@/lib/store", () => ({
  useICBoxPFStore: vi.fn(),
}));

// Mock the pages
vi.mock("@/components/pages/HealthCheckPage", () => ({
  default: () => <div>HealthCheckPage</div>,
}));
vi.mock("@/components/pages/NotFoundPage", () => ({
  default: () => <div>NotFoundPage</div>,
}));

describe("AppRouter", () => {
  it("renders HealthCheckPage on /bvs-health route", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useICBoxPFStore as any).mockReturnValue({
      result: {},
    });

    window.history.pushState({}, "Health Check", "/front-icbox-pf/bvs-health");
    render(<AppRouter />);

    expect(screen.getByText("HealthCheckPage")).toBeInTheDocument();
  });

  it("renders NotFoundPage on an unknown route", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useICBoxPFStore as any).mockReturnValue({ result: {} });

    window.history.pushState({}, "Not Found", "/front-icbox-pf/unknown-route");
    render(<AppRouter />);

    expect(screen.getByText("NotFoundPage")).toBeInTheDocument();
  });
});
