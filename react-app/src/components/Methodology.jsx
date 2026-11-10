export default function Methodology({ items }) {
  return (
    <section className="section-block" id="metodologia">
      <div className="methodology-box">
        <h3>Como a nota é calculada?</h3>
        <p>
          A nota final é calculada por média ponderada, com pesos ajustáveis conforme a prioridade do eleitor.
        </p>

        <ul className="methodology-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
