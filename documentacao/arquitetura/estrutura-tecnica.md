# Estrutura técnica do projeto

## 1. Estrutura atual do repositório

```text
bmad-first-project/
├── package.json
├── PRD-avaliacao-parlamentares.md
├── documentacao/
│   ├── criterios-nota-peso.md
│   ├── documentacao-ux-conteudo.md
│   ├── fontes-publicas-dados.md
│   ├── requisitos-funcionais.md
│   └── requisitos-nao-funcionais.md
├── documentacao-ux/
│   ├── design-spec-completo.md
│   ├── design-system-principios.md
│   ├── design-system-tokens.md
│   ├── fluxograma-navegacao.md
│   └── ...
├── react-app/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       ├── components/
│       │   ├── Header.jsx
│       │   ├── Hero.jsx
│       │   ├── Filters.jsx
│       │   ├── RankingTable.jsx
│       │   ├── CriteriaGrid.jsx
│       │   ├── Methodology.jsx
│       │   └── Footer.jsx
│       └── data/
│           └── mockData.js
└── testes/
    └── index-test.html
```

## 2. Estrutura recomendada para escala

Para viabilizar crescimento e manutenção, a arquitetura deve evoluir para a seguinte organização:

```text
react-app/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   └── routes.jsx
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── ranking/
│   │   ├── comparator/
│   │   └── methodology/
│   ├── features/
│   │   ├── ranking/
│   │   ├── parliament/
│   │   ├── comparison/
│   │   └── methodology/
│   ├── domain/
│   │   ├── criteria.js
│   │   ├── scoring.js
│   │   ├── filters.js
│   │   └── types.js
│   ├── services/
│   │   ├── parliamentService.js
│   │   ├── rankingService.js
│   │   ├── sourceService.js
│   │   └── apiClient.js
│   ├── hooks/
│   │   ├── useRanking.js
│   │   ├── useFilters.js
│   │   └── useParliamentDetail.js
│   ├── data/
│   │   ├── mockData.js
│   │   └── fixtures/
│   ├── config/
│   │   ├── criteria.js
│   │   └── theme.js
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── math.js
│   │   └── validation.js
│   ├── styles/
│   │   ├── tokens.css
│   │   └── global.css
│   └── index.css
└── public/
    └── assets/
```

## 3. Responsabilidade por camada

### Camada de componentes

- apresentação visual
- leitura de props
- composição de layout
- sem regras pesadas de cálculo

### Camada de features

- fluxo de tela e interação específica
- integração entre estado e serviços
- lógica de UX por funcionalidade

### Camada de domínio

- cálculo de nota final
- regras de filtragem
- normalização e pesos
- modelo de dados de negócio

### Camada de serviços

- acesso a dados em API ou mock
- transformação e serialização
- captura de metadados e fontes

## 4. Diretrizes de organização

- cada feature deve ter uma responsabilidade clara
- componentes compartilhados ficam em `components/common`
- regras de negócio não devem estar em componentes visuais
- dados de origem e de domínio devem ser separados
- a camada de apresentação deve depender somente de interfaces bem definidas

## 5. Evolução recomendada

A implementação atual já está em um estágio de visão e protótipo. A etapa seguinte mais sensata é:

1. extrair a lógica de cálculo para `domain/`
2. separar serviços para acesso a dados
3. criar módulos por feature: ranking, parlamentar, comparação
4. adicionar painel administrativo para metodologia / pesos
5. introduzir backend para dados públicos e auditoria

## 6. Conclusão

A estrutura de pastas recomendada mantém o protótipo simples e ao mesmo tempo escala para um produto público sério, com regras de negócio, dados auditáveis e evolução sem acoplamento excessivo.
