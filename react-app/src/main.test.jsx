import { beforeEach, describe, expect, it } from 'vitest'

describe('main entry', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>'
  })

  it('renders the app root without crashing', async () => {
    await import('./main.jsx')
    expect(document.getElementById('root')).not.toBeNull()
  })
})
