# Definição das fontes públicas e dados

## 1. Objetivo

Definir quais fontes públicas e dados estruturados devem alimentar o sistema para garantir que a avaliação seja objetiva, transparente e confiável.

## 2. Regra geral

O sistema deve utilizar exclusivamente dados públicos e oficialmente disponibilizados por instituições governamentais, órgãos legislativos e canais públicos de transparência.

## 3. Fontes prioritárias

### 3.1 Câmara dos Deputados
**Uso principal:**
- parlamentares em exercício
- dados institucionais
- projetos de lei
- presença em sessões e comissões
- atividades legislativas

### 3.2 Senado Federal
**Uso principal:**
- senadores em exercício
- composição das bancadas
- projetos e proposições
- dados de participação e presença

### 3.3 Portal da Transparência
**Uso principal:**
- informações institucionais
- dados de transparência
- registros de atividade pública

### 3.4 Dados abertos governamentais
**Uso principal:**
- bases públicas de dados estruturados
- informações de atividade legislativa e institucional

### 3.5 Registros de votações e comissões
**Uso principal:**
- presença em votações
- participação em comissões
- atuação em temas específicos

## 4. Dados mínimos necessários

### 4.1 Dados cadastrais
- nome do parlamentar
- cargo
- partido
- UF / estado
- legislatura
- bancada

### 4.2 Dados de presença
- comparecimento em sessões
- presença em comissões
- participação em votações relevantes

### 4.3 Dados legislativos
- projetos de autoria
- proposições protocoladas
- relatorias assumidas
- tramitação relevante

### 4.4 Dados de transparência
- informação pública disponível
- comunicação institucional
- regularidade de divulgação

### 4.5 Dados de atuação pública
- presença em eventos públicos
- participação em audiências e debates
- envolvimento em temas locais ou nacionais

## 5. Tipos de dados

### Dados estruturados
- número de projetos
- presença em votações
- quantidade de relatorias
- frequência de comparecimento
- lista de proposições

### Dados semi-estruturados
- arquivos e relatórios públicos
- registros textuais de atividades
- boletins e notas institucionais

### Dados qualitativos, quando aplicáveis
- devem ser usados apenas como complemento e sempre com explicação de método
- não devem formar critério principal sem valoração objetiva

## 6. Regras de coleta

- os dados devem ser coletados diretamente de fontes oficiais
- a origem e a data da coleta devem ser registradas
- dados duplicados devem ser removidos
- inconsistências devem ser tratadas antes do cálculo
- o sistema deve manter um histórico de atualização

## 7. Regras de normalização

- padronização de nomes e siglas
- padronização de datas
- unificação de métricas por critério
- conversão para escala comum 0 a 10
- registro do método de agregação utilizado

## 8. Tratamento de dados ausentes

Quando um dado não estiver disponível:
- o sistema deve registrar a ausência do dado
- não deve inferir resultado sem justificativa
- deve indicar que o critério foi calculado com base em dados incompletos
- a ausência deve constar na documentação da avaliação

## 9. Regras de transparência

- cada nota deve mostrar a fonte principal do dado
- cada critério deve indicar de onde o dado veio
- a data de coleta deve aparecer ao lado de cada bloco de informação
- a metodologia de cálculo deve ser pública e acessível

## 10. Critérios de qualidade dos dados

Os dados devem ser:
- confiáveis
- atualizados
- verificáveis
- comparáveis
- auditáveis
- consistentes

## 11. Política de atualização

O sistema deve atualizar os dados em intervalos definidos, por exemplo:
- mensalmente para indicadores legislativos e de presença
- por evento relevante, quando houver mudança institucional importante
- sempre que houver nova base oficial publicada

## 12. Mapeamento de fontes por critério

Para que o ranking seja dinâmico e verificável, cada critério da nota deve possuir uma origem explícita de dados. O sistema deve manter um mapeamento por critério, indicando fonte, periodicidade e regra de cálculo.

### 12.1 Critérios e fontes esperadas

- Presença e assiduidade: Câmara dos Deputados, Senado Federal, registros de sessões e comissões
- Produção legislativa: Câmara dos Deputados, Senado Federal, banco de proposições e projetos
- Relatoria: registros oficiais de comissões, Câmara dos Deputados, Senado Federal
- Participação em votações: registros de votações e comparecimento em plenário
- Transparência e prestação de contas: Portal da Transparência, canais oficiais de transparência
- Atendimento ao eleitor: canais oficiais, agenda pública, registros de audiências e eventos

### 12.2 Estrutura mínima de dados do MVP

A base de dados deve contemplar, no mínimo, as seguintes entidades:

- parlamentares
- critério_avaliacao
- metricas_parlamentar
- historico_notas
- fontes_dados
- atualizacao_dados

Cada entidade deve manter:

- identificador único
- data de referência
- origem oficial
- indicador de consistência
- status de dado ausente quando aplicável

## 13. Regras de rastreabilidade

A plataforma deve manter registros que permitam responder, para qualquer valor exibido:

- de onde ele veio
- quando foi coletado
- qual critério ele representa
- qual regra de cálculo foi aplicada
- se a informação foi normalizada, agregada ou estimada

Qualquer dado derivado deve ser claramente identificado como cálculo e não como valor bruto.

## 14. APIs oficiais e fluxo de integração

Além da definição de fontes, o sistema deve mapear as APIs oficiais que serão consultadas para alimentar cada métrica. A consulta direta ao front-end não é a melhor opção; a regra é manter uma camada de integração em backend responsável por coletar, validar, transformar e publicar os dados para a aplicação pública.

### 14.1 APIs prioritárias a serem consultadas

- Câmara dos Deputados: dados de deputados, comissões, votações, proposições e projetos
- Senado Federal: dados de senadores, proposições, presença e matizes legislativas
- Portal da Transparência: dados institucionais e de transparência pública
- Bases de dados abertos do governo: consolidação complementar e mapeamento de indicadores públicos
- Dados eleitorais e institucionais complementares: apoio contextual e histórico por partido, legislatura e cargo

### 14.2 Estratégia de integração recomendada

O fluxo ideal é:

1. coleta da API oficial
2. validação de payload e integridade
3. normalização para o modelo de domínio
4. deduplicação e registro de ausência de dado
5. cálculo de indicadores por critério
6. persistência em banco de dados
7. publicação via API interna para o front-end
8. rastreio de fonte, data e metodologia em cada valor exibido

### 14.3 Recomendação de banco de dados

Para a solução, o melhor banco de dados é PostgreSQL, com suporte a:

- dados relacionais de parlamentares, critérios, pesos e fontes
- histórico de notas e de metodologia
- armazenamento de JSON em `JSONB` para dados brutos de origem
- auditoria e versionamento de atualizações

Essa escolha é mais adequada do que SQLite ou bancos totalmente não relacionais para um produto que exige transparência, comparação e histórico confiável.

## 15. Conclusão

A integridade do produto depende diretamente da qualidade e da transparência das fontes de dados. Sem dados públicos, consistentes e rastreáveis, a nota final perde credibilidade. Por isso, o sistema deve tratar todas as fontes como parte central do produto e não como suporte secundário.

A revisão do modelo de dados e da rastreabilidade é essencial para que a plataforma cumpra o requisito de apresentar não apenas uma nota, mas uma metodologia auditável, clara e reproduzível para qualquer cidadão ou pesquisador. A integração por pipeline controlado, com banco PostgreSQL e metadados de origem, é a forma mais segura de evoluir do protótipo para um produto confiável e escalável.
