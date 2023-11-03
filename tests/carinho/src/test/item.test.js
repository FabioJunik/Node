import Item from '../item.js'

describe('Testes dos itens', ()=> {
  it('Dete ter 3 campos: nome, valor e quantidade', () => {
    const item = new Item('Garrafa', 100, 3)

    expect(item.nome).toBe('Garrafa')
    expect(item.valor).toBe(100)
    expect(item.quantidade).toBe(3)
  })

  it('Dete ter 3 campos: nome, valor e quantidade', () => {
    const item = new Item('Garrafa', 0.1, 3)
    
    expect(item.pegaValorTotalItem()).toBeCloseTo(0.3)
  })
})