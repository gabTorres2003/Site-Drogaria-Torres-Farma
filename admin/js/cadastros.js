import { supabase } from '/js/supabase-config.js';

const formProduto = document.getElementById('form-produto');
const tabelaProdutos = document.getElementById('tabela-produtos');
const btnLimpar = document.getElementById('btn-limpar-form');

const carregarProdutos = async () => {
    tabelaProdutos.innerHTML = '<tr><td colspan="6">Carregando...</td></tr>';

    const { data: produtos, error } = await supabase
        .from('produtos')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao carregar produtos:', error.message);
        tabelaProdutos.innerHTML = `<tr><td colspan="6">Erro ao carregar produtos: ${error.message}</td></tr>`;
        return;
    }

    if (produtos.length === 0) {
        tabelaProdutos.innerHTML = '<tr><td colspan="6">Nenhum produto cadastrado ainda.</td></tr>';
        return;
    }
    
    tabelaProdutos.innerHTML = '';

    produtos.forEach(produto => {
        const row = tabelaProdutos.insertRow();
        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.categoria || 'N/A'}</td>
            <td>R$ ${Number(produto.valor_venda).toFixed(2).replace('.', ',')}</td>
            <td>${produto.estoque}</td>
            <td><span class="status ${produto.ativo ? 'ativo' : 'inativo'}">${produto.ativo ? 'Ativo' : 'Inativo'}</span></td>
            <td class="acoes">
                <button class="btn-acao editar" data-id="${produto.id}"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn-acao deletar" data-id="${produto.id}" data-img-url="${produto.imagem_url || ''}"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
    });
};

const salvarProduto = async (e) => {
    e.preventDefault();

    const id = document.getElementById('produto-id').value;
    const imagemInput = document.getElementById('produto-imagem');
    const file = imagemInput.files[0];
    let imagemUrlFinal = null;

    if (file) {
        const nomeArquivo = `public/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
            .from('imagens-produtos')
            .upload(nomeArquivo, file);

        if (uploadError) {
            console.error('Erro no upload da imagem:', uploadError);
            alert('Falha ao enviar a imagem. Verifique o console para mais detalhes.');
            return;
        }

        const { data: publicUrlData } = supabase.storage
            .from('imagens-produtos')
            .getPublicUrl(nomeArquivo);
        imagemUrlFinal = publicUrlData.publicUrl;
    }

    const dadosProduto = {
        nome: document.getElementById('produto-nome').value,
        codigo: document.getElementById('produto-codigo').value || null,
        categoria: document.getElementById('produto-categoria').value || null,
        tipo: document.getElementById('produto-tipo').value || null,
        valor_venda: parseFloat(document.getElementById('produto-venda').value),
        valor_promocional: parseFloat(document.getElementById('produto-promocional').value) || null,
        estoque: parseInt(document.getElementById('produto-estoque').value),
        descricao: document.getElementById('produto-descricao').value || null,
        ativo: document.getElementById('produto-ativo').checked,
    };
    
    if (imagemUrlFinal) {
        dadosProduto.imagem_url = imagemUrlFinal;
    }

    let resultado;
    if (id) {
        resultado = await supabase.from('produtos').update(dadosProduto).eq('id', id);
    } else {
        resultado = await supabase.from('produtos').insert([dadosProduto]);
    }
    
    if (resultado.error) {
        console.error('Erro ao salvar produto:', resultado.error.message);
        alert(`Falha ao salvar o produto: ${resultado.error.message}`);
    } else {
        alert(`Produto ${id ? 'atualizado' : 'cadastrado'} com sucesso!`);
        limparFormulario();
        await carregarProdutos();
    }
};

const preencherFormularioParaEdicao = async (id) => {
    const { data: produto, error } = await supabase.from('produtos').select('*').eq('id', id).single();

    if (error) {
        console.error('Erro ao buscar produto para edição:', error.message);
        return;
    }

    document.getElementById('produto-id').value = id;
    document.getElementById('produto-nome').value = produto.nome;
    document.getElementById('produto-codigo').value = produto.codigo;
    document.getElementById('produto-categoria').value = produto.categoria;
    document.getElementById('produto-tipo').value = produto.tipo;
    document.getElementById('produto-venda').value = produto.valor_venda;
    document.getElementById('produto-promocional').value = produto.valor_promocional;
    document.getElementById('produto-estoque').value = produto.estoque;
    document.getElementById('produto-descricao').value = produto.descricao;
    document.getElementById('produto-ativo').checked = produto.ativo;
    
    window.scrollTo(0, 0);
};

const deletarProduto = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
        return;
    }
    const { error } = await supabase.from('produtos').delete().eq('id', id);

    if (error) {
        console.error('Erro ao deletar produto:', error.message);
        alert(`Falha ao deletar o produto: ${error.message}`);
    } else {
        alert('Produto deletado com sucesso!');
        await carregarProdutos();
    }
};

const limparFormulario = () => {
    formProduto.reset();
    document.getElementById('produto-id').value = '';
};

document.addEventListener('DOMContentLoaded', carregarProdutos);

formProduto.addEventListener('submit', salvarProduto);

tabelaProdutos.addEventListener('click', (e) => {
    const editButton = e.target.closest('.editar');
    const deleteButton = e.target.closest('.deletar');

    if (editButton) {
        const id = editButton.dataset.id;
        preencherFormularioParaEdicao(id);
    }
    if (deleteButton) {
        const id = deleteButton.dataset.id;
        deletarProduto(id);
    }
});

btnLimpar.addEventListener('click', limparFormulario);