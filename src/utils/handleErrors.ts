import { ResponseError } from "@/lib/store/types";

export const handleErrors = (
  status: number | undefined,
  message?: string
): ResponseError | undefined => {
  switch (status) {
    case 204:
      return {
        status: 523,
        message: "Documento não encontrado na base.",
      };
    case 400:
      return {
        status,
        message: message,
      };
    case 401:
      return {
        status,
        message: "Consulta não autorizada, faça novamente o login.",
      };
    case 403: {
      return {
        status,
        message:
          "A consulta não pode ser realizada. A aplicação não possui permissão suficiente.",
      };
    }
    case 404:
      return {
        status,
        message: "Documento não encontrado na base.",
      };

    case 0:
    case 500:
      return {
        status: 500,
        message: "Erro desconhecido, tente novamente mais tarde.",
      };
    case 503:
      return {
        status,
        message: "Serviço indisponível. Tente novamente mais tarde.",
      };
    default:
      return;
  }
};
