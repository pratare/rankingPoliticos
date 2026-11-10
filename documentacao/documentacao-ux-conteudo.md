# Documentação de UX — Ranking Público de Deputados e Senadores

## 1. Objetivo da experiência

A experiência do produto deve permitir que qualquer cidadão entenda, em poucos segundos, o que o site apresenta, como a avaliação foi feita e por que a nota final de cada parlamentar faz sentido.

A interface deve transmitir credibilidade, neutralidade e clareza. O produto não deve parecer um espaço de opinião ou campanha; deve parecer uma ferramenta pública de informação, com metodologia transparente e critérios objetivos.

## 2. Público-alvo

### 2.1 Eleitor comum
- deseja resposta rápida
- não quer leitura técnica longa
- precisa compreender a lógica sem esforço
- valoriza fonte e transparência
- busca clareza antes de opinião

### 2.2 Usuário com interesse maior em análise
- jornalista
- pesquisador
- analista
- organização da sociedade civil
- pessoa interessada em comparar dados públicos

## 3. Princípios de UX

### 3.1 Transparência primeiro
A metodologia deve estar sempre acessível e clara.

### 3.2 Simplicidade decisiva
A interface deve reduzir a carga cognitiva e guiar o usuário para a informação principal.

### 3.3 Credibilidade visual
A aparência deve comunicar seriedade, rigor e neutralidade.

### 3.4 Compreensão em poucos segundos
O usuário precisa entender o que é a página e como a nota é calculada rapidamente.

### 3.5 Comparação fácil
A comparação entre parlamentares deve ser simples, direta e visualmente compreensível.

## 4. Objetivos de usabilidade

### 4.1 Facilidade de uso
O usuário deve conseguir navegar sem instruções complexas.

### 4.2 Legibilidade
Cada informação deve ser lida com pouco esforço.

### 4.3 Confiabilidade
O usuário deve sentir que o produto é baseado em dados públicos e metodologia explícita.

### 4.4 Acessibilidade
A interface deve funcionar bem em diferentes dispositivos e para diferentes perfis de usuários.

### 4.5 Clareza no conteúdo
As informações devem ser curtas, objetivos e consistentes.

## 5. Diretrizes de conteúdo

### 5.1 Linguagem
- usar linguagem simples e neutra
- evitar jargões desnecessários
- evitar linguagem partidária ou emocional
- manter expressão clara em todos os textos

### 5.2 Tom de voz
- objetivo
- institucional
- transparente
- informativo
- sem tom moralizante

### 5.3 Estrutura textual
- textos curtos
- frases diretas
- blocos organizados por categoria
- foco em funcionalidade e entendimento

## 6. Diretrizes de interface

### 6.1 Layout geral
A interface deve ser limpa, organizada e com forte hierarquia visual.

### 6.2 Hierarquia de informação
A prioridade da tela deve ser:
1. ranking geral
2. filtros
3. nota final
4. critérios de avaliação
5. metodologia e fontes

### 6.3 Consistência visual
Os elementos de tabela, cards, filtros e indicadores devem manter o mesmo padrão visual em toda a experiência.

### 6.4 Uso de cores
- azul escuro para solidez e institucionalidade
- branco para clareza e espaço
- cinza para contexto
- verde para desempenho positivo
- vermelho para menor desempenho
- amarelo para atenção moderada

A cor deve reforçar informação, nunca substituir significado.

## 7. Estrutura da homepage

### 7.1 Hero section
Conteúdo sugerido:
- título principal: “Ranking objetivo de deputados e senadores”
- subtítulo: “Avaliação baseada em critérios públicos e transparentes”
- CTA principal: “Ver ranking”
- CTA secundário: “Como a nota é calculada?”

### 7.2 Filtros
- cargo
- estado
- partido
- busca por nome
- período ou legislatura, quando disponível

Os filtros devem ser facilmente visíveis e aplicar mudanças com feedback imediato.

### 7.3 Ranking principal
A tabela ou lista deve mostrar:
- posição
- nome
- cargo
- estado
- partido
- nota final

### 7.4 Critérios da avaliação
Exibir os critérios em blocos simples:
- presença e assiduidade
- produção legislativa
- relatoria
- participação em votações
- transparência
- atendimento ao eleitor

Cada critério deve ter uma frase resumida de explicação.

### 7.5 Metodologia
Uma única seção clara deve responder:
- quais critérios são usados
- qual o peso de cada critério
- como a fórmula funciona
- onde os dados vieram
- qual perfil de avaliação está sendo aplicado

A interface deve indicar os perfis disponíveis — Equilibrado, Institucional, Legislativo e Transparência — e mostrar como a nota muda conforme a seleção do perfil. Regra de consistência visual: a metodologia deve aparecer somente em um único bloco no rodapé da tela, não em blocos duplicados na parte superior e nem em seções separadas que repitam a mesma informação. A explicação da nota final e a metodologia aplicada devem ser integradas em um único bloco final, com fontes e atualização visíveis no mesmo conjunto.

Além disso, cada bloco de critério deve exibir, de forma padronizada:
- nota do critério
- breve explicação do que ele mede
- fonte oficial da informação
- data de atualização
- status de dado ausente, quando for o caso

Essa regra evita que a interface pareça opinativa e reforça a credibilidade do produto como ferramenta pública de informação.

## 8. Estrutura da página do parlamentar

### 8.1 Cabeçalho
- nome
- cargo
- estado
- partido
- posição no ranking
- nota final

### 8.2 Resumo de performance
- nota geral
- comparação com a média
- destaque de pontos fortes e fracos

### 8.3 Detalhamento por critério
Cada critério deve conter:
- nota final do critério
- breve descrição do que ele mede
- fonte do dado
- data de atualização

### 8.4 Seção de transparência
- origem dos dados
- data da coleta
- fonte pública
- explicação da metodologia aplicada

### 8.5 Botão de comparação
O usuário deve poder comparar rapidamente este parlamentar com outro da mesma categoria.

## 9. Fluxo do usuário

### 9.1 Fluxo principal
1. O usuário entra na página inicial.
2. Entende rapidamente o objetivo do site.
3. Filtra por cargo, estado ou partido.
4. Visualiza o ranking geral.
5. Clica em um nome.
6. Acessa o detalhe do parlamentar.
7. Consulta a metodologia e as fontes.
8. Compara com outro parlamentar, se desejar.

### 9.2 Requisitos de UX no fluxo
- o usuário precisa entender a lógica em poucos segundos
- as ações devem ser simples e diretas
- o botão de metodologia deve estar sempre acessível
- a navegação deve ser consistente em desktop e mobile

## 10. Regras de comportamento e microinterações

### 10.1 Filtros
- devem atualizar resultados imediatamente
- devem mostrar claramente filtros ativos
- devem ser fáceis de limpar

### 10.2 Ordenação
- a ordenação padrão deve ser por nota final
- a alternativa por critério deve estar disponível

### 10.3 Pesquisa
- busca por nome deve ser rápida e objetiva
- resultados devem ser exibidos com destaque claro

### 10.4 Metodologia
- deve abrir em modal ou em seção dedicada
- texto deve ser curto e legível
- não deve exigir leitura longa para entender a lógica

## 11. Diretrizes de acessibilidade

### 11.1 Leitura
- texto com tamanho apropriado
- contraste adequado
- uso de espaçamento suficiente

### 11.2 Navegação
- acessibilidade por teclado
- foco visual claro em elementos interativos
- ícones funcionais e não apenas decorativos

### 11.3 Compatibilidade
- funcionamento em mobile e desktop
- telas responsivas sem quebrar leitura

## 12. Diretrizes de conteúdo para a interface

### 12.1 Terminologia recomendada
Usar termos como:
- nota final
- critério
- peso
- fonte
- atualização
- comparação
- metodologia

Evitar termos como:
- “ótimo”, “pior”, “bom”, “ruim” como julgamento absoluto
- “ideologia” como explicação da nota
- termos subjetivos e emocionais

### 12.2 Mensagens esperadas
Exemplos de mensagens adequadas:
- “Nota final calculada com base em critérios públicos.”
- “Metodologia publicada e disponível para consulta.”
- “Dados atualizados em 24/10/2026.”

## 13. Critérios de usabilidade esperados

A interface será considerada adequada se:
- o usuário entende o produto em poucos segundos
- a metodologia é facilmente acessível
- a comparação entre parlamentares é simples
- a ação principal da página é clara
- a estrutura visual transmite confiança e neutralidade
- o conteúdo não exige leitura complexa para ser compreendido

## 14. Evolução recomendada sem inventar complexidade

As evoluções que fazem sentido de forma natural são:
- bloco de Top 10 na homepage
- botão de comparação em destaque
- visualização de histórico de desempenho quando houver dados confiáveis
- guia de linguagem interna para padronizar comunicação
- seções de transparência mais detalhadas com fontes completas

Essas melhorias devem surgir quando a base de dados e o uso real do produto comprovarem necessidade, e não antes.

## 15. Conclusão

A experiência de usuário do produto deve ser simples, objetiva e confiável. O principal objetivo da UX é fazer com que o cidadão entenda rapidamente que a avaliação é baseada em critérios públicos, transparentes e objetivos, e que a metodologia pode ser verificada.

Em um produto de informação pública, confiança é a principal funcionalidade. A estrutura visual, a linguagem e a organização da interface devem reforçar exatamente isso.
