class Carrinho {
  constructor() {
    // Carrega o carrinho do localStorage ou inicia um array vazio.
    this.itens = JSON.parse(localStorage.getItem("carrinhoTorresFarma")) || [];
  }

  // Adiciona um produto ao carrinho ou incrementa sua quantidade.
  adicionarItem(produto) {
    const itemExistente = this.itens.find((item) => item.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      // Adiciona o produto completo com a quantidade inicial 1.
      this.itens.push({ ...produto, quantidade: 1 });
    }
    this.salvar();
  }

  // Atualiza a quantidade de um item. Se a quantidade for 0, remove o item.
  atualizarQuantidade(produtoId, novaQuantidade) {
    const itemIndex = this.itens.findIndex((item) => item.id === produtoId);
    if (itemIndex === -1) return;

    if (novaQuantidade <= 0) {
      this.itens.splice(itemIndex, 1);
    } else {
      this.itens[itemIndex].quantidade = novaQuantidade;
    }
    this.salvar();
  }
  
  // Remove um item completamente, não importa a quantidade.
  removerItem(produtoId) {
    this.itens = this.itens.filter(item => item.id !== produtoId);
    this.salvar();
  }

  // Limpa todos os itens do carrinho.
  esvaziar() {
    this.itens = [];
    this.salvar();
  }

  // Calcula o valor total do carrinho.
  getTotal() {
    return this.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }

  // Retorna o número total de unidades no carrinho.
  getQuantidadeTotalItens() {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  // Salva o estado atual do carrinho no localStorage.
  salvar() {
    localStorage.setItem("carrinhoTorresFarma", JSON.stringify(this.itens));
  }
}