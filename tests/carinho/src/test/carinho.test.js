import Item from '../item';
import Carrinho from '../carrinho';

describe('Testes carrinho', () => {
  it('Deve inicializar vazio', () => {
    const carrinho = new Carrinho();

    expect(carrinho.total).toBeNull();
    expect(carrinho.itens.length).toBe(0);
  });

  it('Deve adicinar itens', () => {
    const item = new Item('Banana', 100, 5);
    const item2 = new Item('Abacate', 4, 30);

    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adiciona(item2);

    expect(carrinho.itens[0]).toBe(item);
    expect(carrinho.itens[1]).toBe(item2);
  });

  it('Deve lançar um erro ao finalizar um carrinho vazio ', () => {
    function englobaErroCarrinho() {
      const carrinho = new Carrinho();
      carrinho.finalizaCompra();
    }

    expect(englobaErroCarrinho).toThrowError('Carrinho de compras vazio');
  });

  it('Deve calcular o total', () => {
    const item = new Item('Banana', 10, 5);
    const item2 = new Item('Abacate', 4, 30);

    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adiciona(item2);
    carrinho.adicionaFrete(2)

    const totalDasCompras = carrinho.calculaTotal()

    expect(totalDasCompras).toBe(172)
  });

  it('Deve finalizar as compras', () => {
    const item = new Item('Banana', 10, 5);
    const item2 = new Item('Abacate', 4, 30);

    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adiciona(item2);
    carrinho.adicionaFrete(2)

    const compraFinalizada = carrinho.finalizaCompra()
    expect(compraFinalizada).toStrictEqual({
      subtotal: 170,
      frete: 2, 
      total: 172
    })

  })
});
