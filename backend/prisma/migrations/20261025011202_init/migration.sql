-- CreateTable
CREATE TABLE "Parlamentar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "partido" TEXT,
    "fotoUrl" TEXT,
    "perfilUrl" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FonteDados" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "url" TEXT,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CriterioAvaliacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT,
    "peso" REAL NOT NULL DEFAULT 0,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "fontePrincipalId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CriterioAvaliacao_fontePrincipalId_fkey" FOREIGN KEY ("fontePrincipalId") REFERENCES "FonteDados" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MetricasParlamentar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "parlamentarId" TEXT NOT NULL,
    "criterioId" TEXT NOT NULL,
    "fonteDadoId" TEXT,
    "valor" REAL NOT NULL,
    "nota" REAL,
    "unidade" TEXT,
    "observacao" TEXT,
    "dataReferencia" DATETIME,
    CONSTRAINT "MetricasParlamentar_parlamentarId_fkey" FOREIGN KEY ("parlamentarId") REFERENCES "Parlamentar" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MetricasParlamentar_criterioId_fkey" FOREIGN KEY ("criterioId") REFERENCES "CriterioAvaliacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MetricasParlamentar_fonteDadoId_fkey" FOREIGN KEY ("fonteDadoId") REFERENCES "FonteDados" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistoricoNota" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "parlamentarId" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "notaFinal" REAL NOT NULL,
    "detalhesJson" TEXT,
    CONSTRAINT "HistoricoNota_parlamentarId_fkey" FOREIGN KEY ("parlamentarId") REFERENCES "Parlamentar" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RankingGeral" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "parlamentarId" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "posicao" INTEGER NOT NULL,
    "notaFinal" REAL NOT NULL,
    CONSTRAINT "RankingGeral_parlamentarId_fkey" FOREIGN KEY ("parlamentarId") REFERENCES "Parlamentar" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CriterioAvaliacao_codigo_key" ON "CriterioAvaliacao"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "MetricasParlamentar_parlamentarId_criterioId_dataReferencia_key" ON "MetricasParlamentar"("parlamentarId", "criterioId", "dataReferencia");

-- CreateIndex
CREATE UNIQUE INDEX "HistoricoNota_parlamentarId_periodo_key" ON "HistoricoNota"("parlamentarId", "periodo");

-- CreateIndex
CREATE UNIQUE INDEX "RankingGeral_periodo_parlamentarId_key" ON "RankingGeral"("periodo", "parlamentarId");
