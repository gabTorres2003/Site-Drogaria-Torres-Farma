document.addEventListener('DOMContentLoaded', function() {
    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const dadosFicticios = {
        faturamentoDia: 7850.55,
        pedidosHoje: 120,
        pedidosMes: 2150,
        cuponsHoje: 430.00,
        status: {
            separacao: 15,
            entregues: 95,
            cancelados: 10
        },
        topProdutos: [
            { nome: 'Dipirona 500mg', quantidade: 250, valor: 2497.50 },
            { nome: 'Protetor Solar FPS 50', quantidade: 80, valor: 4792.00 },
            { nome: 'Shampoo Anticaspa', quantidade: 120, valor: 3108.00 },
            { nome: 'Fralda Pampers G', quantidade: 95, valor: 5690.50 },
            { nome: 'Creme Dental Colgate', quantidade: 300, valor: 1197.00 }
        ],
        topClientes: [
            { nome: 'Ana Silva', pedidos: 5, valor: 450.75 },
            { nome: 'Bruno Costa', pedidos: 3, valor: 390.20 },
            { nome: 'Carla Dias', pedidos: 8, valor: 780.00 },
            { nome: 'Daniel Farias', pedidos: 2, valor: 150.50 },
            { nome: 'Elisa Martins', pedidos: 6, valor: 512.30 }
        ]
    };

    // --- PREENCHER OS CARDS DE ESTATÍSTICAS ---
    document.getElementById('faturamento-dia').textContent = formatCurrency(dadosFicticios.faturamentoDia);
    document.getElementById('pedidos-hoje').textContent = dadosFicticios.pedidosHoje;
    document.getElementById('pedidos-mes').textContent = dadosFicticios.pedidosMes;
    document.getElementById('cupons-hoje').textContent = formatCurrency(dadosFicticios.cuponsHoje);

    // --- PREENCHER O PAINEL DE STATUS DE PEDIDOS ---
    document.getElementById('status-separacao').textContent = dadosFicticios.status.separacao;
    document.getElementById('status-entregues').textContent = dadosFicticios.status.entregues;
    document.getElementById('status-cancelados').textContent = dadosFicticios.status.cancelados;
    
    // --- PREENCHER A TABELA DE TOP PRODUTOS ---
    const topProdutosTable = document.getElementById('top-produtos-table');
    dadosFicticios.topProdutos.forEach(produto => {
        const row = topProdutosTable.insertRow();
        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${formatCurrency(produto.valor)}</td>
        `;
    });

    // --- PREENCHER A TABELA DE RANKING DE CLIENTES ---
    const topClientesTable = document.getElementById('top-clientes-table');
    dadosFicticios.topClientes.forEach(cliente => {
        const row = topClientesTable.insertRow();
        row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.pedidos}</td>
            <td>${formatCurrency(cliente.valor)}</td>
        `;
    });
});