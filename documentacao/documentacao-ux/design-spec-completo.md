# Design Spec Completo — Avaliação de Parlamentares

## 1. Visão geral

Este documento define a experiência visual e de interação da plataforma de avaliação de parlamentares. O objetivo é apresentar uma interface clara, objetiva, confiável e responsiva, com foco em comparação de desempenho público e transparência de metodologia.

A solução deve ajudar o usuário a:
- entender a nota final rapidamente
- comparar parlamentares de forma justa
- ajustar critérios conforme sua prioridade
- verificar fontes e metodologia
- navegar sem depender de textos longos

---

## 2. Objetivo do produto

A plataforma deve apresentar uma nota final de 0 a 10 para deputados e senadores, calculada com base em critérios públicos e transparentes. A interface deve comunicar que a nota é comparativa, explicável e personalizável segundo o perfil de cada eleitor.

---

## 3. Público-alvo

### Usuários principais
- Eleitores interessados em comparar parlamentares
- Analistas políticos e pesquisadores
- Jornalistas e veículos de comunicação
- Organizações da sociedade civil
- Usuários que querem entender o desempenho parlamentar de forma simplificada

### Necessidades do usuário
- encontrar rapidamente um parlamentar
- entender como a nota foi calculada
- comparar desempenho por critério
- ajustar a relevância dos critérios
- confiar na metodologia e nas fontes

---

## 4. Princípios de experiência

### 4.1 Clareza
- A primeira tela deve responder: o que é o produto e como funciona.
- A nota final deve ser legível imediatamente.
- Textos explicativos devem ser curtos e objetivos.

### 4.2 Transparência
- A metodologia deve estar acessível em menos de 1 clique.
- Fontes e critérios devem ser explícitos.
- A lógica de cálculo deve ser visível e verificável.

### 4.3 Neutralidade
- Evitar linguagem emocional ou partidária.
- Priorizar linguagem técnica, objetiva e factual.

### 4.4 Confiança
- Elementos visuais de ranking e indicadores devem parecer confiáveis.
- Dados e evidências devem ser facilmente rastreáveis.

### 4.5 Acessibilidade
- Contraste adequado em textos e fundos
- Botões e campos com foco visível
- Layout adaptado para leitura em mobile

---

## 5. Arquitetura de informação

A estrutura da aplicação deve seguir este fluxo principal:

1. Homepage
2. Filtros e busca
3. Ranking geral
4. Visualização de parlamentar
5. Comparação de parlamentares
6. Personalização de pesos
7. Metodologia e fontes
8. Rodapé com transparência e informações públicas

### Estrutura resumida

- Header
- Hero section
- Filtros
- Ranking principal
- Cards de critérios
- Metodologia
- Perfil do parlamentar
- Comparação
- Rodapé

---

## 6. Layout e hierarquia visual

### Hierarquia
1. Nota final do parlamentar
2. Ranking geral
3. Filtros e busca
4. Critérios principais
5. Texto explicativo e metodologia
6. Dados complementares e rodapé

### Regras de hierarquia
- A nota principal deve ser o maior destaque visual da interface.
- O filtro deve ser acessível sem atrapalhar a leitura do ranking.
- A página deve funcionar sem excesso de informação na primeira dobra.
- Cada seção deve ter um título claro e objetivo.

---

## 7. Padrões de layout

### Grid base
- Desktop: 12 colunas
- Tablet: 8 colunas
- Mobile: 1 coluna

### Espaçamento
- Baseado em escala de 4px
- Margens e paddings consistentes em todas as seções

### Alinhamento
- Conteúdo centralizado em container máximo de 1200px
- Blocos com espaçamento uniforme
- Cards com alinhamento vertical consistente

### Componentes de layout
- Header com navegação e ação principal
- Hero com título, subtexto e CTAs
- Filtros em linha em desktop e empilhados em mobile
- Ranking em tabela ou em cards
- Perfil em duas colunas: resumo e detalhamento

---

## 8. Design tokens

### 8.1 Cores

| Token | Valor | Uso |
|---|---|---|
| bg-base | #F5F7FA | fundo geral |
| surface | #FFFFFF | cards e painéis |
| surface-alt | #EEF2F7 | áreas secundárias |
| text-primary | #14213D | textos principais |
| text-secondary | #4B5563 | textos complementares |
| border | #D9E2EC | divisórias e contornos |
| primary | #1D4ED8 | ações e destaques |
| primary-strong | #1E3A8A | hover e destaque maior |
| success | #16A34A | desempenho positivo |
| warning | #F59E0B | atenção e valores médios |
| danger | #DC2626 | alerta ou desempenho crítico |
| neutral | #6B7280 | textos neutros e indicadores |

### 8.2 Tipografia

| Token | Valor |
|---|---|
| font-family | Inter, Segoe UI, Arial, sans-serif |
| text-xs | 12px |
| text-sm | 14px |
| text-md | 16px |
| text-lg | 20px |
| text-xl | 28px |
| text-2xl | 36px |

### 8.3 Espaçamento

| Token | Valor |
|---|---|
| space-1 | 4px |
| space-2 | 8px |
| space-3 | 12px |
| space-4 | 16px |
| space-5 | 20px |
| space-6 | 24px |
| space-8 | 32px |
| space-10 | 40px |
| space-12 | 48px |

### 8.4 Raio

- radius-sm: 8px
- radius-md: 12px
- radius-lg: 16px
- radius-xl: 24px

### 8.5 Sombras

- shadow-sm: 0 1px 2px rgba(20, 33, 61, 0.06)
- shadow-md: 0 6px 18px rgba(20, 33, 61, 0.12)
- shadow-lg: 0 14px 28px rgba(20, 33, 61, 0.18)

---

## 9. Tipografia e linguagem

### Fontes
- Use uma fonte limpa e moderna, com boa legibilidade em telas.
- Priorizar “Inter” ou similar, com suporte para sistemas operacionais.

### Regras de escrita
- Títulos: curtos, objetivos e diretos
- Texto geral: acessível e informativo
- Label e filtros: curtos e claros
- Microcopy: consistentes em todo o produto

### Tom de voz
- Informativo
- Objetivo
- Confiante
- Neutral

---

## 10. Componentes principais

### 10.1 Header
- logo ou marca
- links principais
- botão de menu em mobile
- destaque para ação principal

### 10.2 Hero section
- título principal
- sub-título explicando a proposta
- CTA principal: Ver ranking
- CTA secundário: Como a nota é calculada?

### 10.3 Filtros
- busca por nome
- cargo
- estado
- partido
- legislatura (opcional)
- botão aplicar filtros

### 10.4 Ranking geral
- tabela com ranking
- colunas: posição, nome, cargo, estado, partido, nota
- destaque para top 3
- botão de ordenação por critério

### 10.5 Cards de critérios
- nome do critério
- descrição curta
- ícone
- percentual ou valor da nota
- status visual

### 10.6 Card de parlamentar
- avatar ou foto
- nome
- cargo e UF
- partido
- nota final
- botão “Ver perfil”

### 10.7 Perfil do parlamentar
- nome e dados básicos
- nota geral
- evolução temporal
- critério por critério
- fontes e evidências

### 10.8 Painel de personalização
- slider por critério
- ajuste em porcentagem
- visual de impacto em tempo real
- botão para salvar perfil

### 10.9 Modal
- explicação da nota
- descrição do critério
- fontes
- ação de fechar

### 10.10 Rodapé
- fontes públicas
- última atualização
- transparência
- política de dados
- links auxiliares

---

## 11. Estados dos componentes

### Botões
- default
- hover
- pressed
- disabled
- focus-visible

### Inputs
- default
- hover
- focus
- error
- filled

### Cards
- default
- hover
- selected
- emphasized

### Tabela
- row default
- hover state
- selected row
- first place highlight

---

## 12. Interações e comportamentos

### Navegação
- Header sempre visível em desktop
- Menu mobile em drawer ou menu recolhido

### Busca e filtros
- Atualização em tempo real ou após ação do usuário
- Feedback visual de resultados atualizados

### Personalização
- Ajustar pesos deve atualizar o cenário de forma imediata
- Sistema deve ilustrar impacto comparativo entre perfil neutro e personalizado

### Comparação
- Permitir comparação lado a lado
- Diferenciar notas por critério com barras ou escala visual

### Metodologia
- Botão ou link visível em todas as telas relevantes
- Conteúdo explicativo em modal ou página dedicada

---

## 13. Responsividade

### Desktop
- layout em múltiplas colunas
- ranking em tabela ampla
- cards em grid compacto

### Tablet
- redução de espaçamento
- telas com 2 colunas em blocos principais
- filtros em múltiplas linhas

### Mobile
- navegação compactada
- filtros em pilha vertical
- ranking em rolagem horizontal
- cards empilhados
- botões com altura mínima confortável para toque

---

## 14. Acessibilidade

- mínimo de contraste de 4.5:1 para texto comum
- foco visível em elementos interativos
- leitura compatível com leitor de tela
- suporte a zoom até 200%
- labels sempre presentes em campos de formulário
- ícones devem ter texto ou aria-label quando necessários

---

## 15. Diretrizes de conteúdo

- Use textos breves e objetivos
- Explicações de critérios devem ser simples e verificáveis
- A primeira tela deve priorizar os dados, e não o texto
- O produto deve transmitir confiança por meio de clareza e evidência

---

## 16. Critérios de sucesso da interface

A interface será bem-sucedida se:
- o usuário entende em poucos segundos o objetivo do produto
- a nota final é percebida como clara e confiável
- a metodologia pode ser consultada sem esforço
- a comparação entre parlamentares é simples
- a personalização de pesos funciona de forma intuitiva
- o produto se adapta adequadamente a telas menores

---

## 17. Wireframe conceitual

```text
┌─────────────────────────────────────────────────────────────────────┐
a HEADER: logo | ranking | metodologia | comparar | menu
├─────────────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                        │
│ Título principal                                                     │
│ Subtítulo explicando avaliação                                     │
│ [Ver ranking] [Como a nota é calculada?]                           │
├─────────────────────────────────────────────────────────────────────┤
│ FILTROS: cargo | estado | partido | buscar parlamentar             │
├─────────────────────────────────────────────────────────────────────┤
│ RANKING GERAL                                                       │
│ Posição | Nome | Cargo | Estado | Partido | Nota final             │
│ 1 | X | Dep. | SP | PSX | 8,7                                      │
│ 2 | Y | Sen. | RJ | ABC | 8,4                                      │
│ 3 | Z | Dep. | MG | XYZ | 8,1                                      │
├─────────────────────────────────────────────────────────────────────┤
│ CRITÉRIOS PRINCIPAIS                                                │
│ [Presença] [Produção legislativa] [Relatoria]                    │
│ [Votações] [Transparência] [Atendimento]                          │
├─────────────────────────────────────────────────────────────────────┤
│ METODOLOGIA & TRANSPARÊNCIA                                         │
│ Fórmula | pesos | fontes | última atualização                     │
├─────────────────────────────────────────────────────────────────────┤
│ RODAPÉ                                                             │
│ Fontes públicas | Dados | Transparência | Política de dados       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 18. Resumo executivo

O design da plataforma deve ser simples, híbrido entre dashboard analítico e interface pública de transparência. A linguagem visual deve favorecer clareza, dados verificáveis e comparação de desempenho, sem perder o foco em confiança e entendimento rápido.

A experiência deve comunicar: “a nota existe para explicar, comparar e orientar, não para julgar sem contexto.”
