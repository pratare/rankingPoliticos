# Epics do projeto

## Epic 01 — Ranking e descoberta

### Visão
Permitir que o usuário entre no produto, entenda rapidamente o objetivo e navegue por um ranking geral com filtros e busca.

### Objetivo de negócio
Apresentar uma visão inicial clara do desempenho dos parlamentares e ajudar o eleitor a localizar rapidamente quem deseja analisar.

### Entregas esperadas
- homepage com destaque para o ranking
- barra de filtros por cargo, estado, partido e busca
- listagem de parlamentares com nota final e dados principais
- navegação para página individual do parlamentar
- indicação visual da posição no ranking

### Critérios de aceite
- O usuário consegue visualizar o ranking sem necessidade de autenticação.
- A busca por nome atualiza a lista em tempo real.
- Os filtros por cargo, estado e partido reduzem o conjunto de parlamentares corretamente.
- A informação principal da linha do ranking é clara e legível em desktop e mobile.
- O usuário consegue acessar o perfil do parlamentar em no máximo um clique.

### Dependências
- dados mockados ou estruturados de parlamentares
- componente de tabela/listagem
- componentes de filtro e busca

---

## Epic 02 — Detalhamento e transparência do parlamentar

### Visão
Dar contexto à nota final, detalhando como o parlamentar performou por critério e mostrando que a avaliação é transparente.

### Objetivo de negócio
Transformar a nota final em informação compreensível, com explicação dos critérios, fontes e contexto de desempenho.

### Entregas esperadas
- página de perfil do parlamentar
- destaque da nota final
- resumo de desempenho por critério
- comparação com a média do ranking
- indicação de pontos fortes e fracos
- um único bloco no rodapé com metodologia, pesos por perfil, fontes e data de atualização
- seção de gestão de recursos, com recursos declarados e uso da verba, separada da nota principal

### Critérios de aceite
- A página mostra a nota final em destaque.
- O usuário consegue ver cada critério com nota, explicação e fonte.
- O sistema explica a diferença entre a nota do parlamentar e a média geral.
- A página expõe a metodologia, o perfil de avaliação aplicado e a data de atualização em um único bloco no rodapé, sem duplicação visual.
- A escolha do perfil (equilibrado, institucional, legislativo ou transparência) altera somente a ponderação dos critérios, sem misturar a gestão de recursos com a fórmula da nota principal.
- A seção de gestão de recursos mostra valores declarados e percentual de uso da verba, sem conflitar com a nota principal.
- O conteúdo é legível, acessível e não exige leitura técnica.

### Dependências
- estrutura de dados por critério
- modelo de cálculo da nota final
- componente de cards de critério
- modal ou seção de metodologia

---

## Epic 03 — Comparação entre parlamentares

### Visão
Permitir que o usuário compare diretamente dois parlamentares e entenda a diferença de desempenho em cada critério.

### Objetivo de negócio
Ajudar o cidadão a decidir com base em dados comparáveis e identificar melhor desempenho em critérios específicos.

### Entregas esperadas
- seleção de dois parlamentares
- comparação lado a lado por critério
- destaque da diferença entre as notas
- resumo textual de onde cada parlamentar se destaca
- retorno para o ranking ou perfil do parlamentar

### Critérios de aceite
- O usuário consegue selecionar dois parlamentares diferentes.
- A tela mostra a nota final e a pontuação por critério de ambos.
- A diferença entre os parlamentares aparece com clareza em cada linha de critério.
- O resumo textual fica curto, neutro e compreensível.
- A comparação pode ser acessada em poucos cliques a partir da funcionalidade principal.

### Dependências
- seleção de parlamentares
- componente de comparação por critério
- dados de notas por critério

---

## Epic 04 — Personalização por perfil e recalculo da nota

### Visão
Permitir que o usuário ajuste o peso dos critérios conforme suas prioridades pessoais e veja o impacto imediato na nota.

### Objetivo de negócio
Entregar uma experiência mais útil ao cidadão, permitindo que a avaliação reflita prioridades pessoais sem perder transparência.

### Entregas esperadas
- seleção de perfil predefinido (equilibrado, institucional, legislativo ou transparência) ou personalização manual
- sliders ou controles de peso por critério
- recalculo em tempo real da nota final
- comparação entre nota padrão e nota personalizada
- visualização do impacto por critério

### Critérios de aceite
- O usuário consegue alterar o peso de um critério sem quebrar a fórmula.
- A soma dos pesos permanece consistente e válida em qualquer perfil escolhido.
- A nota final recalcula imediatamente após a alteração.
- A interface mostra claramente quando a nota é padrão, por perfil ou personalizada.
- A escolha do perfil altera apenas a ponderação dos critérios e não a política de transparência de recursos nem a lógica da nota principal.
- O cálculo continua transparente e explicável ao usuário.

### Dependências
- lógica de cálculo ponderado
- controles de slider ou input numérico
- persistência local ou em memória do perfil do usuário

---

## Epic 05 — Sustentação de dados, fontes e atualização

### Visão
Garantir que o sistema mantenha a confiabilidade do produto por meio de fonte, atualização e rastreabilidade dos dados.

### Objetivo de negócio
Proteger a credibilidade do produto e garantir que os dados exibidos sejam verificáveis e consistentes.

### Entregas esperadas
- indicação de fonte para cada critério
- data de atualização da nota
- política de atualização periódica
- rastreio de origem dos indicadores
- blocos de transparência no produto

### Critérios de aceite
- Cada critério exibe a fonte pública de origem.
- A data de atualização está sempre visível na tela relevante.
- A aplicação mantém consistência entre dados exibidos e fontes cadastradas.
- O usuário consegue entender de onde vieram os indicadores.
- O produto segue a política de dados públicos e transparentes.

### Dependências
- gestão de metadados de dados
- estrutura de fonte e atualização
- documentação de fontes públicas

---

## Sequência recomendada de implementação

### Fase 1 — MVP
- Epic 01
- Epic 02
- Epic 03

### Fase 2 — Personalização e robustez
- Epic 04
- Epic 05

## Observação

Este backlog foi estruturado a partir do PRD e dos requisitos funcionais, focando em entregas claras, priorizadas e prontas para desenvolvimento. O escopo foi mantido alinhado ao objetivo do produto: transparência, comparação e confiabilidade.
