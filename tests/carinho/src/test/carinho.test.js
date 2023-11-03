import Item from '../item'
import Carinho from '../carrinho'

describe('Testes carinho', ()=>{
  it('Deve inicializar vazio', () => {
    const carinho = new Carinho()

    expect(carinho.total).toBeNull()
    expect(carinho.itens.length).toBe(0)
  })

  it('Deve adicinar itens', ()=> {
    const item = new Item('Banana', 100, 5)
    const item2 = new Item('Abacate', 4, 30)

    const carinho = new Carinho()
    carinho.adiciona(item)
    carinho.adiciona(item2)

    expect(carinho.itens[0]).toBe(item)
    expect(carinho.itens[1]).toBe(item2)
  })

})