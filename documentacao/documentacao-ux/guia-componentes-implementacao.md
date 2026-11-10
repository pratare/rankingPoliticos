# Guia de componentes para implementação

## 1. Visão geral

Este documento reúne os principais componentes da interface em uma estrutura pronta para implementação em HTML, CSS e React. Ele serve como base para o front-end e mantém alinhamento com o design spec.

Os componentes principais são:
- Header
- Hero
- Filtros
- RankingTable
- CriterionCard
- ScoreBadge
- ParliamentCard
- PersonalizationPanel
- MethodologyModal
- Footer

---

## 2. Estrutura base da página

```html
<body>
  <header class="app-header">
    <nav class="nav-bar"></nav>
  </header>

  <main class="page-shell">
    <section class="hero"></section>
    <section class="filters"></section>
    <section class="ranking"></section>
    <section class="criteria"></section>
    <section class="methodology"></section>
  </main>

  <footer class="app-footer"></footer>
</body>
```

```jsx
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <Hero />
        <Filters />
        <RankingTable />
        <CriteriaGrid />
        <MethodologySection />
      </main>
      <Footer />
    </>
  )
}
```

---

## 3. Design tokens para uso em componentes

```css
:root {
  --bg-base: #F5F7FA;
  --surface: #FFFFFF;
  --surface-alt: #EEF2F7;
  --text-primary: #14213D;
  --text-secondary: #4B5563;
  --border: #D9E2EC;
  --primary: #1D4ED8;
  --primary-strong: #1E3A8A;
  --success: #16A34A;
  --warning: #F59E0B;
  --danger: #DC2626;
  --neutral: #6B7280;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 2px rgba(20,33,61,0.06);
  --shadow-md: 0 6px 18px rgba(20,33,61,0.12);
}
```

---

## 4. Componente: Header

### Objetivo
Navegar entre as principais áreas da aplicação com clareza e manter o produto reconhecível.

### Estrutura HTML

```html
<header class="app-header">
  <div class="container nav-bar">
    <div class="brand">
      <span class="brand-mark">R</span>
      <span>Ranking Parlamentar</span>
    </div>

    <nav class="nav-links" aria-label="Navegação principal">
      <a href="#ranking">Ranking</a>
      <a href="#metodologia">Metodologia</a>
      <a href="#comparar">Comparar</a>
    </nav>

    <button class="menu-button">Menu</button>
  </div>
</header>
```

### Estilo base

```css
.app-header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.nav-bar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: var(--text-primary);
}

.brand-mark {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: #fff;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
}

.menu-button {
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-primary);
}
```

### Componente React

```jsx
function Header() {
  return (
    <header className="app-header">
      <div className="container nav-bar">
        <div className="brand">
          <span className="brand-mark">R</span>
          <span>Ranking Parlamentar</span>
        </div>

        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#ranking">Ranking</a>
          <a href="#metodologia">Metodologia</a>
          <a href="#comparar">Comparar</a>
        </nav>

        <button className="menu-button">Menu</button>
      </div>
    </header>
  )
}
```

---

## 5. Componente: Hero section

### Objetivo
Comunicar rapidamente o valor do produto e orientar o usuário para a ação principal.

### HTML

```html
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      <span class="eyebrow">Transparência pública</span>
      <h1>Ranking objetivo de deputados e senadores</h1>
      <p>
        Avaliação baseada em critérios públicos, comparáveis e explicáveis.
      </p>
      <div class="hero-actions">
        <button class="primary-button">Ver ranking</button>
        <button class="secondary-button">Como a nota é calculada?</button>
      </div>
    </div>

    <div class="hero-card">
      <div class="score-badge large">8,7</div>
      <p>Nota média da base atual</p>
    </div>
  </div>
</section>
```

### CSS

```css
.hero {
  background: linear-gradient(180deg, #f8fbff 0%, #f5f7fa 100%);
  padding: 64px 0;
}

.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 0.8fr;
  gap: 32px;
  align-items: center;
  padding: 0 24px;
}

.eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: 16px;
}

.hero-copy h1 {
  font-size: clamp(2rem, 3vw, 3.2rem);
  line-height: 1.1;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.hero-copy p {
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.primary-button,
.secondary-button {
  border-radius: 10px;
  padding: 12px 20px;
  font-weight: 600;
  cursor: pointer;
}

.primary-button {
  border: none;
  background: var(--primary);
  color: #fff;
}

.secondary-button {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-primary);
}
```

---

## 6. Componente: Filters

### Objetivo
Permitir busca e refinamento do ranking sem poluir a interface.

### HTML

```html
<section class="filters-panel" aria-label="Filtros de busca">
  <div class="filter-field">
    <label for="cargo">Cargo</label>
    <select id="cargo">
      <option>Todos</option>
      <option>Deputado</option>
      <option>Senador</option>
    </select>
  </div>

  <div class="filter-field">
    <label for="estado">Estado</label>
    <select id="estado">
      <option>Todos</option>
      <option>SP</option>
      <option>RJ</option>
      <option>MG</option>
    </select>
  </div>

  <div class="filter-field">
    <label for="partido">Partido</label>
    <select id="partido">
      <option>Todos</option>
      <option>PSX</option>
      <option>ABC</option>
      <option>XYZ</option>
    </select>
  </div>

  <div class="filter-field wide">
    <label for="buscar">Buscar parlamentar</label>
    <input id="buscar" type="text" placeholder="Nome do parlamentar" />
  </div>

  <button class="primary-button compact">Aplicar</button>
</section>
```

### CSS

```css
.filters-panel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
  flex: 1;
}

.filter-field label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.filter-field select,
.filter-field input {
  height: 44px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface-alt);
  padding: 0 12px;
  color: var(--text-primary);
}

.wide {
  flex: 2;
}

.compact {
  align-self: end;
  height: 44px;
}
```

---

## 7. Componente: RankingTable

### Objetivo
Mostrar comparações de forma objetiva e legível.

### HTML

```html
<section class="ranking-panel" id="ranking">
  <div class="section-header">
    <h2>Ranking geral</h2>
    <button class="ghost-button">Ordenar por critério</button>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Posição</th>
          <th>Nome</th>
          <th>Cargo</th>
          <th>Estado</th>
          <th>Partido</th>
          <th>Nota final</th>
        </tr>
      </thead>
      <tbody>
        <tr class="top-row">
          <td>#1</td>
          <td>Parlamentar X</td>
          <td>Deputado</td>
          <td>SP</td>
          <td>PSX</td>
          <td><span class="score-pill">8,7</span></td>
        </tr>
        <tr>
          <td>#2</td>
          <td>Parlamentar Y</td>
          <td>Senador</td>
          <td>RJ</td>
          <td>ABC</td>
          <td><span class="score-pill neutral">8,4</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

### CSS

```css
.ranking-panel {
  max-width: 1200px;
  margin: 32px auto 0;
  padding: 0 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 1.75rem;
  color: var(--text-primary);
  margin: 0;
}

.table-wrap {
  overflow-x: auto;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

th, td {
  padding: 16px 20px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

th {
  background: var(--surface-alt);
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
}

.top-row {
  background: rgba(29, 78, 216, 0.04);
}

.score-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  padding: 6px 10px;
  background: rgba(22, 163, 74, 0.12);
  color: var(--success);
  border-radius: 999px;
  font-weight: 700;
}
```

### React version

```jsx
const rows = [
  { position: 1, name: 'Parlamentar X', role: 'Deputado', state: 'SP', party: 'PSX', score: '8,7' },
  { position: 2, name: 'Parlamentar Y', role: 'Senador', state: 'RJ', party: 'ABC', score: '8,4' }
]

function RankingTable() {
  return (
    <section className="ranking-panel" id="ranking">
      <div className="section-header">
        <h2>Ranking geral</h2>
        <button className="ghost-button">Ordenar por critério</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Estado</th>
              <th>Partido</th>
              <th>Nota final</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.position} className={row.position === 1 ? 'top-row' : ''}>
                <td>#{row.position}</td>
                <td>{row.name}</td>
                <td>{row.role}</td>
                <td>{row.state}</td>
                <td>{row.party}</td>
                <td><span className="score-pill">{row.score}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
```

---

## 8. Componente: CriterionCard

### Objetivo
Explicar cada critério de avaliação em uma apresentação clara e compacta.

### HTML

```html
<div class="criterion-card">
  <div class="criterion-icon">P</div>
  <div class="criterion-content">
    <h3>Presença e assiduidade</h3>
    <p>Comparecimento em sessões e comissões.</p>
  </div>
  <div class="criterion-score">8,5</div>
</div>
```

### CSS

```css
.criteria-grid {
  max-width: 1200px;
  margin: 32px auto 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 20px;
  padding: 0 24px;
}

.criterion-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}

.criterion-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(29, 78, 216, 0.12);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.criterion-content h3 {
  margin: 0 0 6px;
  font-size: 1rem;
  color: var(--text-primary);
}

.criterion-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.criterion-score {
  margin-left: auto;
  font-weight: 700;
  color: var(--success);
}
```

---

## 9. Componente: ScoreBadge

### Objetivo
Representar visualmente a nota final em diferentes contextos.

### HTML

```html
<div class="score-badge large">8,7</div>
<div class="score-badge medium success">9,1</div>
<div class="score-badge medium warning">6,8</div>
```

### CSS

```css
.score-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 700;
  background: rgba(22, 163, 74, 0.12);
  color: var(--success);
}

.score-badge.large {
  width: 120px;
  height: 120px;
  font-size: 2.5rem;
}

.score-badge.medium {
  width: 72px;
  height: 72px;
  font-size: 1.4rem;
}

.success {
  background: rgba(22, 163, 74, 0.12);
  color: var(--success);
}

.warning {
  background: rgba(245, 158, 11, 0.12);
  color: var(--warning);
}
```

---

## 10. Componente: ParliamentCard

### Objetivo
Exibir um resumo do parlamentar em blocos de busca e comparação.

### HTML

```html
<article class="parliament-card">
  <div class="avatar">PX</div>
  <div class="card-body">
    <h3>Parlamentar X</h3>
    <p>Deputado Federal · SP</p>
    <span class="party-tag">PSX</span>
  </div>
  <div class="card-score">
    <span>Nota</span>
    <strong>8,7</strong>
  </div>
</article>
```

### CSS

```css
.parliament-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  background: var(--primary);
  color: #fff;
}

.card-body h3 {
  margin: 0;
  font-size: 1.1rem;
}

.card-body p {
  margin: 4px 0 8px;
  color: var(--text-secondary);
}

.party-tag {
  background: var(--surface-alt);
  color: var(--text-primary);
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 700;
}

.card-score {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.card-score span {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.card-score strong {
  font-size: 1.4rem;
  color: var(--text-primary);
}
```

---

## 11. Componente: PersonalizationPanel

### Objetivo
Permitir ajuste de pesos e comparação entre perfis neutro e personalizado.

### HTML

```html
<section class="personalization-panel">
  <div class="section-header">
    <h2>Personalizar avaliação</h2>
  </div>

  <div class="slider-row">
    <label>Presença</label>
    <input type="range" min="0" max="100" value="25" />
    <span>25%</span>
  </div>

  <div class="slider-row">
    <label>Produção legislativa</label>
    <input type="range" min="0" max="100" value="20" />
    <span>20%</span>
  </div>

  <div class="personalization-summary">
    <p>Perfil neutro: 8,2</p>
    <p>Perfil personalizado: 8,7</p>
  </div>
</section>
```

### CSS

```css
.personalization-panel {
  max-width: 1200px;
  margin: 32px auto 0;
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.slider-row {
  display: grid;
  grid-template-columns: 180px 1fr 60px;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
}

.slider-row input {
  width: 100%;
}

.personalization-summary {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-weight: 600;
}
```

---

## 12. Componente: MethodologyModal

### Objetivo
Explicar a fórmula, os critérios e as fontes de dados sem interromper a experiência principal.

### HTML

```html
<button class="secondary-button" data-open-modal>Como a nota é calculada?</button>

<div class="modal-overlay" aria-hidden="true">
  <div class="modal">
    <header class="modal-header">
      <h3>Metodologia</h3>
      <button class="close-button">×</button>
    </header>

    <div class="modal-body">
      <p>Nota final = soma dos pesos x nota do critério / soma dos pesos.</p>
      <ul>
        <li>Presença: 25%</li>
        <li>Produção legislativa: 20%</li>
        <li>Relatoria: 15%</li>
      </ul>
      <p>Fontes: dados públicos e registros oficiais.</p>
    </div>
  </div>
</div>
```

### CSS

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 33, 61, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: min(560px, 90vw);
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## 13. Componente: Footer

### HTML

```html
<footer class="app-footer">
  <div class="container footer-grid">
    <div>
      <h4>Fontes públicas</h4>
      <p>Dados coletados de registros oficiais e sistemas públicos.</p>
    </div>
    <div>
      <h4>Última atualização</h4>
      <p>24 de outubro de 2026</p>
    </div>
    <div>
      <h4>Transparência</h4>
      <p>Política de dados e metodologias acessíveis.</p>
    </div>
  </div>
</footer>
```

### CSS

```css
.app-footer {
  margin-top: 48px;
  background: var(--text-primary);
  color: #fff;
  padding: 32px 24px;
}

.footer-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 24px;
}
```

---

## 14. Estrutura de implementação em React

```jsx
function App() {
  return (
    <>
      <Header />
      <Hero />
      <Filters />
      <RankingTable />
      <CriteriaGrid />
      <PersonalizationPanel />
      <Footer />
      <MethodologyModal />
    </>
  )
}
```

## 15. Boas práticas

- manter a hierarquia visual focada na nota final
- reduzir o texto na primeira tela
- priorizar componentes reutilizáveis
- usar variações consistentes para destaque e alerta
- garantir acessibilidade em campos e botões
- manter o layout responsivo e legível em mobile

## 16. Critérios de aceite da implementação

A interface estará alinhada ao design spec se:
- a nota final é o principal destaque visual
- filtros e ranking são claros e acessíveis
- os critérios são explicados em blocos simples
- a metodologia está visível e compreensível
- a navegação funciona em desktop e mobile
- a apresentação transmite confiança e neutralidade

---

## 17. Resumo

Esta biblioteca de componentes foi criada para transformar o design spec em código reutilizável, equilibrando clareza, credibilidade e desempenho visual. Os componentes foram desenhados para refletir a proposta do produto: ranking transparente, comparável e fácil de entender.
