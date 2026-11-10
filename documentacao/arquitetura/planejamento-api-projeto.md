# Planejamento técnico de API e persistência

## 1. Objetivo

Definir a próxima etapa de implementação do produto, convertendo a arquitetura conceitual em um plano operacional para a API, o banco de dados e os módulos de domínio. A principal diretriz é manter o produto público, transparente e rastreável, sem acoplar visualização e cálculo direto às APIs governamentais.

## 2. Stack recomendada

### 2.1 Backend

- Node.js + TypeScript
- NestJS como framework principal
- Prisma como camada de persistência e migração
- Swagger/OpenAPI para documentação interna

### 2.2 Banco de dados

- PostgreSQL 16
- tabela principal relacional para dados de domínio
- uso de `JSONB` para payloads brutos e metadados de origem

### 2.3 Frontend

- React + Vite já definido
- consumo de API interna em JSON
- regras de cálculo e pesos em módulo de domínio do frontend

### 2.4 Jobs e integrações

- scheduler para sincronização periódica
- job de ETL por fonte
- script de validação e publicações de dados

## 3. Arquitetura de integração

```text
Fontes oficiais
   ↓
ETL / fetcher
   ↓
Validação e schema
   ↓
Normalização e deduplicação
   ↓
PostgreSQL (dados crus + dados normalizados)
   ↓
Serviço de cálculo e ranking
   ↓
API pública interna
   ↓
Frontend React
```

## 4. Domínio principal

### 4.1 Entidades

- Parlamentar
- Cargo
- Partido
- Legislatura
- CritérioAvaliacao
- FonteDados
- MetricasParlamentar
- HistoricoNota
- MetodoAvaliacao
- AtualizacaoDados
- RawSourceData

### 4.2 Campos mínimos por entidade

#### Parlamentar

- id
- nome
- cargo_id
- partido_id
- uf
- legislatura_id
- status_ativo
- created_at
- updated_at

#### CritérioAvaliacao

- id
- nome
- chave
- descricao
- peso_padrao
- tipo
- ativo
- metodo_id

#### FonteDados

- id
- nome
- tipo
- url
- orgao
- data_atualizacao
- status

#### MetricasParlamentar

- id
- parlamentar_id
- criterio_id
- valor_bruto
- valor_normalizado
- peso_aplicado
- fonte_id
- data_referencia
- status_dado
- observacao

#### HistoricoNota

- id
- parlamentar_id
- metodo_id
- nota_final
- peso_total
- data_geracao
- versao_metodologia

## 5. API proposta

### 5.1 Endpoints principais

#### GET /api/v1/parlamentares

Parâmetros:

- cargo
- uf
- partido
- nome
- legislatura
- page
- limit

Resposta:

```json
{
  "data": [
    {
      "id": "dep-001",
      "nome": "Fulano de Tal",
      "cargo": "deputado",
      "uf": "SP",
      "partido": "PT",
      "notaFinal": 7.8,
      "ranking": 12
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 512
  }
}
```

#### GET /api/v1/parlamentares/:id

Retorna:

- dados do parlamentar
- critérios e notas
- fontes por critério
- histórico de nota
- metodologia aplicada

#### GET /api/v1/ranking

Parâmetros:

- cargo
- uf
- legislatura
- metodo
- page

Resposta:

- ranking geral
- melhores e piores desempenhos
- total de parlamentares

#### GET /api/v1/criterios

Retorna:

- todos os critérios ativos
- peso padrão
- fórmula ou regra aplicada
- fontes esperadas

#### GET /api/v1/metodologia/:id

Retorna:

- versão ativa
- pesos por critério
- descrição da regra de cálculo
- data de vigência

#### GET /api/v1/fuentes

Lista todas as fontes públicas, links oficiais e status de coleta.

## 6. Regras de cálculo

A fórmula central deve continuar a mesma:

$$
NotaFinal = \frac{\sum (Peso_i \times Nota_i)}{\sum Peso_i}
$$

Mas no backend o cálculo deve ser registrado em um histórico oficial e versionado, assim como a metodologia. Isso evita que a interface utilize pesos diferentes da regra ativa em produção.

## 7. Política de qualidade dos dados

### 7.1 Validação mínima

- schema obrigatório para cada payload
- campos principais obrigatórios
- deduplicação por identificador único
- validação de data e fonte
- marcas de ausência e inconsistência

### 7.2 Tratamento de dados ausentes

Quando a fonte não entregar informação, o sistema deve:

- registrar o dado como ausente
- não inferir sem evidência suficiente
- manter a nota com status explícito
- manter o histórico do valor e da ausência

### 7.3 Auditoria

Cada valor exibido deve responder a:

- origem oficial
- data de coleta
- data de referência
- critério associado
- regra de cálculo aplicada
- metodologia vigente

## 8. Jobs e sincronização

### 8.1 Rotina de coleta

- job diário: sincronização parcial
- job semanal: atualização de métricas e ranking
- job por legislatura: revisão de dados estruturais

### 8.2 Sequência do ETL

1. consultar API oficial
2. validar payload
3. armazenar raw no banco
4. normalizar para modelagem de domínio
5. atualizar métricas
6. recomputar rankings
7. publicar versão atual

## 9. Estrutura de pastas sugerida para o backend

```text
backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── common/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   └── utils/
│   ├── config/
│   │   └── app.config.ts
│   ├── modules/
│   │   ├── parlamentares/
│   │   ├── ranking/
│   │   ├── criterios/
│   │   ├── fontes/
│   │   └── metodologia/
│   ├── domain/
│   │   ├── entities/
│   │   ├── services/
│   │   └── value-objects/
│   ├── infra/
│   │   ├── prisma/
│   │   ├── fetchers/
│   │   └── jobs/
│   └── api/
│       └── dto/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env
├── package.json
└── tsconfig.json
```

## 10. Critérios de implementação por fase

### Fase 1 — MVP funcional

- ranking público
- perfil de parlamentar
- filtros básicos
- metadados de fonte e atualização
- API interna mínima

### Fase 2 — Produção de dados

- ETL e sincronização automatizada
- persistência por versão e histórico
- tabela de metodologia e comparação entre versões

### Fase 3 — Administração

- painel de revisão para critérios e pesos
- auditoria de alterações
- compensação de dados ausentes e revisão editorial

## 11. Conclusão

A próxima etapa mais sensata é mover a solução do protótipo para uma API controlada em Node/NestJS com PostgreSQL, preservando o modelo de transparência atual. O plano descrito acima mantém a coerência com a documentação já produzida, reduz risco de inconsistência e prepara a plataforma para crescer em volume, rastreabilidade e confiabilidade.
