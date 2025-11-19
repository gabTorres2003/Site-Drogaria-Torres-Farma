import { supabase } from "./supabase-config.js";

// -------------------------------
// ELEMENTOS DO DOM
// -------------------------------
const form = document.getElementById("form-produto");
const tabela = document.getElementById("tabela-produtos");

const inputId = document.getElementById("produto-id");
const inputNome = document.getElementById("produto-nome");
const inputCodigo = document.getElementById("produto-codigo");
const inputCategoria = document.getElementById("categoria");
const inputTipo = document.getElementById("produto-tipo");
const inputVenda = document.getElementById("produto-venda");
const inputPromocional = document.getElementById("produto-promocional");
const inputEstoque = document.getElementById("produto-estoque");
const inputImagem = document.getElementById("produto-imagem");
const inputDescricao = document.getElementById("produto-descricao");
const inputAtivo = document.getElementById("produto-ativo");

const btnLimpar = document.getElementById("btn-limpar-form");

let imagemArquivo = null;

// -------------------------------
// CATEGORIAS OFICIAIS
// -------------------------------
const categoriasOficiais = {
    primeiros_socorros: "Primeiros Socorros",
    saude_feminina: "Saúde Feminina",
    higiene_pessoal: "Higiene Pessoal",
    mamae_bebe: "Cuidados para Mamãe e Bebê",
    vitaminas_suplementos: "Vitaminas e Suplementos",
    genericos: "Genéricos",
    novidades: "Novidades",
    mais_vendidos: "Mais Vendidos",
    promocao: "Produtos em Promoção",
};

// -------------------------------
// CARREGAR PRODUTOS AO INICIAR
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();
});

// -------------------------------
// FUNÇÃO: CARREGAR LISTA
// -------------------------------
async function carregarProdutos() {
    const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.error("Erro ao carregar produtos:", error);
        return;
    }

    tabela.innerHTML = "";

    data.forEach((produto) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>${categoriasOficiais[produto.categoria] || "—"}</td>
            <td>R$ ${produto.valor_venda.toFixed(2)}</td>
            <td>${produto.estoque}</td>
            <td>${produto.ativo ? "Ativo" : "Inativo"}</td>
            <td>
                <button class="editar" data-id="${produto.id}">Editar</button>
                <button class="excluir" data-id="${produto.id}">Excluir</button>
            </td>
        `;

        tabela.appendChild(tr);
    });

    ativarBotoes();
}

// -------------------------------
// ATIVAR BOTÕES EDITAR / EXCLUIR
// -------------------------------
function ativarBotoes() {
    document.querySelectorAll(".editar").forEach((btn) =>
        btn.addEventListener("click", () => editarProduto(btn.dataset.id))
    );

    document.querySelectorAll(".excluir").forEach((btn) =>
        btn.addEventListener("click", () => excluirProduto(btn.dataset.id))
    );
}

// -------------------------------
// EDITAR PRODUTO
// -------------------------------
async function editarProduto(id) {
    const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Erro ao buscar produto:", error);
        return;
    }

    inputId.value = data.id;
    inputNome.value = data.nome;
    inputCodigo.value = data.codigo;
    inputCategoria.value = data.categoria;
    inputTipo.value = data.tipo;
    inputVenda.value = data.valor_venda;
    inputPromocional.value = data.valor_promocional || "";
    inputEstoque.value = data.estoque;
    inputDescricao.value = data.descricao || "";
    inputAtivo.checked = data.ativo;

    imagemArquivo = null;
}

// -------------------------------
// EXCLUIR PRODUTO
// -------------------------------
async function excluirProduto(id) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    const { error } = await supabase.from("produtos").delete().eq("id", id);

    if (error) {
        alert("Erro ao excluir produto.");
        return;
    }

    carregarProdutos();
}

// -------------------------------
// UPLOAD DE IMAGEM
// -------------------------------
inputImagem.addEventListener("change", (e) => {
    imagemArquivo = e.target.files[0];
});

// -------------------------------
// SALVAR PRODUTO (CRIAR OU EDITAR)
// -------------------------------
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let imagem_url = null;

    // -----------------------------------
    // UPLOAD DA IMAGEM SE HOUVER ARQUIVO
    // -----------------------------------
    if (imagemArquivo) {
        const nomeArquivo = `${Date.now()}-${imagemArquivo.name}`;

        const { data: upload, error: uploadError } = await supabase.storage
            .from("imagens-produtos")
            .upload(`public/${nomeArquivo}`, imagemArquivo);

        if (uploadError) {
            console.error(uploadError);
            alert("Erro ao enviar imagem.");
            return;
        }

        imagem_url = `https://rwbgdgixiylrkvpfmhfp.supabase.co/storage/v1/object/public/imagens-produtos/public/${nomeArquivo}`;
    }

    // Dados do formulário
    const produtoData = {
        nome: inputNome.value,
        codigo: inputCodigo.value,
        categoria: inputCategoria.value,
        tipo: inputTipo.value,
        valor_venda: parseFloat(inputVenda.value),
        valor_promocional: inputPromocional.value ? parseFloat(inputPromocional.value) : null,
        estoque: parseInt(inputEstoque.value),
        descricao: inputDescricao.value,
        ativo: inputAtivo.checked,
    };

    // Se estiver editando
    if (inputId.value) {
        const updateData = imagem_url
            ? { ...produtoData, imagem_url }
            : produtoData;

        const { error } = await supabase
            .from("produtos")
            .update(updateData)
            .eq("id", inputId.value);

        if (error) {
            console.error(error);
            alert("Erro ao atualizar produto.");
            return;
        }
    } else {
        // Criar novo produto
        const { error } = await supabase
            .from("produtos")
            .insert([{ ...produtoData, imagem_url }]);

        if (error) {
            console.error(error);
            alert("Erro ao salvar novo produto.");
            return;
        }
    }

    form.reset();
    inputId.value = "";
    imagemArquivo = null;

    carregarProdutos();
});

// -------------------------------
// LIMPAR FORMULÁRIO
// -------------------------------
btnLimpar.addEventListener("click", () => {
    form.reset();
    inputId.value = "";
    imagemArquivo = null;
});
