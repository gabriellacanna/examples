import messages from "@/constants/messages";
import { z } from "zod";
import { cpf } from "cpf-cnpj-validator";
import { useICBoxPFStore } from "@/lib/store";

export type FormDefinition = {
  document: string;
  creditOpration?: string;
  riskLevel?: string;
};

export const useFormSchema = () => {
  const searchFormSchema = z
    .object({
      document: z
        .string()
        .min(1, messages.REQUIRED_FIELD)
        .refine((doc) => cpf.isValid(doc), {
          message: messages.INVALID_DOCUMENT,
        }),
      creditOperation: z.string().optional(), // Optional at first
      riskLevel: z.string().optional(), // Optional at first
    })
    .superRefine((data, ctx) => {
      const requiresAdditionalFields =
        useICBoxPFStore.getState().version === "pre-qualificacao"; // Adjust condition here

      if (requiresAdditionalFields) {
        if (!data.creditOperation) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: messages.REQUIRED_SELECT,
            path: ["creditOperation"],
          });
        }

        if (!data.riskLevel) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: messages.REQUIRED_SELECT,
            path: ["riskLevel"],
          });
        }
      }
    });

  return { searchFormSchema };
};
