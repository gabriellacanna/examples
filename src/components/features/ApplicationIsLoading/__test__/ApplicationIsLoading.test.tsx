import ApplicationIsLoading from "@/components/features/ApplicationIsLoading";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

// Mock the Spinner component
vi.mock("@/components/ui/spinner", () => ({
  default: () => <div data-testid="spinner">Spinner</div>,
}));

describe("ApplicationIsLoading", () => {
  it("renders the Spinner and loading text correctly", () => {
    render(<ApplicationIsLoading />);

    // Check that the Spinner is rendered
    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    // Check that the text "Aguarde..." is rendered
    expect(screen.getByText("Aguarde...")).toBeInTheDocument();
  });
});
