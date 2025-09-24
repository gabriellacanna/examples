import { describe, it, expect } from "vitest";
import { handleErrors } from "../handleErrors";

describe("handleErrors", () => {
  it("should return correct error for status 204", () => {
    const result = handleErrors(204);
    expect(result).toEqual({
      status: 523,
      message: "Documento não encontrado na base.",
    });
  });

  it("should return correct error for status 400 with custom message", () => {
    const result = handleErrors(400, "Bad Request");
    expect(result).toEqual({
      status: 400,
      message: "Bad Request",
    });
  });

  it("should return correct error for status 401", () => {
    const result = handleErrors(401);
    expect(result).toEqual({
      status: 401,
      message: "Consulta não autorizada, faça novamente o login.",
    });
  });

  it("should return correct error for status 403", () => {
    const result = handleErrors(403);
    expect(result).toEqual({
      status: 403,
      message:
        "A consulta não pode ser realizada. A aplicação não possui permissão suficiente.",
    });
  });

  it("should return correct error for status 404", () => {
    const result = handleErrors(404);
    expect(result).toEqual({
      status: 404,
      message: "Documento não encontrado na base.",
    });
  });

  it("should return correct error for status 0", () => {
    const result = handleErrors(0);
    expect(result).toEqual({
      status: 500,
      message: "Erro desconhecido, tente novamente mais tarde.",
    });
  });

  it("should return correct error for status 500", () => {
    const result = handleErrors(500);
    expect(result).toEqual({
      status: 500,
      message: "Erro desconhecido, tente novamente mais tarde.",
    });
  });

  it("should return correct error for status 503", () => {
    const result = handleErrors(503);
    expect(result).toEqual({
      status: 503,
      message: "Serviço indisponível. Tente novamente mais tarde.",
    });
  });

  it("should return undefined for undefined status", () => {
    const result = handleErrors(undefined);
    expect(result).toBeUndefined();
  });

  it("should return undefined for unhandled status", () => {
    const result = handleErrors(999);
    expect(result).toBeUndefined();
  });
});
