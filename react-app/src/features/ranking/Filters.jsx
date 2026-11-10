export default function Filters({ filters, options, onChange, onReset }) {
  const { cargo, estado, partido, query } = filters

  return (
    <section className="container">
      <div className="filters-panel" aria-label="Filtros de busca">
        <div className="filter-field">
          <label htmlFor="cargo">Cargo</label>
          <select
            id="cargo"
            value={cargo}
            onChange={(event) => onChange('cargo', event.target.value)}
          >
            {options.cargo.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            value={estado}
            onChange={(event) => onChange('estado', event.target.value)}
          >
            {options.estado.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="partido">Partido</label>
          <select
            id="partido"
            value={partido}
            onChange={(event) => onChange('partido', event.target.value)}
          >
            {options.partido.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field wide">
          <label htmlFor="buscar">Buscar parlamentar</label>
          <input
            id="buscar"
            type="text"
            value={query}
            placeholder="Nome do parlamentar"
            onChange={(event) => onChange('query', event.target.value)}
          />
        </div>

        <button type="button" className="secondary-button compact" onClick={onReset}>
          Limpar filtros
        </button>
      </div>
    </section>
  )
}
