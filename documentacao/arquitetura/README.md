# Arquitetura do Projeto — Ranking Parlamentar

## Visão geral

Este documento consolida os requisitos do PRD, da documentação funcional, dos requisitos não funcionais e do protótipo navegável em uma arquitetura técnica coerente para a plataforma de avaliação de parlamentares.

A solução foi concebida como uma aplicação web pública, com foco em:

- transparência metodológica
- comparação objetiva de parlamentares
- visualização de notas por critério
- personalização pela prioridade do usuário
- rastreabilidade dos dados e fontes

## Base documental

A arquitetura abaixo foi derivada das fontes principais do projeto:

- [PRD-avaliacao-parlamentares.md](../../PRD-avaliacao-parlamentares.md)
- [documentacao/requisitos-funcionais.md](../requisitos-funcionais.md)
- [documentacao/requisitos-nao-funcionais.md](../requisitos-nao-funcionais.md)
- [documentacao/criterios-nota-peso.md](../criterios-nota-peso.md)
- [documentacao/fontes-publicas-dados.md](../fontes-publicas-dados.md)
- [documentacao/documentacao-ux-conteudo.md](../documentacao-ux-conteudo.md)
- [documentacao-ux/design-spec-completo.md](../../documentacao-ux/design-spec-completo.md)

## Documentos de arquitetura

- [arquitetura-spine.md](./arquitetura-spine.md) — contrato mínimo de invariantes e fronteiras de arquitetura
- [arquitetura-sistema.md](./arquitetura-sistema.md) — visão geral arquitetural e fluxos de negócio
- [integracao-fontes-dados.md](./integracao-fontes-dados.md) — APIs oficiais, fluxo de integração e banco de dados recomendado
- [planejamento-api-projeto.md](./planejamento-api-projeto.md) — especificação técnica da próxima etapa de implementação da API e persistência
- [estrutura-tecnica.md](./estrutura-tecnica.md) — estrutura de pastas e organização técnica
- [decisoes-arquitetura.md](./decisoes-arquitetura.md) — decisões técnicas, trade-offs e evolução

## Conclusão resumida

A plataforma deve seguir uma arquitetura centrada em front-end modular com dados públicos e metodologia transparente. O sistema deve permitir que o usuário consulte rankings, filtros, comparações e explicações de metodologia em poucas interações, com dados consistentes, fontes explícitas e alta legibilidade.
