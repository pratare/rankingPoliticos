export default function Header() {
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
