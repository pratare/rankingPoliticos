export default function Filters() {
  return (
    <section className="container">
      <div className="filters-panel" aria-label="Filtros de busca">
        <div className="filter-field">
          <label htmlFor="cargo">Cargo</label>
          <select id="cargo">
            <option>Todos</option>
            <option>Deputado</option>
            <option>Senador</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="estado">Estado</label>
          <select id="estado">
            <option>Todos</option>
            <option>SP</option>
            <option>RJ</option>
            <option>MG</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="partido">Partido</label>
          <select id="partido">
            <option>Todos</option>
            <option>PSX</option>
            <option>ABC</option>
            <option>XYZ</option>
          </select>
        </div>

        <div className="filter-field wide">
          <label htmlFor="buscar">Buscar parlamentar</label>
          <input id="buscar" type="text" placeholder="Nome do parlamentar" />
        </div>

        <button className="primary-button compact">Aplicar</button>
      </div>
    </section>
  )
}
