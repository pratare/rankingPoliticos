# Wireframe da página do parlamentar

## Visão geral

A página de detalhe do parlamentar deve responder duas perguntas principais:
- por que essa pessoa recebeu essa nota?
- em quais critérios ela se destacou ou teve pior desempenho?

A interface deve ser clara, objetiva e confiável. Ela deve transmitir que a nota foi calculada com critério e com base em dados públicos.

## Estrutura da página

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                    │
│ [Logo] [Ranking] [Metodologia] [Comparar]                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ CABEÇALHO DO PARLAMENTAR                                                  │
│                                                                            │
│ Nome do Parlamentar                                                        │
│ Cargo | Estado | Partido                                                   │
│ Posição no Ranking: #12                                                   │
│ Nota final: 8,4                                                            │
│                                                                            │
│ [Voltar ao ranking] [Comparar com outro parlamentar]                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ RESUMO DE PERFORMANCE                                                      │
│                                                                            │
│ Nota geral: 8,4                                                            │
│ Média do ranking: 7,1                                                     │
│ Pontos fortes:  Presença e produção legislativa                           │
│ Pontos fracos: Transparência e atendimento ao eleitor                     │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ DETALHAMENTO POR CRITÉRIO                                                  │
│                                                                            │
│ [Presença e assiduidade]    Nota: 8,5    Fonte: Câmara/Portal ...          │
│ [Produção legislativa]      Nota: 7,8    Fonte: Projetos de lei ...        │
│ [Relatoria]                 Nota: 6,9    Fonte: Relatorias ...              │
│ [Participação em votações]  Nota: 8,1    Fonte: Votações ...                │
│ [Transparência]             Nota: 7,0    Fonte: Transparência ...            │
│ [Atendimento ao eleitor]    Nota: 6,6    Fonte: Dados públicos ...          │
│                                                                            │
│ Cada bloco deve conter: nome do critério, nota, explicação breve e fonte   │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ METODOLOGIA APLICADA                                                       │
│                                                                            │
│ Como a nota foi calculada?                                                │
│ - Peso da presença: 25%                                                   │
│ - Peso da produção: 20%                                                   │
│ - Peso da relatoria: 15%                                                  │
│ - Peso das votações: 15%                                                  │
│ - Peso da transparência: 15%                                               │
│ - Peso do atendimento: 10%                                                │
│                                                                            │
│ [Ver metodologia completa]                                                │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ FONTES E ATUALIZAÇÃO                                                       │
│                                                                            │
│ Dados atualizados em: 24/10/2026                                          │
│ Fontes: Câmara, Senado, Portal da Transparência, Dados Abertos            │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ RODAPÉ                                                                    │
│                                                                            │
│ Transparência | Fontes | Política de dados                                 │
│                                                                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Elementos principais da página

### 1. Cabeçalho do parlamentar
- nome completo
- cargo
- estado
- partido
- posição no ranking
- nota final

### 2. Resumo de performance
- nota geral
- comparação com a média do ranking
- pontos fortes
- pontos fracos

### 3. Detalhamento por critério
Cada critério deve conter:
- nome
- nota
- descrição curta
- fonte pública
- data de atualização

### 4. Metodologia aplicada
- pesos
- fórmula
- link para documentação detalhada

### 5. Transparência e fontes
- origem dos dados
- data da coleta
- links para fontes oficiais

## Regras de UX

- a nota final deve estar em destaque
- o texto explicativo deve ser breve
- a informação mais importante deve aparecer antes de detalhes extras
- a comparação com a média deve ajudar o usuário a interpretar a nota
- cada critério deve ter fonte visível para reforçar confiança

## O que a página precisa transmitir

- “Entendi a nota”
- “Entendi por que essa pessoa está nessa posição”
- “Esses indicadores são públicos e verificáveis”
- “Não é opinião; é avaliação com método”

## Opções de evolução que fazem sentido

- adicionar um histórico simples de desempenho ao longo do tempo, se os dados estiverem consistentes
- incluir um resumo executivo de 2 a 3 linhas com os principais pontos fortes e fracos
- permitir comparar o parlamentar com outro em uma tela lateral ou modal
- mostrar uma linha do tempo do desempenho por critério, quando isso for factível e útil

> Essas evoluções fazem sentido porque ajudam o cidadão a interpretar melhor a nota e a buscar contexto, sem complicar a página base.

## Conclusão

A página do parlamentar deve parecer uma ferramenta de transparência pública, não uma página de opinião. A interface precisa deixar claro que a nota foi construída com dados públicos e critérios objetivos.
