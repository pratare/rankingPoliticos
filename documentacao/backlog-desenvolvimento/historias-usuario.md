# Histórias de usuário

## História US-01 — Consultar ranking geral

### Como um
usuário interessado em política e transparência

### Quero
visualizar um ranking geral de parlamentares

### Para
entender rapidamente quem está melhor posicionado na avaliação

### Critérios de aceite
- A homepage exibe uma lista ou tabela de parlamentares em ordem decrescente de nota.
- A tabela mostra nome, cargo, partido, estado e nota final.
- A nota e a posição no ranking ficam visíveis sem rolagem extra em desktop.
- O usuário consegue navegar para o perfil do parlamentar em um clique.

### Tarefas técnicas sugeridas
- criar estrutura de dados para ranking
- implementar componente de tabela/lista
- criar filtro de pesquisa por nome
- ordenar os parlamentares por nota final

---

## História US-02 — Filtrar parlamentares por critérios

### Como um
usuário da plataforma

### Quero
aplicar filtros por cargo, estado, partido e busca

### Para
encontrar facilmente parlamentares relevantes para mim

### Critérios de aceite
- O usuário pode filtrar por cargo, estado e partido.
- A busca por nome atualiza o ranking instantaneamente.
- Os filtros combinam entre si sem inconsistência.
- Quando não houver resultados, a interface informa claramente o estado da busca.

### Tarefas técnicas sugeridas
- implementar filtros dinâmicos
- criar estado de aplicação para combinar filtros
- atualizar a lista após cada mudança
- tratar cenários vazios

---

## História US-03 — Consultar perfil do parlamentar

### Como um
eleitor ou pesquisador

### Quero
acessar a página do parlamentar

### Para
entender melhor a nota e os critérios que a justificam

### Critérios de aceite
- A página mostra nome, cargo, UF, partido e posição no ranking.
- A nota final está destacada visualmente.
- O usuário pode consultar a nota por critério e a comparação com a média.
- A página exibe fontes públicas e data de atualização.

### Tarefas técnicas sugeridas
- criar rota para detalhe do parlamentar
- compor layout do perfil
- renderizar notas por critério
- implementar seção de metodologia e fontes

---

## História US-04 — Entender o porquê da nota

### Como um
usuário da plataforma

### Quero
ver o detalhamento dos critérios e o impacto deles na nota final

### Para
entender a lógica da avaliação e confiar no resultado

### Critérios de aceite
- Cada critério possui nome, nota, explicação curta e fonte pública.
- A comparação com a média do ranking aparece de maneira clara.
- O usuário consegue identificar pontos fortes e pontos fracos do parlamentar.
- O produto usa linguagem acessível para explicar o cálculo.

### Tarefas técnicas sugeridas
- estruturar modelo de critério
- implementar gráfico ou card por critério
- criar comparação de média x parlamentar
- incluir explicações em texto curto

---

## História US-05 — Comparar dois parlamentares

### Como um
usuário que deseja decidir entre opções

### Quero
comparar dois parlamentares lado a lado

### Para
identificar diferenças objetivas no desempenho

### Critérios de aceite
- O usuário pode selecionar dois parlamentares diferentes.
- A comparação mostra nota final e desempenho por critério.
- A diferença entre os dois é evidente visualmente.
- O resumo textual comunica de forma neutra qual parlamentar vence em cada área.

### Tarefas técnicas sugeridas
- criar fluxo de seleção de comparativos
- montar tabela comparativa
- calcular diferença por critério
- criar resumo textual do resultado

---

## História US-06 — Consultar metodologia e fontes

### Como um
usuário preocupado com transparência

### Quero
entender como a nota foi calculada e de onde vieram os dados

### Para
validar que a avaliação é baseada em metodologia clara e fontes públicas

### Critérios de aceite
- O modal ou seção de metodologia mostra fórmula, pesos e critério.
- A interface demonstra a relação entre cada critério e a nota final.
- As fontes públicas aparecem de forma visível.
- A data de atualização da metodologia e dos indicadores fica visível.

### Tarefas técnicas sugeridas
- implementar modal de metodologia
- criar documentação textual da fórmula
- exibir lista de fontes públicas
- incorporar data de atualização

---

## História US-07 — Ajustar pesos conforme preferências

### Como um
eleitor com prioridades específicas

### Quero
ajustar os pesos dos critérios para refletir minha opinião sobre o que importa mais

### Para
obter uma avaliação mais alinhada ao meu perfil

### Critérios de aceite
- O usuário pode aumentar ou reduzir o peso de cada critério.
- A soma total dos pesos permanece válida em qualquer perfil selecionado.
- O sistema oferece perfis predefinidos como equilibrado, institucional, legislativo e transparência.
- A nota final recalcula em tempo real conforme a ponderação do perfil escolhido.
- A interface mostra a diferença entre a nota padrão, a nota por perfil e a nota personalizada.
- A gestão de recursos continua em uma seção separada de transparência e não entra na fórmula da nota principal.

### Tarefas técnicas sugeridas
- definir modelo de pesos por perfil
- criar controles interativos de peso
- implementar cálculo em tempo real
- criar comparação entre perfis

---

## História US-08 — Entender que a avaliação é pública e rastreável

### Como um
usuário e pesquisador

### Quero
ver a origem, a fonte e a data de cada indicador

### Para
confiar e verificar que a plataforma não está baseando a nota em informação arbitrária

### Critérios de aceite
- Cada critério ou indicador tem indicação de fonte pública.
- Cada valor apresenta data de atualização ou coleta.
- O produto deixa explícito que a metodologia é pública.
- O usuário consegue localizar a origem dos dados sem sair da interface principal.

### Tarefas técnicas sugeridas
- definir estrutura de metadados de dado
- mapear campos de origem e data
- incluir fontes em cada card e na página detalhada
- padronizar a apresentação visual

---

## Priorização sugerida

### Sprint 1
- US-01
- US-02
- US-03
- US-04

### Sprint 2
- US-05
- US-06

### Sprint 3
- US-07
- US-08

## Observação

As histórias foram estruturadas para servir como base de planejamento técnico, priorização de entregas e implementação incremental. A ordem foi definida para maximizar valor do usuário no menor número de iterações, mantendo sempre a transparência como princípio central do produto.
