# Decisões de arquitetura

## 1. Stack principal

### Escolha

- React
- Vite
- JavaScript
- CSS moderno com tokens visuais

### Motivo

A solução atual precisa ser rápida de entregar, visualmente clara e fácil de validar com stakeholders. O React com Vite resolve esse ponto com baixa complexidade inicial, boa produtividade e boa capacidade de crescimento.

## 2. Por que não um framework mais pesado desde o início?

A arquitetura foi pensada para manter a solução enxuta no início e evitar overhead desnecessário. O projeto atual tem:

- objetivo público e de consulta
- foco em apresentação e transparência
- poucos requisitos operacionais complexos no front-end

Por isso, evitar frameworks de grande rigidez e nascentes como Next.js, Redux e backend pesado desde o início reduz custo de entrega sem comprometer o conceito do produto.

## 3. Decisão sobre dados

### Estado atual

Os dados são mockados em `src/data/mockData.js`. Essa estratégia é relevante para:

- validar a UX
- testar hierarquia visual
- validar cálculo e ranking
- acelerar iteração

### Estado futuro

A arquitetura está preparada para migrar para uma camada de serviço e API, com:

- persistência em banco
- ingestão automática de dados públicos
- versionamento de pesos e metodologia
- histórico de atualizações

## 4. Decisão sobre domínio e regras de negócio

As regras de cálculo e pesos foram separadas do componente visual. Essa decisão é crítica porque:

- evita acoplamento entre UI e lógica de negócio
- facilita revisão e correção de metodologia
- reduz erros humanos na manutenção da nota final
- melhora a rastreabilidade dos critérios

## 5. Decisão sobre transparência e confiança

A arquitetura não trata a transparência como detalhe secundário; ao contrário, é um núcleo da experiência. Isso se reflete em:

- explicitação do cálculo
- presença contínua de fontes
- indicação de dados e atualização
- linguagem neutra e institucional

## 6. Trade-offs

### Trade-off favorado

Simplicidade e clareza em vez de sofisticação prematura.

### Resultado esperado

- entrega mais rápida
- entendimento fluido por parte do usuário
- menor custo de manutenção inicial
- evolução escalável em fases

## 7. Roadmap técnico recomendado

### Fase 1

- estabilizar o front-end
- refinar filtros e ranking
- consolidar a lógica de nota em módulo de domínio

### Fase 2

- separar serviços de dados
- introduzir fetchers e API mockada
- criar páginas de detalhe e comparação

### Fase 3

- backend para dados públicos
- normalização e auditoria de fontes
- painel administrativo

## 8. Decisão sobre integração de dados e banco

### Escolha

- pipeline de coleta e ETL em backend
- source-of-truth em banco PostgreSQL
- armazenamento de payload bruto e dados normalizados
- rastreio de origem, data e metodologia

### Motivo

A solução pública de avaliação parlamentar depende de fontes oficiais, heterogêneas e com atualização recorrente. Integrar diretamente o front-end às APIs tornaria o produto frágil, opaco e difícil de auditar. O uso de backend de ingestão com persistência em PostgreSQL garante auditabilidade, reprocessamento e consistência metodológica.

### Trade-off favorecido

Concentração de dados e regras de negócio em uma camada controlada, em vez de dependência direta da UI com fontes externas.

## 9. Conclusão

A decisão principal da arquitetura foi manter a solução simples, transparente e modular, sem perder a capacidade de crescer em complexidade e confiabilidade. O projeto já está coerente com a intenção do produto e com a documentação de UX e de requisitos. A escolha de integração por pipeline e armazenamento em PostgreSQL reforça a transparência, a auditoria e a escalabilidade do produto sem sacrifício da clareza da experiência pública.
