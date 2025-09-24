import { useICBoxPFStore } from "@/lib/store";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { getProductVersion } from "@/utils/getProductVersion";
import { render, screen } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";
import { vi } from "vitest";

// Mock Zustand store
vi.mock("@/lib/store", () => ({
  useICBoxPFStore: vi.fn(),
}));

// Mock React Router's useSearchParams
vi.mock("react-router-dom", () => ({
  useSearchParams: vi.fn(),
}));

// Mock getProductVersion utility
vi.mock("@/utils/getProductVersion", () => ({
  getProductVersion: vi.fn(),
}));

describe("ProtectedRoute", () => {
  const mockUseICBoxPFStore = useICBoxPFStore as any;
  const mockUseSearchParams = useSearchParams as any;
  const mockGetProductVersion = getProductVersion as any;

  beforeEach(() => {
    mockUseICBoxPFStore.mockReset();
    mockUseSearchParams.mockReset();
    mockGetProductVersion.mockReset();
  });

  it("renders InvalidSession when authToken is not present", () => {
    // Mock Zustand state
    mockUseICBoxPFStore.mockReturnValueOnce(null); // authToken is null
    mockUseICBoxPFStore.mockReturnValueOnce(vi.fn()); // setAuthToken
    mockUseICBoxPFStore.mockReturnValueOnce(vi.fn()); // setVersion

    // Mock useSearchParams
    mockUseSearchParams.mockReturnValue([new URLSearchParams()]);

    // Mock getProductVersion
    mockGetProductVersion.mockReturnValue("1.0");

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(
      screen.getByText("Sessão inválida! Por favor, faça o login novamente")
    ).toBeInTheDocument();
  });

  it("renders children when authToken is present", () => {
    // Mock Zustand state
    mockUseICBoxPFStore.mockReturnValueOnce("valid-token"); // authToken is present
    mockUseICBoxPFStore.mockReturnValueOnce(vi.fn()); // setAuthToken
    mockUseICBoxPFStore.mockReturnValueOnce(vi.fn()); // setVersion

    // Mock useSearchParams
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("auth_token=valid-token"),
    ]);

    // Mock getProductVersion
    mockGetProductVersion.mockReturnValue("1.0");

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("calls setAuthToken and setVersion on mount", () => {
    const setAuthTokenMock = vi.fn();
    const setVersionMock = vi.fn();

    // Mock Zustand state
    mockUseICBoxPFStore.mockReturnValueOnce("valid-token"); // authToken is present
    mockUseICBoxPFStore.mockReturnValueOnce(setAuthTokenMock); // setAuthToken
    mockUseICBoxPFStore.mockReturnValueOnce(setVersionMock); // setVersion

    // Mock useSearchParams
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("auth_token=test-token"),
    ]);

    // Mock getProductVersion
    mockGetProductVersion.mockReturnValue("1.0");

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    // Check if setAuthToken and setVersion were called with correct values
    expect(setAuthTokenMock).toHaveBeenCalledWith("test-token");
    expect(setVersionMock).toHaveBeenCalledWith("1.0");
  });
});
