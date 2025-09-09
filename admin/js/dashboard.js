document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');
    const productList = document.getElementById('product-list');

    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.getElementById('product-name').value;
        const productPrice = parseFloat(document.getElementById('product-price').value);
        const productDescription = document.getElementById('product-description').value;
        const productImageUrl = document.getElementById('product-image-url').value;

        db.collection('products').add({
            name: productName,
            price: productPrice,
            description: productDescription,
            imageUrl: productImageUrl
        })
        .then(() => {
            addProductForm.reset();
            alert('Produto adicionado com sucesso!');
        })
        .catch((error) => {
            console.error('Erro ao adicionar produto: ', error);
        });
    });

    db.collection('products').onSnapshot((snapshot) => {
        productList.innerHTML = '';
        snapshot.forEach((doc) => {
            const product = doc.data();
            const productId = doc.id;

            const productElement = document.createElement('div');
            productElement.classList.add('product-item');
            productElement.innerHTML = `
                <p><strong>${product.name}</strong> - R$ ${product.price.toFixed(2)}</p>
                <button onclick="deleteProduct('${productId}')">Excluir</button>
                `;
            productList.appendChild(productElement);
        });
    });
});

function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        db.collection('products').doc(id).delete()
            .then(() => {
                alert('Produto excluído com sucesso!');
            })
            .catch((error) => {
                console.error('Erro ao excluir produto: ', error);
            });
    }
}