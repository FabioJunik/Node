class Item {
  constructor(nome, valor, quantidade) {
    this.nome = nome;
    this.valor = valor;
    this.quantidade = quantidade;
  }

  pegaValorTotalItem() {
    return this.quantidade * this.valor;
  }
}

export default Item;
