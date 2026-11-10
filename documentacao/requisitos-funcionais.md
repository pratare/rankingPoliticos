# Requisitos funcionais

## 1. Objetivo

O sistema deve apresentar um ranking público de deputados federais e senadores com base em critérios objetivos, mensuráveis e transparentes, utilizando dados públicos oficiais.

## 2. Visão geral

A plataforma deve permitir que qualquer cidadão visualize e compare parlamentares por nota final, por critério e por perfil institucional, com linguagem simples e metodologia visível.

## 3. Funcionalidades principais

### RF-01: Ranking geral
O sistema deve exibir um ranking geral de deputados e senadores com a seguinte informação:
- posição
- nome do parlamentar
- cargo
- partido
- estado
- nota final
- quantidade de pontos por critério

### RF-02: Filtros de consulta
O sistema deve permitir filtrar os parlamentares por:
- cargo: deputado ou senador
- estado
- partido
- nome ou palavra-chave
- legislatura ou período selecionado

### RF-03: Página individual do parlamentar
O sistema deve disponibilizar uma página com:
- dados pessoais e institucionais
- nota final
- detalhamento por critério
- histórico de desempenho, quando disponível
- fontes dos dados utilizados

### RF-04: Comparação entre parlamentares
O sistema deve permitir comparar dois ou mais parlamentares em paralelo, exibindo:
- nota final
- desempenho por critério
- diferença entre os candidatos
- destaque dos critérios com melhor e pior desempenho

### RF-05: Metodologia visível
A página deve explicar de forma clara:
- critérios utilizados
- peso de cada critério
- fórmula de cálculo
- origem dos dados
- atualização das notas
- regra de cálculo e normalização aplicada em cada critério

### RF-06: Transparência dos dados
A plataforma deve indicar, para cada valor exibido, a fonte pública e a data de atualização.
Além disso, cada critério deve expor a sua fonte oficial de origem, a data da coleta e o status do dado, incluindo ausência de informação quando aplicável.

### RF-07: Ranking por critério
O sistema deve permitir visualizar o ranking com base em critério específico, por exemplo:
- presença
- produção legislativa
- relatoria
- transparência
- participação em votações

### RF-08: Atualização periódica
O sistema deve atualizar os dados com periodicidade definida pela equipe, mantendo registros de data e fonte.

### RF-09: Design acessível
A interface deve ser simples, direta e legível para público amplo, com foco em:
- leitura rápida
- linguagem acessível
- contraste adequado
- navegação intuitiva

### RF-10: Responsividade
A aplicação deve funcionar em desktop, tablet e celular.

## 4. Regras de negócio

- A metodologia deve ser pública e não depender de opinião pessoal.
- A avaliação deve ser baseada em dados públicos e verificáveis.
- A plataforma deve evitar qualquer critério de natureza ideológica, partidária ou subjetiva.
- O sistema deve separar dados objetivos de interpretação contextual.
- A nota final deve ser calculada de forma automatizada, com base em regras fixas.

## 5. Casos de uso principais

### UC-01: Consultar ranking geral
Usuário acessa a homepage e visualiza o ranking de deputados e senadores.

### UC-02: Filtrar por estado e partido
Usuário seleciona filtros para encontrar parlamentares relevantes para sua região e bancada.

### UC-03: Comparar parlamentares
Usuário seleciona dois parlamentares e compara desempenho por critério.

### UC-04: Entender metodologia
Usuário acessa a seção de metodologia e compreende pesos, fórmula e fontes.

### UC-05: Consultar detalhamento do parlamentar
Usuário acessa a página do parlamentar e visualiza nota final e critérios detalhados.

## 6. Critérios de aceitação

- O ranking deve ser exibido em menos de 3 segundos em condições normais de navegação.
- Os filtros devem atualizar a tabela em tempo real.
- A metodologia deve estar acessível em pelo menos um clique.
- Cada critério deve indicar sua fonte pública de origem.
- A plataforma deve manter coerência entre a nota final e os dados detalhados.
