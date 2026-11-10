# Estrutura de Design System — Tokens e padrões

## 1. Tokens de cor

### Palette principal
- `--bg-base`: `#F5F7FA`
- `--surface`: `#FFFFFF`
- `--surface-alt`: `#EEF2F7`
- `--text-primary`: `#14213D`
- `--text-secondary`: `#4B5563`
- `--border`: `#D9E2EC`
- `--primary`: `#1D4ED8`
- `--primary-strong`: `#1E3A8A`
- `--success`: `#16A34A`
- `--warning`: `#F59E0B`
- `--danger`: `#DC2626`
- `--neutral`: `#6B7280`

### Uso recomendado
- `primary`: ações principais e destaques de navegação
- `success`: bons indicadores e notas altas
- `warning`: atenção e valores médios
- `danger`: destaque para indicadores críticos
- `surface`: áreas de conteúdo
- `bg-base`: fundo geral

## 2. Tipografia

### Família
- `Inter`, `Segoe UI`, `Arial`, sans-serif

### Escalas
- `--font-size-xs`: 12px
- `--font-size-sm`: 14px
- `--font-size-md`: 16px
- `--font-size-lg`: 20px
- `--font-size-xl`: 28px
- `--font-size-2xl`: 36px

### Peso
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## 3. Espaçamento

- `--space-1`: 4px
- `--space-2`: 8px
- `--space-3`: 12px
- `--space-4`: 16px
- `--space-5`: 20px
- `--space-6`: 24px
- `--space-8`: 32px
- `--space-10`: 40px
- `--space-12`: 48px

## 4. Raio e bordas

- `--radius-sm`: 8px
- `--radius-md`: 12px
- `--radius-lg`: 16px
- `--radius-xl`: 24px

## 5. Sombras

- `--shadow-sm`: 0 1px 2px rgba(20, 33, 61, 0.06)
- `--shadow-md`: 0 6px 18px rgba(20, 33, 61, 0.12)
- `--shadow-lg`: 0 14px 28px rgba(20, 33, 61, 0.18)

## 6. Estados de componentes

### Botões
- default
- hover
- active
- disabled
- focus-visible

### Cards
- default
- hover elevating
- selected

### Inputs
- default
- focus
- error
- success

## 7. Layout e responsividade

- Desktop: 1200px+ com largura máxima centralizada
- Tablet: 768px a 1199px
- Mobile: 320px a 767px

## 8. Regras de padronização

- Usar sempre a escala de espaçamento definida.
- Não misturar estilos de botão em diferentes partes da interface.
- A nota final deve seguir uma escala visual clara e legível.
- Todos os componentes devem manter contraste aceitável e foco acessível.
