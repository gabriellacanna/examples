import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CardDocument from "..";

// Define initial mock state for useICBoxPFStore
let mockState = {
  document: "00000000000191",
  name: "Razão Social do CNPJ 00000000000191",
};

// Mock the useICBoxPFStore hook with a function that returns the current mockState
vi.mock("@/lib/store", () => ({
  useICBoxPFStore: vi.fn(() => mockState),
}));

// Mock the cpf formatter
vi.mock("cpf-cnpj-validator", () => ({
  cpf: {
    format: (doc: string) => `formatted-${doc}`, // Mocking CPF format
  },
}));

describe("CardDocument", () => {
  beforeEach(() => {
    // Reset mockState before each test
    mockState = {
      document: "00000000000191",
      name: "Razão Social do CNPJ 00000000000191",
    };
  });

  it("renders the CPF correctly", () => {
    render(<CardDocument />);

    const cpfElement = screen.getByText("formatted-00000000000191");
    expect(cpfElement).toBeInTheDocument();
  });

  it("renders the company name when available", () => {
    render(<CardDocument />);

    const nameElement = screen.getByText("Razão Social do CNPJ 00000000000191");
    expect(nameElement).toBeInTheDocument();
  });

  it("does not render company name when not available", () => {
    // Modify mockState to simulate no name available
    mockState.name = "";

    render(<CardDocument />);

    const nameElement = screen.queryByText("Razão Social");
    expect(nameElement).not.toBeInTheDocument();
  });
});
