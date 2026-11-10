# Requisitos não funcionais

## 1. Objetivo

Definir as condições de qualidade, confiabilidade, performance e segurança que o sistema deve atender para manter credibilidade, usabilidade e continuidade operacional.

## 2. Usabilidade

### RNF-01: Simplicidade
A interface deve ser facilmente compreendida por qualquer pessoa, sem necessidade de conhecimento técnico prévio.

### RNF-02: Clareza visual
Os gráficos, notas e filtros devem ser intuitivos e fáceis de ler.

### RNF-03: Acessibilidade
A interface deve seguir boas práticas de acessibilidade, incluindo:
- contraste adequado
- navegação por teclado
- textos legíveis
- suporte a leitores de tela

## 3. Performance

### RNF-04: Tempo de resposta
A página principal deve carregar rapidamente, com tempo aceitável em rede comum.

### RNF-05: Atualização de filtros
Os filtros devem refletir o resultado em tempo real ou em tempo praticamente imediato.

### RNF-06: Escalabilidade
O sistema deve suportar crescimento no número de parlamentares, filtros e consultas sem perda de desempenho relevante.

## 4. Confiabilidade e qualidade dos dados

### RNF-07: Integridade dos dados
Os dados devem ser consistentes, validados e rastreáveis.

### RNF-08: Transparência da metodologia
A metodologia de cálculo deve estar sempre acessível e consistente com os dados exibidos.

### RNF-09: Atualização rastreada
Cada dado deve registrar sua fonte e data de coleta para permitir auditoria.

## 5. Segurança

### RNF-10: Dados públicos
Como os dados são públicos, o sistema deve assegurar que não haja manipulação indevida das métricas ou da base de cálculo.

### RNF-11: Integridade de cálculo
A lógica de cálculo deve ser protegida para evitar alteração indevida de pesos ou critérios.

### RNF-12: Logs e auditoria
O sistema deve manter registros de alterações em metodologia e dados para permitir rastreabilidade.

## 6. Manutenção

### RNF-13: Estrutura modular
A lógica de coleta, cálculo e apresentação deve ser separada para facilitar manutenção.

### RNF-14: Reprodutibilidade
A metodologia deve ser reexecutável a partir dos dados públicos e dos pesos definidos.

## 7. Compatibilidade

### RNF-15: Navegadores
O sistema deve funcionar corretamente em navegadores modernos e versões atuais.

### RNF-16: Dispositivos
A interface deve funcionar em desktop, notebook, tablet e celular.

## 8. Disponibilidade

### RNF-17: Disponibilidade pública
A plataforma deve estar disponível para acesso amplo, com mínima interrupção.

### RNF-18: Monitoramento
A equipe deve monitorar falhas, lentidão e inconsistências na atualização dos dados.

## 9. Conformidade e ética

### RNF-19: Neutralidade metodológica
O sistema deve ser desenvolvido para evitar viés político, ideológico ou de opinião pessoal.

### RNF-20: Transparência editorial
A página deve deixar claro que a avaliação é baseada em indicadores públicos e que resultados não representam julgamento moral ou ideológico absoluto.

## 10. Critérios de aceitabilidade

O sistema será considerado adequado quando:
- a navegação for simples e clara
- os dados forem públicos e rastreáveis
- a metodologia estiver sempre visível
- o ranking puder ser validado por qualquer usuário
- a nota final for consistente com os critérios exibidos
