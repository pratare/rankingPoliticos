# Planejamento de implementação por sprints

## Visão geral

Este documento traduz o backlog em uma sequência prática de execução, com foco em criar valor para o usuário no menor número de ciclos possível. A implementação foi organizada em sprints que respeitam a prioridade funcional do produto e o estado atual do protótipo em React.

## Mapa de componentes do projeto

A base da implementação atual já está organizada em:

- [react-app/src/app/App.jsx](../../react-app/src/app/App.jsx)
- [react-app/src/features/ranking](../../react-app/src/features/ranking)
- [react-app/src/components](../../react-app/src/components)
- [react-app/src/data/mockData.js](../../react-app/src/data/mockData.js)
- [react-app/src/styles.css](../../react-app/src/styles.css)

As entregas abaixo devem seguir a estrutura atual da aplicação e ampliar os componentes já existentes.

---

## Sprint 1 — Ranking, busca e navegação básica

### Objetivo

Entregar a homepage funcional com ranking, filtros e navegação para o perfil do parlamentar.

### Entregas

#### Tarefa S1.01 — Finalizar a homepage de ranking
- Ajustar a estrutura da homepage para refletir o wireframe de homepage.
- Garantir destaque para a nota final e para a lista de parlamentares.
- Validar que a página comunica clareza, neutralidade e rapidez de leitura.

#### Tarefa S1.02 — Implementar filtros de busca
- Criar filtros por cargo, estado, partido e busca por nome.
- Garantir atualização em tempo real da listagem.
- Exibir mensagem de ausência de resultados quando necessário.

#### Tarefa S1.03 — Ordenar ranking por nota
- Ordenar os parlamentares por nota decrescente.
- Mostrar posição no ranking de forma clara.
- Exibir dados mínimos por linha: nome, cargo, UF, partido e nota final.

#### Tarefa S1.04 — Navegação para perfil do parlamentar
- Criar link ou ação para abrir o detalhe do parlamentar.
- Preparar a estrutura de rotas ou estado de navegação para perfil.

### Critérios de conclusão
- O usuário consegue abrir a homepage e visualizar o ranking principal.
- Os filtros funcionam corretamente combinando critérios.
- A lista atualiza em tempo real sem recarregar a página.
- Um usuário consegue acessar o detalhe de um parlamentar em poucos cliques.

### Componentes envolvidos
- Header
- Hero
- Filters
- RankingTable
- Footer

---

## Sprint 2 — Detalhamento do parlamentar, transparência e gestão de recursos

### Objetivo

Entregar a página de detalhe do parlamentar com critério, explicação da metodologia e contexto de governança financeira, sem misturar esses dados com a nota final.

### Entregas

#### Tarefa S2.01 — Criar página de perfil do parlamentar
- Estruturar cabeçalho com nome, cargo, UF, partido e nota final.
- Exibir comparação com a média do ranking.
- Apresentar pontos fortes e pontos fracos do parlamentar.

#### Tarefa S2.02 — Exibir detalhamento por critério
- Renderizar cada critério com nota, explicação curta e fonte.
- Garantir que cada bloco seja legível e acessível.
- Incluir destaque visual para critérios melhor e pior avaliados.

#### Tarefa S2.03 — Implementar seção de metodologia no rodapé
- Exibir a fórmula de cálculo da média ponderada.
- Mostrar os pesos dos critérios.
- Incluir fontes públicas e data de atualização.
- Garantir que essa seção apareça em um único bloco final, localizado no rodapé da página.

#### Tarefa S2.04 — Implementar seção de gestão de recursos
- Exibir recursos declarados e percentual de uso da verba.
- Manter essa seção separada da nota final, como contexto de transparência e governança.
- Incluir fonte de dados, legenda e explicação de como interpretar o valor financeiro.
- Definir que essa informação também fica dentro do bloco final do rodapé, sem duplicar a metodologia principal.

#### Tarefa S2.05 — Criar modal ou bloco de transparência
- Permitir que o usuário abra uma explicação da nota em um clique.
- Garantir que o texto seja curto, claro e neutro.
- Manter botão de fechar visível e intuitivo.
- Não duplicar o bloco de metodologia na parte superior da tela.

### Critérios de conclusão
- A página do parlamentar comunica claramente por que a nota foi atribuída.
- O usuário consegue entender a fórmula e os pesos.
- Cada critério tem fonte e contexto visível.
- Existe apenas um bloco final de metodologia e transparência no rodapé da página.
- A seção de gestão de recursos oferece contexto financeiro sem alterar a nota principal.
- A experiência transmite confiança, clareza pública e transparência documental.

### Componentes envolvidos
- pagina de perfil do parlamentar
- CriteriaGrid
- Methodology
- componentes de cards de critério

---

## Sprint 3 — Comparação entre parlamentares

### Objetivo

Permitir que o usuário compare desempenho entre dois parlamentares com visão objetiva e legível.

### Entregas

#### Tarefa S3.01 — Implementar seleção de parlamentares
- Criar seletor para parlamentar A e parlamentar B.
- Permitir filtro por cargo, estado ou partido antes da comparação.
- Validar que a escolha funciona em vários cenários.

#### Tarefa S3.02 — Exibir tabela comparativa
- Mostrar nota final e desempenho por critério em linhas separadas.
- Incluir diferença entre os parlamentares.
- Destacar os critérios onde há vantagem para cada parlamentar.

#### Tarefa S3.03 — Criar resumo comparativo
- Gerar um texto curto explicando quem venceu em cada área principal.
- Mantém tom neutro, objetivo e verificável.

#### Tarefa S3.04 — Integrar retorno de navegação
- Permitir voltar ao ranking e abrir perfil dos parlamentares comparados.
- Garantir que a jornada continue fluida entre as telas.

### Critérios de conclusão
- O usuário consegue comparar duas pessoas em poucos cliques.
- O resultado da comparação é fácil de visualizar.
- A tela explica a diferença de forma objetiva.
- A comparação reforça a credibilidade do produto.

---

## Sprint 4 — Personalização por perfil e dados sustentáveis

### Objetivo

Permitir ajuste de pesos e manter a confiabilidade dos dados no produto.

### Entregas

#### Tarefa S4.01 — Implementar perfil padrão e personalizado
- Criar perfis semânticos, como equilibrado, institucional, legislativo e transparência.
- Permitir personalização manual por critério.
- Garantir que a seleção do perfil altere a ponderação apenas do cálculo principal, sem misturar a nota com os dados de gestão de recursos.

#### Tarefa S4.02 — Recalcular nota em tempo real
- Reaplicar a fórmula média ponderada quando houver alteração de peso.
- Garantir que o valor final e os critérios acompanhem a mudança.
- Manter a escala final de 0 a 10 e a comparação entre perfis transparente.

#### Tarefa S4.03 — Exibir impacto das mudanças
- Mostrar diferença entre nota padrão, nota por perfil e nota personalizada.
- Destacar quais critérios são mais relevantes para usuário.

#### Tarefa S4.04 — Garantir rastreabilidade dos dados
- Exibir fonte e data de atualização em cada critério principal.
- Incluir rastreabilidade também para valores de gestão de recursos e uso da verba.
- Validar que os indicadores são públicos, consistentes e explicados de forma transparente.

### Critérios de conclusão
- O usuário consegue customizar o peso dos critérios sem perder clareza.
- O sistema recalcula a nota corretamente para qualquer perfil selecionado.
- A origem dos dados continua visível e confiável.
- A gestão de recursos e a metodologia principal seguem a mesma política de transparência e rastreabilidade, porém em blocos separados e com papéis distintos.

---

## Priorização recomendada

### Fase 1 — MVP
- Sprint 1
- Sprint 2
- Sprint 3

### Fase 2 — Personalização e robustez
- Sprint 4

### Fase 3 — Evolução
- histórico de desempenho
- comparação de três parlamentares
- exportação e compartilhamento
- melhoria de gestão de conteúdo e dados

---

## Definition of Done por item

Uma tarefa está pronta quando:

- foi validada visualmente no protótipo ou interface
- está alinhada ao PRD e ao UX
- atende aos critérios de aceite da história correspondente
- respeita acessibilidade, leitura e responsividade
- mantém transparência dos critérios e das fontes
- não quebra a consistência entre nota final e dados detalhados

---

## Observações finais

Este planejamento foi desenhado para ser executado de forma incremental, reduzindo risco e mantendo o foco em valor para o usuário. A primeira entrega deve priorizar a descoberta, comparação e credibilidade, que são os pilares do produto.
