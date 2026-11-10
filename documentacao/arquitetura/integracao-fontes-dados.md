# Integração de fontes públicas e proposta de banco de dados

## 1. Objetivo

Este documento consolida a análise das fontes oficiais que sustentam a avaliação de parlamentares, define a melhor estrutura de integração e estabelece a recomendação de banco de dados para o MVP e para a fase de produção. A linha de decisão é manter o produto transparente, auditável e facilmente reprodutível, sem acoplar a interface diretamente às APIs públicas.

## 2. Fontes oficiais a consultar

As fontes abaixo não substituem a própria metodologia do produto, mas são as principais entradas que sustentam notas, filtros, rankings e rastreabilidade:

| Fonte | Domínio principal | Dados esperados | Uso recomendado |
|---|---|---|---|
| Câmara dos Deputados | Atuação legislativa e institucional | deputados em exercício, comissões, votações, proposições, projetos, tramitação | base principal de produção legislativa, presença e relatoria |
| Senado Federal | Atuação legislativa e institucional | senadores, bancadas, proposições, comissões, votações, presença | base principal para senadores e indicadores parlamentares |
| Portal da Transparência | Transparência institucional | remuneração, despesas, atos oficiais, registros públicos | suporte para transparência e rastreabilidade |
| Dados Abertos do Governo Federal | Infraestrutura de dados públicos | bases estruturadas e consolidadas | consolidação e complementação de indicadores |
| TSE / dados eleitorais | Perfil e contexto institucional | dados eleitorais, partidos e mandatos | apoio de contexto, não como critério principal |

### 2.1 Prioridade de consulta

1. Câmara dos Deputados
2. Senado Federal
3. Portal da Transparência
4. Bases públicas complementares de dados abertos
5. Dados eleitorais e institucionais auxiliares

A regra central é que o sistema deve consumir a fonte oficial, preservar a data de coleta e manter o histórico de cada dado. Nenhuma nota deve aparecer sem relacionamento com a origem e a metodologia de cálculo.

## 3. APIs que precisam ser consultadas no projeto

### 3.1 Câmara dos Deputados

A API oficial deve ser consultada para obter:

- identificação do parlamentar e legislatura
- dados cadastrais básicos
- atuação em comissões
- presença em votações e sessões
- autoria e tramitação de projetos
- relatorias e papel em comissão

Essa é a principal fonte para os critérios de:

- presença e assiduidade
- produção legislativa
- relatoria
- participação em votações

### 3.2 Senado Federal

A API do Senado deve alimentar o mesmo conjunto de dados para senadores e estruturas de bancada, incluindo:

- parlamentares em exercício
- proposições e projetos
- composição de comissões
- presença e comparecimento
- indicadores legislativos e institucionais

### 3.3 Portal da Transparência

A integração com a transparência pública deve ser usada para:

- validar dados institucionais
- registrar registros e transparência
- complementar o contexto de desempenho, quando houver dados confiáveis e públicos

Importante: este canal não deve substituir indicadores legislativos; ele serve como evidência complementar e para explicitar o critério de transparência.

### 3.4 Dados abertos e registros complementares

Essas fontes devem ser consultadas quando o dado principal não estiver disponível ou quando a análise exigir correlação com contextos institucionais específicos. O uso deve ser seletivo e sempre acompanhado de metadados de origem e cronologia.

## 4. Melhor forma de integração

A melhor arquitetura para este produto não é integrar diretamente o front-end com as APIs oficiais. A melhor prática é uma camada de integração em backend e um processo de ETL, com as seguintes etapas:

### 4.1 Fluxo recomendado

1. coleta da API pública
2. validação do payload e regras de schema
3. normalização para o modelo de domínio
4. deduplicação de registros
5. marcação de ausência de dado
6. cálculo de indicadores por critério
7. gravação em banco de dados
8. materialização do ranking e do perfil do parlamentar
9. exposição ao front-end por API interna

### 4.2 Vantagens desta abordagem

- evita dependência direta do browser com APIs governamentais
- centraliza regras de autenticação, cache, retries e rate limit
- melhora a rastreabilidade e a auditoria
- facilita a reexecução da metodologia em qualquer dado histórico
- permite comparar versões de pesos e de dados sem quebrar a interface

### 4.3 Regra de design

A interface pública deve consumir apenas uma API interna do produto e não depender do formato bruto das fontes oficiais. A camada de integração atua como uma ponte entre o mundo governamental e o modelo de negócio do sistema.

## 5. Proposta de modelo de dados

O modelo deve manter separação entre:

- dados brutos de origem
- dados normalizados
- indicadores calculados
- metadados de metodologia

### 5.1 Entidades centrais

- parlamentar
- cargo
- partido
- legislatura
- criterio_avaliacao
- fonte_dado
- metricas_parlamentar
- historico_nota
- metodo_avaliacao
- atualizacao_dados
- raw_source_data

### 5.2 Estruturas de metadados mínimas

Cada dado relevante deve ter:

- id do registro
- id da fonte
- data de coleta
- data de referência
- origem oficial
- status do dado (valid, missing, estimated, deprecated)
- hash ou versão do payload
- usuário ou processo responsável pela atualização

## 6. Banco de dados recomendado

### Escolha: PostgreSQL

Para a solução, o melhor banco de dados é PostgreSQL, por excelência para:

- dados relacionais e históricos
- auditoria e versionamento
- uso de JSONB para payloads semi-estruturados de fontes externas
- query analítica para ranking e comparação
- crescimento em volume sem perda de consistência

### Por que não SQLite ou banco de documentos no MVP?

SQLite pode ser útil para prototipagem local e testes, mas não é o melhor candidato para produção quando o produto exige:

- rastreabilidade de dados
- histórico por atualização
- consultas analíticas e agregações por critério
- integração com pipeline de dados públicos

Bancos NoSQL podem ser interessantes em cenários muito específicos de dados semi-estruturados, mas neste produto o peso da consistência, das relações e do histórico supera o benefício de flexibilidade extrema.

### 6.1 Arquitetura de armazenamento sugerida

- PostgreSQL: banco principal
- tabela `raw_source_data`: gravação de JSON bruto das APIs oficiais
- tabela `parlamentares`: dados estáveis do parlamentar
- tabela `criterios_avaliacao`: critérios e pesos por metodologia
- tabela `metricas_parlamentar`: valores coletados e normalizados
- tabela `historico_notas`: evolução temporal de nota e peso
- tabela `fontes_dados`: catálogo de fontes e links oficiais
- tabela `metodologia`: versões da formula e descrição de cálculo

## 7. Recomendação de integração operacional

### 7.1 Modelo de execução

- jobs de sincronização diários ou semanais
- gatilho por mudança de legislatura
- recomputação de ranking após cada atualização
- versionamento de pesos e de metodologia

### 7.2 Estratégia de cache

- cache de consultas públicas por 5 a 15 minutos
- cache de ranking materializado por período de atualização
- invalidation explícita quando a fonte muda

### 7.3 Política de consistência

- dados novos devem ser validados antes de substituir o valor vigente
- uma fonte inválida não pode sobrescrever o dado atual sem auditoria
- cada valor derivado deve manter vínculo com a fonte e com a regra de cálculo

## 8. Conclusão

A arquitetura correta para a solução é a seguinte:

- fonte oficial → ETL e validação → banco normalizado → cálculo de ranking → API interna → front-end

Esta abordagem evita o maior risco do produto: perder transparência e rastreabilidade ao depender diretamente de APIs públicas frágeis ou de um formato bruto pouco estável. O banco de dados recomendado é PostgreSQL, com armazenamento de dados brutos e normalizados em conjunto, preservando a integridade e a capacidade de evoluir com a metodologia.
