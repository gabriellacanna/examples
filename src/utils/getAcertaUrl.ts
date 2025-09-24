export const getAcertaUrl = (): string => {
  const hostname = window.location.hostname;

  if (hostname.includes("localhost") || hostname.includes("dev")) {
    return "https://cliente-dev.bvsnet.com.br/produto/pf-acerta-positivo-completo-novo";
  } else if (hostname.includes("hom")) {
    return "https://cliente-hom.bvsnet.com.br/produto/pf-acerta-positivo-completo-novo";
  } else {
    return "https://cliente.bvsnet.com.br/produto/pf-acerta-positivo-completo-novo";
  }
};
