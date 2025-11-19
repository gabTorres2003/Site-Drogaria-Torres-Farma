document.addEventListener("DOMContentLoaded", function () {
  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  // DADOS FICTÍCIOS
  const dados = {
    faturamentoDia: 7850.55,
    pedidosHoje: 120,
    pedidosMes: 2150,
    cuponsHoje: 430.0,
    status: {
      separacao: 15,
      entregues: 95,
      cancelados: 10,
    },
    topProdutos: [
      { nome: "Dipirona 500mg", quantidade: 250, valor: 2497.5 },
      { nome: "Protetor Solar FPS 50", quantidade: 80, valor: 4792.0 },
      { nome: "Shampoo Anticaspa", quantidade: 120, valor: 3108.0 },
      { nome: "Fralda Pampers G", quantidade: 95, valor: 5690.5 },
      { nome: "Creme Dental Colgate", quantidade: 300, valor: 1197.0 },
    ],
    topClientes: [
      { nome: "Ana Silva", pedidos: 5, valor: 450.75 },
      { nome: "Bruno Costa", pedidos: 3, valor: 390.2 },
      { nome: "Carla Dias", pedidos: 8, valor: 780.0 },
      { nome: "Daniel Farias", pedidos: 2, valor: 150.5 },
      { nome: "Elisa Martins", pedidos: 6, valor: 512.3 },
    ],
  };

  // Atualiza KPI’s
  const ids = {
    faturamento: "faturamento-dia",
    pedidosHoje: "pedidos-hoje",
    pedidosMes: "pedidos-mes",
    cuponsHoje: "cupons-hoje",
    separacao: "status-separacao",
    entregues: "status-entregues",
    cancelados: "status-cancelados",
  };

  if (document.getElementById(ids.faturamento))
    document.getElementById(ids.faturamento).textContent = formatCurrency(dados.faturamentoDia);

  if (document.getElementById(ids.pedidosHoje))
    document.getElementById(ids.pedidosHoje).textContent = dados.pedidosHoje;

  if (document.getElementById(ids.pedidosMes))
    document.getElementById(ids.pedidosMes).textContent = dados.pedidosMes;

  if (document.getElementById(ids.cuponsHoje))
    document.getElementById(ids.cuponsHoje).textContent = formatCurrency(dados.cuponsHoje);

  if (document.getElementById(ids.separacao))
    document.getElementById(ids.separacao).textContent = dados.status.separacao;

  if (document.getElementById(ids.entregues))
    document.getElementById(ids.entregues).textContent = dados.status.entregues;

  if (document.getElementById(ids.cancelados))
    document.getElementById(ids.cancelados).textContent = dados.status.cancelados;

  // Top produtos
  const tabelaProdutos = document.getElementById("top-produtos-table");
  if (tabelaProdutos) {
    dados.topProdutos.forEach((p) => {
      const row = tabelaProdutos.insertRow();
      row.innerHTML = `
        <td>${p.nome}</td>
        <td>${p.quantidade}</td>
        <td>${formatCurrency(p.valor)}</td>`;
    });
  }

  // Top clientes
  const tabelaClientes = document.getElementById("top-clientes-table");
  if (tabelaClientes) {
    dados.topClientes.forEach((c) => {
      const row = tabelaClientes.insertRow();
      row.innerHTML = `
        <td>${c.nome}</td>
        <td>${c.pedidos}</td>
        <td>${formatCurrency(c.valor)}</td>`;
    });
  }
});
