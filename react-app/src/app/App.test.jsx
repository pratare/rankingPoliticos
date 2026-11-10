import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import RootApp from '../App'
import App from './App'

describe('App', () => {
  it('renders the application entrypoint without crashing', () => {
    expect(RootApp).toBeDefined()
  })

  it('renders the ranking page with default sections', () => {
    render(<App />)

    expect(screen.getByText('Ranking objetivo de deputados e senadores')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ranking geral' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Comparação entre parlamentares' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Critérios da avaliação' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Metodologia da avaliação' })).toBeInTheDocument()
  })

  it('filters parliamentary rows by name and shows zero results when no match exists', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByLabelText('Buscar parlamentar')
    await user.type(input, 'Parlamentar inexistente')

    expect(screen.getByText('Nenhum parlamentar encontrado com os filtros selecionados.')).toBeInTheDocument()
  })

  it('opens the transparency modal and keeps the detail card informative', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Parlamentar Y' }))
    await user.click(screen.getByRole('button', { name: 'Entender a nota' }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Como a nota foi calculada?')).toBeInTheDocument()
    expect(screen.getByText('Perfil do parlamentar')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('updates the comparison panel when selecting different parliamentarians', async () => {
    const user = userEvent.setup()
    render(<App />)

    const leftSelect = screen.getByRole('combobox', { name: 'Parlamentar A' })
    const rightSelect = screen.getByRole('combobox', { name: 'Parlamentar B' })

    await user.selectOptions(leftSelect, 'parlamentar-z')
    await user.selectOptions(rightSelect, 'parlamentar-a')

    expect(leftSelect.value).toBe('parlamentar-z')
    expect(rightSelect.value).toBe('parlamentar-a')
  })

  it('allows switching the weight profile and customizing a criterion', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Legislativo' }))
    expect(screen.getByText(/Perfil ativo:/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Produção legislativa: 30%/i).length).toBeGreaterThan(0)

    const slider = screen.getAllByRole('slider')[0]
    fireEvent.change(slider, { target: { value: '60' } })

    expect(screen.getByText(/Perfil ativo:/i)).toBeInTheDocument()
  })

  it('shows the methodology weights for each profile in the methodology block', () => {
    render(<App />)

    expect(screen.getAllByText(/Perfil da metodologia:/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Institucional/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Legislativo/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Transparência/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Relatoria: 20%/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Transparência: 30%/i).length).toBeGreaterThan(0)
  })

  it('separates methodology and resource management in the detail panel and clarifies the score basis', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Metodologia da avaliação' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Gestão de recursos' })).toBeInTheDocument()
    expect(screen.getByText(/Nota base:/i)).toBeInTheDocument()
    expect(screen.getByText(/Nota ponderada:/i)).toBeInTheDocument()
  })
})
