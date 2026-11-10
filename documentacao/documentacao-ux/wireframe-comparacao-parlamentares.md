# Wireframe da comparação entre parlamentares

## Visão geral

A comparação deve permitir que o usuário responda, em poucos segundos, quais parlamentares têm melhor desempenho em cada critério e qual a diferença real entre eles.

## Estrutura da página

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                    │
│ [Logo] [Ranking] [Metodologia] [Comparar]                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ COMPARAR PARLAMENTARES                                                     │
│                                                                            │
│ [Parlamentar A]       [Parlamentar B]                                     │
│ [Selecione]          [Selecione]                                           │
│                                                                            │
│ [Comparar]                                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ RESULTADO COMPARATIVO                                                      │
│                                                                            │
│ Critério                     Parlamentar A    Parlamentar B    Diferença   │
│ Presença e assiduidade       8,5             6,9             +1,6        │
│ Produção legislativa         7,8             5,3             +2,5        │
│ Relatoria                   6,9             8,1             -1,2        │
│ Participação em votações     8,1             7,4             +0,7        │
│ Transparência                7,0             8,7             -1,7        │
│ Atendimento ao eleitor       6,6             7,2             -0,6        │
│                                                                            │
│ Nota final: 8,4             Nota final: 7,6                                 │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ RESUMO                                                                        │
│                                                                            │
│ Parlamentar A vence em: Presença, Produção legislativa, Votações           │
│ Parlamentar B vence em: Relatoria, Transparência, Atendimento              │
│                                                                            │
│ [Voltar para ranking] [Ver perfil do parlamentar]                          │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ RODAPÉ                                                                    │
│                                                                            │
│ Transparência | Fontes | Atualização                                       │
│                                                                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Elementos principais

### 1. Seleção de parlamentares
- dois campos para busca e seleção
- possibilidade de filtro por cargo ou estado
- ação clara de comparação

### 2. Resultado comparativo
- cada critério em linha separada
- nota dos dois parlamentares
- diferença numérica
- destaque para o critério que vence

### 3. Resumo textual
- explicação curta e neutra
- apontando quem vence em cada área principal

### 4. Ações do usuário
- voltar ao ranking
- ver detalhe do parlamentar
- repetir comparação com outra combinação

## Regras de UX

- o resultado deve ser legível sem esforço
- a diferença entre os parlamentares deve ficar clara imediatamente
- o resumo deve ser curto e objetivo
- o usuário não deve precisar interpretar muita informação para compreender a comparação

## O que a tela precisa transmitir

- comparabilidade real
- clareza de critérios
- neutralidade na leitura
- facilidade de compreensão
- confiabilidade dos dados

## Opções de evolução que fazem sentido

- adicionar comparação de três parlamentares em uma tela expandida, quando houver necessidade real
- exibir um destaque por categoria dominante, indicando onde cada parlamentar é mais forte
- permitir comparação por estado ou partido em filtros extras
- salvar comparações recentes, quando houver uso recorrente

> Essas evoluções têm valor porque ampliam a utilidade da comparação sem prejudicar a simplicidade da tela principal.

## Conclusão

A comparação entre parlamentares deve funcionar como uma visão objetiva e direta do desempenho, com foco em clareza, neutralidade e confiabilidade. A tela deve ajudar o usuário a decidir com base em dados e não em opinião.
