import messages from "@/constants/messages";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { useFormSchema } from "../useFormSchema"; // Adjust the import to the correct path

describe("useFormSchema", () => {
  const { searchFormSchema } = useFormSchema();

  it("should pass validation for a valid document", () => {
    const validDoc = "00000000191"; // Replace with a valid CPF number if needed
    expect(() => searchFormSchema.parse({ document: validDoc })).not.toThrow();
  });

  it("should fail validation for an empty document", () => {
    try {
      searchFormSchema.parse({ document: "" });
    } catch (e) {
      if (e instanceof z.ZodError) {
        expect(e.errors[0].message).toBe(messages.REQUIRED_FIELD);
      }
    }
  });

  it("should fail validation for an invalid document", () => {
    const invalidDoc = "invalidcpf";
    try {
      searchFormSchema.parse({ document: invalidDoc });
    } catch (e) {
      if (e instanceof z.ZodError) {
        expect(e.errors[0].message).toBe(messages.INVALID_DOCUMENT);
      }
    }
  });

  it("should fail validation for an improperly formatted document", () => {
    const improperlyFormattedDoc = "123"; // Example of an improperly formatted CPF
    try {
      searchFormSchema.parse({ document: improperlyFormattedDoc });
    } catch (e) {
      if (e instanceof z.ZodError) {
        expect(e.errors[0].message).toBe(messages.INVALID_DOCUMENT);
      }
    }
  });
});
