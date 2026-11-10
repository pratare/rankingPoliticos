# Wireframe do modal de metodologia

## Visão geral

O modal de metodologia deve responder à pergunta mais importante da experiência: como essa nota foi calculada?

## Estrutura do modal

```text
┌─────────────────────────────────────────────────────────────┐
│ Modal: Como a nota é calculada?                           │
├─────────────────────────────────────────────────────────────┤
│                                                         │
│ A nota final é calculada pela média ponderada.          │
│                                                         │
│ Fórmula:                                                 │
│ Nota final = (Σ (Peso × Nota)) / Σ Peso                  │
│                                                         │
│ Critérios e pesos:                                       │
│ - Presença e assiduidade: 25%                            │
│ - Produção legislativa: 20%                              │
│ - Relatoria: 15%                                         │
│ - Participação em votações: 15%                          │
│ - Transparência: 15%                                     │
│ - Atendimento ao eleitor: 10%                            │
│                                                         │
│ Cada critério recebe valor de 0 a 10.                    │
│ A nota final é uma média ponderada dos critérios.        │
│                                                         │
│ Fontes:                                                  │
│ - Câmara dos Deputados                                   │
│ - Senado Federal                                          │
│ - Portal da Transparência                                 │
│ - Dados abertos públicos                                  │
│                                                         │
│ Última atualização: 24/10/2026                            │
│                                                         │
│ [Fechar]                                                 │
└─────────────────────────────────────────────────────────────┘
```

## Objetivo do modal

- reduzir dúvida do usuário
- reforçar a credibilidade do produto
- explicar a lógica de cálculo em linguagem simples
- tornar a metodologia acessível em poucos segundos

## Regras de UX

- o modal deve abrir em um clique
- o texto deve ser curto e claro
- o conteúdo deve ser fácil de ler
- a fórmula deve ser visível sem esforço
- o botão de fechar deve estar sempre visível

## Evolução recomendada

- incluir um botão para “Exibir explicação por critério”
- mostrar uma versão resumida e outra detalhada da metodologia
- adicionar um bloco com “Como interpretar a nota de 0 a 10?”
- ligar a metodologia a uma documentação completa quando o produto crescer

> Essas evoluções fazem sentido porque aumentam o entendimento sem sobrecarregar a primeira visão.

## Conclusão

O modal de metodologia é um ponto central de transparência. Ele precisa transmitir que a avaliação é pública, objetiva e baseada em critérios verificáveis.
