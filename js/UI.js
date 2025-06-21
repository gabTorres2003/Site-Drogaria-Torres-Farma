class UI {
  constructor() {
    this.secoesProdutos = {
      promocao: document.querySelector("#produtos .produtos-grid"),
      "mais-vendidos": document.querySelector("#mais-vendidos .produtos-grid"),
      novidades: document.querySelector("#novidades .produtos-grid"),
      genericos: document.querySelector("#genericos .produtos-grid"),
      "vitaminas-suplementos": document.querySelector(
        "#vitaminas-suplementos .produtos-grid"
      ),
      "mamae-bebe": document.querySelector("#mamae-bebe .produtos-grid"),
      "higiene-pessoal": document.querySelector(
        "#higiene-pessoal .produtos-grid"
      ),
      "saude-feminina": document.querySelector(
        "#saude-feminina .produtos-grid"
      ),
      "primeiros-socorros": document.querySelector(
        "#primeiros-socorros .produtos-grid"
      ),
    };

    this.mainContainer = document.querySelector("main");
    this.buscaResultadosContainer = document.querySelector(
      "#busca-resultados .busca-grid"
    );
    this.buscaResultadosSection = document.querySelector("#busca-resultados");

    this.carrinhoItemsContainer = document.querySelector(".carrinho-items");
    this.carrinhoQuantidadeIcone = document.querySelector(
      ".carrinho-quantidade"
    );
    this.carrinhoTotalDisplay = document.querySelector(".carrinho-total span");
    this.carrinhoDropdown = document.querySelector(".carrinho-dropdown");

    this.suggestionsContainer = document.querySelector(".search-suggestions");

    this.modal = document.getElementById("info-modal");
    this.closeModalBtn = document.querySelector(".close-modal");
    this.infoForm = document.getElementById("info-form");
    this.precisaTrocoCheckbox = document.getElementById("precisa-troco");
    this.trocoWrapper = document.getElementById("troco-wrapper");
    this.temComplementoCheckbox = document.getElementById("tem-complemento");
    this.complementoWrapper = document.getElementById("complemento-wrapper");
  }

  renderizarProdutos(listaDeProdutos) {
    if (!document.querySelector(".produtos-grid")) return;

    for (const key in this.secoesProdutos) {
      if (this.secoesProdutos[key]) this.secoesProdutos[key].innerHTML = "";
    }

    listaDeProdutos.forEach((produto) => {
      const secaoDoProduto = this.secoesProdutos[produto.categoria];
      if (secaoDoProduto) {
        secaoDoProduto.innerHTML += this._criarCardProdutoHTML(produto);
      }
    });
  }

  renderizarCarrinho(carrinho) {
    if (!this.carrinhoItemsContainer) return;

    this.carrinhoQuantidadeIcone.textContent =
      carrinho.getQuantidadeTotalItens();
    this.carrinhoTotalDisplay.textContent = `R$ ${carrinho
      .getTotal()
      .toFixed(2)
      .replace(".", ",")}`;

    if (carrinho.itens.length === 0) {
      this.carrinhoItemsContainer.innerHTML =
        '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
      return;
    }

    this.carrinhoItemsContainer.innerHTML = "";
    carrinho.itens.forEach((item) => {
      this.carrinhoItemsContainer.innerHTML +=
        this._criarItemCarrinhoHTML(item);
    });
  }

  inicializarTodosOsCarrosseis() {
    const todosCarrosselContainers = document.querySelectorAll(
      ".produtos-container"
    );
    if (todosCarrosselContainers.length === 0) return;

    todosCarrosselContainers.forEach((carrosselContainer) => {
      const carrossel = carrosselContainer.querySelector(".produtos-carrossel");
      const btnPrev = carrosselContainer.querySelector(".carrossel-btn.prev");
      const btnNext = carrosselContainer.querySelector(".carrossel-btn.next");
      const produtosGrid = carrossel
        ? carrossel.querySelector(".produtos-grid")
        : null;

      if (
        !produtosGrid ||
        produtosGrid.children.length === 0 ||
        !btnPrev ||
        !btnNext
      ) {
        if (btnPrev) btnPrev.style.display = "none";
        if (btnNext) btnNext.style.display = "none";
        return;
      }

      const originalCards = Array.from(produtosGrid.children);
      const numOriginalCards = originalCards.length;
      const cardWidth = originalCards[0].offsetWidth;
      const visibleCards = Math.floor(carrossel.clientWidth / (cardWidth + 24));

      if (numOriginalCards <= visibleCards) {
        btnPrev.style.visibility = "hidden";
        btnNext.style.visibility = "hidden";
        return;
      } else {
        btnPrev.style.visibility = "visible";
        btnNext.style.visibility = "visible";
      }

      if (produtosGrid.children.length > numOriginalCards) return;

      originalCards
        .slice()
        .reverse()
        .forEach((card) => {
          const clone = card.cloneNode(true);
          produtosGrid.insertBefore(clone, produtosGrid.firstChild);
        });
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        produtosGrid.appendChild(clone);
      });

      let gap = 24;
      let currentIndex = numOriginalCards;
      carrossel.style.scrollBehavior = "auto";
      carrossel.scrollLeft = currentIndex * (cardWidth + gap);

      requestAnimationFrame(() => {
        carrossel.style.scrollBehavior = "smooth";
      });

      let isTransitioning = false;
      const moveTo = (direction) => {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex += direction;
        carrossel.scrollTo({
          left: currentIndex * (cardWidth + gap),
          behavior: "smooth",
        });

        setTimeout(() => {
          let jumped = false;
          if (currentIndex >= numOriginalCards * 2) {
            currentIndex = numOriginalCards;
            jumped = true;
          } else if (currentIndex < numOriginalCards) {
            currentIndex = numOriginalCards * 2 - 1;
            jumped = true;
          }

          if (jumped) {
            carrossel.style.scrollBehavior = "auto";
            carrossel.scrollLeft = currentIndex * (cardWidth + gap);
            requestAnimationFrame(() => {
              carrossel.style.scrollBehavior = "smooth";
            });
          }
          isTransitioning = false;
        }, 500);
      };

      btnNext.addEventListener("click", () => moveTo(1));
      btnPrev.addEventListener("click", () => moveTo(-1));
    });
  }

  mostrarFeedback(mensagem) {
    const feedback = document.createElement("div");
    feedback.className = "feedback-carrinho";
    feedback.textContent = mensagem;
    document.body.appendChild(feedback);

    setTimeout(() => feedback.classList.add("show"), 10);
    setTimeout(() => {
      feedback.classList.remove("show");
      setTimeout(() => {
        if (document.body.contains(feedback)) {
          document.body.removeChild(feedback);
        }
      }, 300);
    }, 2000);
  }

  toggleCarrinho() {
    this.carrinhoDropdown.classList.toggle("active");
  }

  fecharCarrinho() {
    this.carrinhoDropdown.classList.remove("active");
  }

  renderizarSugestoes(sugestoes) {
    this.esconderSugestoes();
    if (sugestoes.length > 0) {
      sugestoes.forEach((produto) => {
        const item = document.createElement("div");
        item.className = "suggestion-item";
        item.textContent = produto.nome;
        this.suggestionsContainer.appendChild(item);
      });
      this.suggestionsContainer.style.display = "block";
    }
  }

  esconderSugestoes() {
    if (this.suggestionsContainer) {
      this.suggestionsContainer.innerHTML = "";
      this.suggestionsContainer.style.display = "none";
    }
  }

  renderizarResultadosBusca(resultados, termoBusca) {
    if (!this.buscaResultadosContainer) return;
    this.mainContainer
      .querySelectorAll(".produtos-container")
      .forEach((secao) => {
        secao.style.display = "none";
      });

    this.buscaResultadosContainer.innerHTML = "";
    const tituloResultados = this.buscaResultadosSection.querySelector("h2");

    this.buscaResultadosSection.style.display = "block";

    if (resultados.length === 0) {
      tituloResultados.textContent = `Nenhum resultado para "${termoBusca}"`;
    } else {
      tituloResultados.textContent = `Resultados para "${termoBusca}"`;
      resultados.forEach((produto) => {
        this.buscaResultadosContainer.innerHTML +=
          this._criarCardProdutoHTML(produto);
      });
    }
  }

  restaurarVisualizacaoPadrao() {
    if (this.buscaResultadosSection) {
      this.buscaResultadosSection.style.display = "none";
    }

    this.mainContainer
      .querySelectorAll(".produtos-container")
      .forEach((secao) => {
        secao.style.display = "block";
      });
  }

  abrirInfoModal() {
    if (this.modal) this.modal.classList.add("active");
  }

  fecharInfoModal() {
    if (this.modal) {
      this.modal.classList.remove("active");
      this.infoForm.reset();
      this.trocoWrapper.style.display = "none";
      this.complementoWrapper.style.display = "none";
    }
  }

  _criarCardProdutoHTML(produto) {
    const tagNovoHTML = produto.tags?.includes("novo")
      ? '<span class="novo-tag">Novo</span>'
      : "";
    return `
      <article class="produto-card" data-id="${produto.id}">
        <div class="produto-img-container">${tagNovoHTML}<img src="${
      produto.imagem
    }" alt="${produto.nome}" class="produto-img" /></div>
        <div class="produto-info">
          <h3>${produto.nome}</h3>
          <p class="produto-descricao">${produto.descricao}</p>
          <p class="produto-preco">R$ ${produto.preco
            .toFixed(2)
            .replace(".", ",")}</p>
          <button class="btn-comprar">Comprar</button>
        </div>
      </article>`;
  }

  _criarItemCarrinhoHTML(item) {
    return `
      <div class="carrinho-item" data-id="${item.id}">
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="carrinho-item-info">
          <p class="carrinho-item-nome">${item.nome}</p>
          <p class="carrinho-item-preco">R$ ${item.preco
            .toFixed(2)
            .replace(".", ",")}</p>
          <div class="carrinho-item-controls">
            <button class="carrinho-item-diminuir" aria-label="Diminuir">-</button>
            <span class="carrinho-item-quantidade">Qtd: ${
              item.quantidade
            }</span>
            <button class="carrinho-item-aumentar" aria-label="Aumentar">+</button>
          </div>
        </div>
        <button class="carrinho-item-remover-total" aria-label="Remover item"><i class="fas fa-trash-alt"></i></button>
      </div>`;
  }
}
