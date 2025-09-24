import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormDefinition, useFormSchema } from "./useFormSchema";
import { useICBoxPFStore } from "@/lib/store";

export const useSearchForm = () => {
  const { searchFormSchema } = useFormSchema();
  const getResult = useICBoxPFStore((state) => state.getResult);

  const form = useForm<FormDefinition>({
    defaultValues: {
      document: "",
      creditOpration: "",
      riskLevel: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(searchFormSchema),
  });

  console.log(form.formState.isValid);

  const productSelectData = [
    { CartaoDeCredito: "Cartão de Crédito" },
    { EmprestimoPessoal: "Empréstimos" },
  ] as {
    [key: string]: string;
  }[];

  const apetiteSelectData = [
    { Conservador: "Conservador" },
    { Moderado: "Moderado" },
    { Arrojado: "Arrojado" },
  ] as {
    [key: string]: string;
  }[];

  const handleFormSubmit: SubmitHandler<FormDefinition> = (data) =>
    getResult(data);

  return {
    form,
    productSelectData,
    apetiteSelectData,
    handleFormSubmit,
  } as const;
};
