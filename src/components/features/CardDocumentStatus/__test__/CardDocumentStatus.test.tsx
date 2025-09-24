// Mock the Zustand store
import CardDocumentStatus from "@/components/features/CardDocumentStatus";
import { useICBoxPFStore } from "@/lib/store";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/lib/store", () => ({
  useICBoxPFStore: vi.fn(),
}));

describe("CardDocumentStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the CPF situation correctly", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useICBoxPFStore as any).mockReturnValue({
      situation: "regular",
    });

    render(<CardDocumentStatus />);

    expect(screen.getByText("Situação do CPF")).toBeInTheDocument();
    expect(screen.getByText("REGULAR")).toBeInTheDocument();
  });

  it("renders the CPF situation correctly", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useICBoxPFStore as any).mockReturnValue({
      situation: "irregular",
    });

    render(<CardDocumentStatus />);

    expect(screen.getByText("Situação do CPF")).toBeInTheDocument();
    expect(screen.getByText("IRREGULAR")).toBeInTheDocument();
  });
});
