# Wireframe da Homepage

## Visão geral

A homepage deve apresentar o objetivo do produto imediatamente e permitir que o usuário entenda, em segundos, como funciona o ranking e como a nota é calculada.

## Estrutura da página

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                    │
│ [Logo/Marca]                 [Ranking] [Metodologia] [Comparar] [Menu]   │
├──────────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                              │
│                                                                            │
│ Ranking objetivo de deputados e senadores                                 │
│ Avaliação baseada em critérios públicos e transparentes                   │
│                                                                            │
│ [Ver ranking]    [Como a nota é calculada?]                               │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ FILTROS                                                                   │
│ [Cargo: Deputado/Senador] [Estado] [Partido] [Buscar parlamentar]         │
├──────────────────────────────────────────────────────────────────────────────┤
│ RANKING GERAL                                                             │
│                                                                            │
│ Posição | Nome | Cargo | Estado | Partido | Nota final                     │
│ 1       | X    | Dep.  | SP     | PSX    | 8,7                           │
│ 2       | Y    | Sen.  | RJ     | ABC    | 8,4                           │
│ 3       | Z    | Dep.  | MG     | XYZ    | 8,1                           │
│ ...                                                                        │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ CRITÉRIOS DA AVALIAÇÃO                                                    │
│                                                                            │
│ [Presença e assiduidade]   [Produção legislativa]                         │
│ [Relatoria]                [Participação em votações]                      │
│ [Transparência]            [Atendimento ao eleitor]                         │
│                                                                            │
│ Cada bloco: nome do critério + frase curta explicando o que mede          │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ METODOLOGIA                                                                │
│                                                                            │
│ Como a nota é calculada?                                                  │
│ Fórmula: média ponderada                                                   │
│ Pesos:                                                                     │
│ - Presença: 25%                                                            │
│ - Produção legislativa: 20%                                               │
│ - Relatoria: 15%                                                          │
│ - Votações: 15%                                                           │
│ - Transparência: 15%                                                       │
│ - Atendimento: 10%                                                        │
│                                                                            │
│ [Saiba mais]                                                               │
│                                                                            │
├──────────────────────────────────────────────────────────────────────────────┤
│ RODAPÉ                                                                    │
│                                                                            │
│ Fontes públicas | Última atualização | Transparência | Política de dados    │
│                                                                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Estrutura em blocos de conteúdo

### 1. Header
- nome do site
- links rápidos para principais seções
- opção de menu mobile

### 2. Hero
- mensagem clara sobre a proposta do produto
- call to action principal
- explicação curta da lógica de avaliação

### 3. Filtros
- cargo
- UF/estado
- partido
- busca por nome
- opcional: legislatura

### 4. Ranking geral
- lista com nota final e posição
- informações mínimas para contexto
- destaque para os primeiros lugares

### 5. Critérios
- texto conciso em blocos
- apresentação visual em cards

### 6. Metodologia
- fórmula
- pesos
- fontes
- data da última atualização

### 7. Rodapé
- fonte oficial
- informação pública
- contato ou política de transparência

## Diretrizes visuais

### Hierarquia visual
- a nota final deve ser o elemento visual mais forte
- filtros devem estar acessíveis e visíveis
- texto explicativo deve ser curto e direto

### Leitura
- evitar excesso de texto na primeira tela
- manter a análise em blocos curtos
- assegurar que o ranking seja facilmente lido em desktop e mobile

### Neutralidade
- não usar linguagem emocional ou partidária
- priorizar dados, métricas e fontes

## O que a homepage precisa transmitir

- o produto é público e transparente
- a nota é baseada em critérios objetivos
- qualquer pessoa consegue entender a avaliação rapidamente
- a metodologia está disponível e é verificável

## Evolução recomendada sem exagero

- adicionar um bloco de “Top 10” abaixo do ranking principal
- adicionar um painel com “Última atualização” em destaque
- incluir tooltip explicativo em cada critério quando necessário
- manter a homepage simples e clara antes de aumentar complexidade

> A evolução deve acontecer apenas quando a navegação ou os dados exigirem mais contexto, e não antes.

## Resumo

O wireframe da homepage deve priorizar clareza, credibilidade e leitura rápida. A ideia central é que o usuário entenda em poucos segundos o que o site mostra, por que a nota existe e como ela é calculada.
