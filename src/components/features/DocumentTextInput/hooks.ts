import { cpf } from "cpf-cnpj-validator";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";

export const useCPFInput = () => {
  const formatCPF = (document: string) => {
    return document ? document.replace(/\D/g, "").padStart(11, "0") : "";
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, "document">,
    setValue: UseFormSetValue<FieldValues>
  ) => {
    cpf.isValid(formatCPF(e.target.value)) &&
      setValue("document", formatCPF(e.target.value));
    field.onBlur();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      e.currentTarget.focus();
    }
  };

  return { formatCPF, handleBlur, handleFocus, handleKeyPress };
};
