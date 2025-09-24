import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CardInformation from "../";
import { useICBoxPFStore } from "@/lib/store";
import * as cardInfo from "../useCardInformation";

// Mock Zustand store
vi.mock("@/lib/store", () => ({
  useICBoxPFStore: vi.fn(),
}));

// Mock the titles constant
vi.mock("@/constants/titles", () => ({
  default: {
    1: {
      A: "Mock Title A",
      B: "Mock Title B",
    },
    2: {
      A: "Mock Title C",
      B: "Mock Title D",
    },
  },
}));

describe("CardInformation", () => {
  const mockUseICBoxPFStore = useICBoxPFStore as any;

  beforeEach(() => {
    // Reset the Zustand store mock before each test
    mockUseICBoxPFStore.mockReset();
  });

  it("renders the correct title and message based on store values", () => {
    // Mock Zustand store values for result and version
    mockUseICBoxPFStore
      .mockReturnValueOnce({ code: "A", message: ["Mock Message 1"] }) // result.decision
      .mockReturnValueOnce("1"); // version

    // Mock the methods from useCardInformation
    vi.spyOn(cardInfo, "useCardInformation").mockReturnValue({
      getAcertaPositivoSuggestion: vi
        .fn()
        .mockReturnValue(<p>Mock Suggestion 1</p>),
      getTextClasses: vi.fn().mockReturnValue("mock-text-class"),
    });

    render(<CardInformation />);

    // Check if the correct title and message are rendered
    expect(screen.getByText("Mock Title A")).toBeInTheDocument();
    expect(screen.getByText("Mock Message 1")).toBeInTheDocument();
    expect(screen.getByText("Mock Suggestion 1")).toBeInTheDocument();
  });

  it("calls getTextClasses with correct arguments and renders the suggestion", () => {
    // Mock Zustand store values for result and version
    mockUseICBoxPFStore
      .mockReturnValueOnce({ code: "B", message: ["Mock Message 2"] }) // result.decision
      .mockReturnValueOnce("2"); // version

    // Mock the methods from useCardInformation
    const getTextClassesMock = vi.fn().mockReturnValue("mock-text-class");
    const getAcertaPositivoSuggestionMock = vi
      .fn()
      .mockReturnValue(<p>Mock Suggestion 2</p>);

    vi.spyOn(cardInfo, "useCardInformation").mockReturnValue({
      getAcertaPositivoSuggestion: getAcertaPositivoSuggestionMock,
      getTextClasses: getTextClassesMock,
    });

    render(<CardInformation />);

    // Ensure getTextClasses was called with correct arguments
    expect(getTextClassesMock).toHaveBeenCalledWith("B", "2");

    // Check if the suggestion and message are rendered
    expect(screen.getByText("Mock Suggestion 2")).toBeInTheDocument();
    expect(screen.getByText("Mock Message 2")).toBeInTheDocument();
  });
});
