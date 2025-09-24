import { fireEvent, render, screen } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DocumentTextInput from "..";

describe("DocumentTextInput", () => {
  it("should format CPF input correctly", () => {
    const Wrapper = ({ children }: PropsWithChildren) => {
      const methods = useForm();
      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    render(
      <Wrapper>
        <DocumentTextInput />
      </Wrapper>
    );

    // Find the input element
    const inputElement = screen.getByPlaceholderText("ex: 111.111.111-11");

    // Simulate typing a CPF
    fireEvent.change(inputElement, { target: { value: "000.000.001-91" } });

    // Ensure the formatted value is correct
    expect(inputElement).toHaveValue("000.000.001-91");
  });

  it("should handle blur event correctly", () => {
    const Wrapper = ({ children }: PropsWithChildren) => {
      const methods = useForm();
      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    render(
      <Wrapper>
        <DocumentTextInput />
      </Wrapper>
    );

    // Find the input element
    const inputElement = screen.getByPlaceholderText("ex: 111.111.111-11");

    // Simulate typing a CPF
    fireEvent.change(inputElement, { target: { value: "123.456.789-00" } });

    // Simulate blur event
    fireEvent.blur(inputElement);

    // Ensure the value is set in the form context
    expect(screen.getByDisplayValue("123.456.789-00")).toBeInTheDocument();
  });

  it("should handle key press event correctly", () => {
    const Wrapper = ({ children }: PropsWithChildren) => {
      const methods = useForm();
      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    render(
      <Wrapper>
        <DocumentTextInput />
      </Wrapper>
    );

    // Find the input element
    const inputElement = screen.getByPlaceholderText("ex: 111.111.111-11");

    // Simulate pressing Enter key
    fireEvent.keyDown(inputElement, { key: "Enter" });

    expect(inputElement).toHaveFocus(); // After focus
  });
});
