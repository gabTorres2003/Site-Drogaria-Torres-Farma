import {
    getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js";
import {
    getStorage, ref, uploadBytes, getDownloadURL, deleteObject
} from "https://www.gstatic.com/firebasejs/8.6.8/firebase-storage.js";

const db = getFirestore();
const storage = getStorage();

const produtosCollection = collection(db, "produtos");

const formProduto = document.getElementById('form-produto');
const tabelaProdutos = document.getElementById('tabela-produtos');
const btnLimpar = document.getElementById('btn-limpar-form');

const carregarProdutos = async () => {
    tabelaProdutos.innerHTML = '<tr><td colspan="6">Carregando...</td></tr>';
    const querySnapshot = await getDocs(produtosCollection);
    
    tabelaProdutos.innerHTML = '';
    
    querySnapshot.forEach((doc) => {
        const produto = doc.data();
        const row = tabelaProdutos.insertRow();
        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>R$ ${produto.valorVenda.toFixed(2)}</td>
            <td>${produto.estoque}</td>
            <td><span class="status ${produto.ativo ? 'ativo' : 'inativo'}">${produto.ativo ? 'Ativo' : 'Inativo'}</span></td>
            <td class="acoes">
                <button class="btn-acao editar" data-id="${doc.id}"><i class="fa-solid fa-pencil"></i></button>
                <button class="btn-acao deletar" data-id="${doc.id}" data-img-path="${produto.imagemPath || ''}"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
    });
};

const preencherFormulario = async (id) => {
    const docRef = doc(db, "produtos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const produto = docSnap.data();
        document.getElementById('produto-id').value = id;
        document.getElementById('produto-nome').value = produto.nome;
        document.getElementById('produto-codigo').value = produto.codigo;
        document.getElementById('produto-categoria').value = produto.categoria;
        document.getElementById('produto-tipo').value = produto.tipo;
        document.getElementById('produto-venda').value = produto.valorVenda;
        document.getElementById('produto-promocional').value = produto.valorPromocional || '';
        document.getElementById('produto-estoque').value = produto.estoque;
        document.getElementById('produto-descricao').value = produto.descricao;
        document.getElementById('produto-ativo').checked = produto.ativo;
        window.scrollTo(0, 0);
    }
};

const limparFormulario = () => {
    formProduto.reset();
    document.getElementById('produto-id').value = '';
};

formProduto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('produto-id').value;
    const nome = document.getElementById('produto-nome').value;
    const imagemInput = document.getElementById('produto-imagem');
    const file = imagemInput.files[0];

    const produtoData = {
        nome: nome,
        codigo: document.getElementById('produto-codigo').value,
        categoria: document.getElementById('produto-categoria').value,
        tipo: document.getElementById('produto-tipo').value,
        valorVenda: parseFloat(document.getElementById('produto-venda').value),
        valorPromocional: parseFloat(document.getElementById('produto-promocional').value) || 0,
        estoque: parseInt(document.getElementById('produto-estoque').value),
        descricao: document.getElementById('produto-descricao').value,
        ativo: document.getElementById('produto-ativo').checked,
    };

    try {
        if (file) {
            const storagePath = `produtos/${Date.now()}_${file.name}`;
            const storageRef = ref(storage, storagePath);
            await uploadBytes(storageRef, file);
            produtoData.imagemUrl = await getDownloadURL(storageRef);
            produtoData.imagemPath = storagePath;
        }

        if (id) {
            const produtoRef = doc(db, "produtos", id);
            await updateDoc(produtoRef, produtoData);
            alert('Produto atualizado com sucesso!');
        } else {
            await addDoc(produtosCollection, produtoData);
            alert('Produto cadastrado com sucesso!');
        }

        limparFormulario();
        await carregarProdutos();

    } catch (error) {
        console.error("Erro ao salvar produto: ", error);
        alert('Ocorreu um erro ao salvar o produto.');
    }
});

tabelaProdutos.addEventListener('click', async (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    const id = target.dataset.id;

    if (target.classList.contains('editar')) {
        await preencherFormulario(id);
    }

    if (target.classList.contains('deletar')) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                const imgPath = target.dataset.imgPath;
                if (imgPath) {
                    const imageRef = ref(storage, imgPath);
                    await deleteObject(imageRef);
                }
                
                await deleteDoc(doc(db, "produtos", id));
                alert('Produto excluído com sucesso!');
                await carregarProdutos();
            } catch (error) {
                console.error("Erro ao excluir produto: ", error);
                alert('Ocorreu um erro ao excluir o produto.');
            }
        }
    }
});

btnLimpar.addEventListener('click', limparFormulario);

document.addEventListener('DOMContentLoaded', carregarProdutos);