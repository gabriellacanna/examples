const Recommendation = () => {
  return (
    <>
      <h1 className="text-primary text-xl mb-4">Recomendação</h1>
      <p>
        Com as informações extraídas das nossas análises, é possível identificar
        quais clientes se tornam viáveis seguir em negociação e quais não
        atendem à sua política de crédito. Dessa maneira, a tomada de decisão
        será mais ágil, tendo um baixo valor de investimento, potencializando as
        vendas de maneira segura e lucrativa.
      </p>
      <p>
        A partir das duas recomendações, sendo elas <strong>"Aprovar"</strong> e{" "}
        <strong>"Reprovar"</strong>, nós reforçamos que a definição
        de seguir com a negociação é de responsabilidade do usuário e da sua
        empresa.
      </p>
      Dentro do status de  Aprovar, temos 5 de níveis de aprovação:
      <ul>
        <li>APROVAR (Melhor Perfil)</li>
        <li>APROVAR (Perfil Bom)</li>
        <li>AVALIAR COM CAUTELA (Perfil Mediano)</li>
        <li>AVALIAR COM MÁXIMA CAUTELA (Perfil Arriscado)</li>
        <li>REPROVAR (Perfil Muito Arriscado)</li>
      </ul>
    </>
  );
};

export default Recommendation;
