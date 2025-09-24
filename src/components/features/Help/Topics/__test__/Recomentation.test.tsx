import { render } from "@testing-library/react";
import Recommendation from "../Recomendation";

describe("Recommendation component", () => {
  it("renders recommendation content correctly", () => {
    const { getByText } = render(<Recommendation />);

    // Check if the title "Recomendação" is rendered
    expect(getByText("Recomendação")).toBeInTheDocument();

    // Check if the paragraph content is rendered correctly
    expect(
      getByText(
        /Com as informações extraídas das nossas análises, é possível identificar/
      )
    ).toBeInTheDocument();

    // Check if the strong text "Reprovar" is rendered
    expect(getByText(/Reprovar/)).toBeInTheDocument();

    // Check if the strong text "Requer mais análises" is rendered
    expect(getByText(/Requer mais análises/)).toBeInTheDocument();
  });
});
