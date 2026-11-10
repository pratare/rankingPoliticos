# PRD — Avaliação de Parlamentares por Nota 0 a 10

## 1. Resumo executivo

Este produto será uma plataforma web que avalia deputados federais e senadores com uma nota final de 0 a 10, combinando:

- indicadores quantitativos
- indicadores qualitativos
- personalização de pesos por perfil do eleitor

A ideia central é permitir que o usuário escolha o que considera mais importante na atuação parlamentar, como presença, produção legislativa, relatoria, transparência e atendimento ao eleitor. O resultado deve ser claro, transparente, comparável e baseado em fontes públicas.

O sistema não pretende afirmar uma verdade absoluta sobre cada parlamentar. Em vez disso, ele oferece um indicador comparativo e contextualizado, permitindo que cada eleitor veja a nota através do seu próprio conjunto de prioridades.

---

## 2. Problema

O eleitor geralmente recebe informações fragmentadas sobre a atuação dos parlamentares: presença em votações, número de projetos, discursos isolados, dados de campanha e reportagens pontuais. Isso dificulta a comparação entre parlamentares e piora a tomada de decisão informada.

Falta uma ferramenta que:

- consolide indicadores relevantes
- compare parlamentares usando critérios claros
- permita ajustes de prioridades de acordo com o eleitor
- apresente dados com fontes e metodologia explícitas

---

## 3. Objetivo do produto

Criar uma plataforma que avalie parlamentares com uma nota final de 0 a 10 e permita ao usuário ajustar os pesos dos critérios conforme suas prioridades.

### Objetivos principais

- aumentar a transparência sobre o desempenho parlamentar
- permitir comparação objetiva entre deputados e senadores
- personalizar a nota de acordo com o perfil do eleitor
- apresentar metodologia e fontes de forma visível
- apoiar a decisão do eleitor com dados e contexto

---

## 4. Usuários e personas

### 4.1 Usuários principais

- Eleitores que querem avaliar o mandato
- Analistas políticos e pesquisadores
- Jornalistas e veículos de comunicação
- Organizações da sociedade civil
- Usuários interessados em rankings e comparações

### 4.2 Personas

#### Persona A — Eleitor com foco em responsabilidade institucional

Prioriza:

- presença em sessões
- comparecimento em comissões
- participação em votações
- compromisso institucional

#### Persona B — Eleitor com foco em ação legislativa

Prioriza:

- produção de projetos
- relatorias
- qualidade das propostas
- impacto legislativo

#### Persona C — Eleitor com foco em transparência

Prioriza:

- prestação de contas
- acesso à informação
- respostas públicas
- clareza e consistência de posicionamento

---

## 5. Proposta de valor

A plataforma entrega valor ao usuário porque:

- centraliza dados sobre a atuação parlamentar
- ajuda a comparar parlamentares com critérios comuns
- permite customizar a nota conforme prioridades pessoais
- torna a avaliação mais transparente e menos arbitrária
- oferece um ranking com contexto, e não apenas números isolados

---

## 6. Visão geral da solução

A solução será uma plataforma web com:

- busca por parlamentar
- filtros por estado, partido, cargo e legislatura
- ranking geral e por critério
- perfil detalhado do parlamentar
- nota final por perfil de avaliação
- painel de personalização de pesos
- indicadores detalhados por critério
- explicação da metodologia e das fontes usadas

---

## 7. Modelo de avaliação

A nota final será calculada por média ponderada:

NotaFinal = (Σ (Peso_i × Nota_i)) / Σ Peso_i

Onde:

- Peso_i = importância atribuída ao critério
- Nota_i = nota do critério em escala de 0 a 10

### Exemplo de pesos

- presença e assiduidade: 30
- relatoria: 20
- produção legislativa: 25
- votação e posicionamento: 15
- transparência: 10

Se o eleitor achar que presença é mais importante, ele pode aumentar esse peso e reduzir os demais.

---

## 8. Critérios de avaliação

### 8.1 Critérios sugeridos

| Critério | Exemplo de indicador | Peso padrão sugerido |
|---|---|---:|
| Presença e assiduidade | comparecimento em sessões, comissões e votações | 20 |
| Relatoria | número e qualidade de relatórios em comissões | 15 |
| Produção legislativa | projetos de lei, PLs e iniciativas apresentadas | 20 |
| Participação em votações | frequência e posicionamento em pautas relevantes | 15 |
| Qualidade das propostas | impacto, clareza, viabilidade e relevância | 15 |
| Transparência e prestação de contas | respostas públicas, agenda, divulgação de dados | 10 |
| Atendimento ao eleitor | canal de comunicação, mobilização e resposta | 5 |

### 8.2 Regras de configuração

- cada critério deve ter peso configurável
- o total dos pesos deve somar 100
- o usuário pode escolher perfil padrão ou personalizado
- o sistema deve mostrar o impacto de cada mudança em tempo real

### 8.3 Fontes e rastreabilidade do MVP

Para manter a credibilidade do produto, a nota final deve ser construída a partir de dados públicos, oficiais e rastreáveis. O sistema deve armazenar, para cada critério, a fonte principal, a data de coleta e a metodologia de cálculo aplicada.

A regra principal do MVP é: a nota final e o detalhamento por critério devem estar sempre vinculados a uma evidência pública. Cada valor exibido no ranking, no perfil do parlamentar e na comparação deve indicar:

- a fonte oficial que originou o dado
- a data da coleta ou da última atualização
- o critério ao qual o dado pertence
- se o dado foi calculado ou diretamente extraído
- quando o dado estiver ausente, a indicação explícita dessa lacuna

### 8.4 Matriz mínima de dados por critério

| Critério | Variável principal | Fonte oficial esperada | Observação |
|---|---|---|---|
| Presença e assiduidade | comparecimento em sessões e comissões | Câmara dos Deputados / Senado Federal | usar indicadores consolidados por período |
| Produção legislativa | projetos e proposições | Câmara dos Deputados / Senado Federal | incluir quantidade por legislatura |
| Relatoria | relatorias assumidas e concluídas | Câmara dos Deputados / Senado Federal | considerar papel em comissões |
| Participação em votações | presença em votações relevantes | registros de plenário e votações | necessidade de padronização por categoria |
| Transparência e prestação de contas | divulgação de dados e regularidade institucional | Portal da Transparência / canais oficiais | evidência institucional e pública |
| Atendimento ao eleitor | presença em eventos e atuação regional | canais oficiais e registros públicos | usar como critério complementar |

Essa estrutura garante que o produto não seja apenas um ranking visual, mas uma ferramenta com base documental, auditável e comparável.

---

## 9. Personalização por perfil do eleitor

O sistema deve permitir que o usuário escolha seu perfil de avaliação ou personalize manualmente os pesos.

### Perfis sugeridos

- Equilibrado
- Responsabilidade institucional
- Ação legislativa
- Transparência
- Base eleitoral

### Formas de personalização

- sliders por critério
- ajustes em porcentagem
- seleção por prioridade alta/média/baixa
- comparação entre nota neutra e nota personalizada
- salvamento de perfil do usuário

---

## 10. Combinação entre avaliação quantitativa e qualitativa

### 10.1 Quantitativa

Uso de dados objetivos, por exemplo:

- presença em plenário
- frequência em comissões
- número de projetos apresentados
- número de relatorias
- comparecimento em votações
- presença em audiências públicas
- ações de fiscalização

### 10.2 Qualitativa

Avaliação estruturada de elementos menos objetivos, como:

- clareza das propostas
- impacto social das ideias
- coerência entre discurso e prática
- qualidade da justificativa em temas relevantes
- consistência no tratamento de assuntos públicos

### 10.3 Rubrica qualitativa

- 0 = ruim ou ausente
- 3 = fraco
- 5 = regular
- 7 = bom
- 10 = excelente

Essa rubrica ajuda a reduzir a subjetividade e transforma a avaliação qualitativa em uma escala comparável.

---

## 11. Requisitos funcionais

### 11.1 Busca e ranking

- buscar parlamentares por nome
- filtrar por estado, partido, cargo e legislatura
- ver ranking geral
- ver ranking por critério
- comparar parlamentares em uma mesma tela

### 11.2 Perfil do parlamentar

- mostrar nota geral
- detalhar notas por critério
- exibir histórico por período
- mostrar gráficos de evolução
- exibir fontes e evidências
- apresentar explicação da nota

### 11.3 Personalização

- ajustar pesos por critério
- salvar perfil do usuário
- comparar perfil neutro com perfil personalizado
- atualizar o ranking em tempo real após ajuste de pesos

### 11.4 Transparência e fontes

- mostrar as fontes de cada dado
- indicar o período da avaliação
- declarar se o dado é quantitativo ou qualitativo
- indicar a fórmula de cálculo
- mostrar o número de indicadores usados na nota

### 11.5 Administração

- criar e editar critérios
- ajustar pesos padrão
- registrar fontes
- revisar notas qualitativas
- auditar alterações na metodologia

---

## 12. Requisitos não funcionais

- tempo de carregamento adequado para dashboards e rankings
- navegação simples e acessível
- visualização clara de notas e gráficos
- interface responsiva em desktop e mobile
- segurança para o painel administrativo
- escalabilidade para crescer com novo volume de dados

---

## 13. Estrutura funcional do site

### Página inicial

- busca por parlamentar
- ranking geral
- filtros por Estado, partido, cargo e perfil de avaliação

### Perfil do parlamentar

- nota geral
- breakdown por critério
- histórico por ano
- comparação com colegas
- evidências e fontes
- gráficos de desempenho

### Personalização

- define pesos dos critérios
- escolhe perfil do usuário
- compara nota neutra e nota personalizada

### Painel administrativo

- cadastro de critérios
- edição de pesos
- importação de dados
- validação de avaliações qualitativas
- auditoria de alterações

---

## 14. Dados e fontes

### Dados quantitativos

- presença em sessões
- comparecimento em comissões
- participação em votações
- projetos e proposições
- relatorias
- audiências e debates públicos

### Dados qualitativos

- clareza das propostas
- impacto das medidas
- consistência de discurso e prática
- qualidade da argumentação
- relevância da atuação pública

### Fontes recomendadas

- Câmara dos Deputados
- Senado Federal
- registros oficiais de votações
- bancos de dados de projetos de lei
- relatórios de comissões
- materiais públicos de comunicação e visibilidade

---

## 15. Estratégia de MVP

### Fase 1 — MVP

- critérios fixos com pesos ajustáveis
- nota baseada em dados públicos
- ranking por partido e estado
- painel simples de comparação
- nota final em escala 0 a 10

### Fase 2 — Avaliação qualitativa

- rubricas para discursos e projetos
- análise de texto com revisão humana ou assistida por IA
- ponderação das notas qualitativas

### Fase 3 — Plataforma completa

- múltiplos perfis de eleitor
- comparações avançadas
- histórico por mandato
- exportação de relatórios

---

## 16. Riscos e mitigação

### Risco 1: avaliação subjetiva demais
Mitigação: rubricas próprias para cada critério e separação entre análise qualitativa e dados objetivos.

### Risco 2: dados incompletos
Mitigação: indicar ausência de dados e reduzir o peso do critério quando não houver evidência suficiente.

### Risco 3: politização da avaliação
Mitigação: manter metodologia pública, usar fontes oficiais e deixar o cálculo visível.

### Risco 4: percepção de “verdade absoluta”
Mitigação: apresentar a nota como ferramenta comparativa e contextualizada, não como julgamento definitivo.

---

## 17. Métricas de sucesso

- número de usuários ativos
- taxa de uso da personalização de pesos
- número de parlamentares avaliados
- taxa de retenção de usuários
- tempo médio de sessão
- frequência de uso de filtros e comparações
- quantidade de perfis salvos

---

## 18. Critério de aceitação do MVP

O MVP será considerado entregue quando:

- a plataforma conseguir buscar e comparar parlamentares
- a nota final puder ser calculada por peso personalizado
- cada critério tiver metodologia e fonte visível
- o sistema apresentar pelo menos 5 critérios principais
- o usuário consiga alterar pesos e ver a nota atualizar em tempo real
- a ferramenta manter transparência sobre a lógica do cálculo

---

## 19. Conclusão

Este produto é viável e atende a uma necessidade clara do eleitor: comparar parlamentares com critérios transparentes, relevantes e personalizáveis.

A grande diferencial da solução está na combinação de:

- avaliação quantitativa
- avaliação qualitativa
- personalização de pesos por perfil do eleitor
- transparência metodológica

Com isso, o sistema permite que cada usuário interprete a atuação parlamentar de acordo com o que considera mais importante, sem perder a consistência da avaliação.

---

## 20. Próximos passos sugeridos

1. validar com usuários reais o conjunto de critérios
2. confirmar fontes oficiais de cada dado
3. definir arquitetura técnica do MVP
4. criar backlog inicial de desenvolvimento
5. iniciar protótipo de interface e fluxo de avaliação

