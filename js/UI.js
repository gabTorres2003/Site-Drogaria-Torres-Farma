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
    for (const key in this.secoesProdutos) {
      if (this.secoesProdutos[key]) {
        this.secoesProdutos[key].innerHTML = "";
      }
    }
    listaDeProdutos.forEach((produto) => {
      const secaoDoProduto = this.secoesProdutos[produto.categoria];
      if (secaoDoProduto) {
        secaoDoProduto.innerHTML += this._criarCardProdutoHTML(produto);
      }
    });
  }

  inicializarTodosOsCarrosseis() {
    const carrosseis = document.querySelectorAll(".product-swiper");
    carrosseis.forEach((carrossel) => {
      const slides = carrossel.querySelectorAll(".swiper-slide");
      const isLoopingEnabled = slides.length > 5;
      if (slides.length > 0) {
        new Swiper(carrossel, {
          loop: isLoopingEnabled,
          slidesPerView: "auto",
          spaceBetween: 24,
          navigation: {
            nextEl: carrossel.parentElement.querySelector(
              ".swiper-button-next"
            ),
            prevEl: carrossel.parentElement.querySelector(
              ".swiper-button-prev"
            ),
          },
          breakpoints: {
            320: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 24,
            },
          },
        });
        this._ajustarAlturaDosSlides(carrossel);
      }
    });
  }

  _criarCardProdutoHTML(produto) {
    const isPromo =
      produto.originalPrice && produto.originalPrice > produto.preco;
    let precoHTML = "";
    let descontoTagHTML = "";

    if (isPromo) {
      const desconto = Math.round(
        ((produto.originalPrice - produto.preco) / produto.originalPrice) * 100
      );
      descontoTagHTML = `<span class="desconto-tag"><i class="fas fa-arrow-down"></i> ${desconto}%</span>`;
      precoHTML = `
        <div class="produto-preco-wrapper">
          <span class="produto-preco-original">R$ ${produto.originalPrice
            .toFixed(2)
            .replace(".", ",")}</span>
          <p class="produto-preco">R$ ${produto.preco
            .toFixed(2)
            .replace(".", ",")}</p>
        </div>
      `;
    } else {
      precoHTML = `
        <div class="produto-preco-wrapper">
          <span class="produto-preco-original"></span>
          <p class="produto-preco">R$ ${produto.preco
            .toFixed(2)
            .replace(".", ",")}</p>
        </div>
      `;
    }

    const tagNovoHTML = produto.tags?.includes("novo")
      ? '<span class="novo-tag">Novo</span>'
      : "";

    return `
      <article class="produto-card swiper-slide" data-id="${produto.id}">
        <div class="produto-img-container">
          ${descontoTagHTML}
          ${tagNovoHTML}
          <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img" />
        </div>
        <div class="produto-info">
          <h3>${produto.nome}</h3>
          <p class="produto-descricao">${produto.descricao}</p>
          ${precoHTML}
          <button class="btn-comprar">Comprar</button>
        </div>
      </article>`;
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
        '<p class="carrinho-vazio">O seu carrinho está vazio</p>';
      return;
    }

    this.carrinhoItemsContainer.innerHTML = "";
    carrinho.itens.forEach((item) => {
      this.carrinhoItemsContainer.innerHTML +=
        this._criarItemCarrinhoHTML(item);
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

  _ajustarAlturaDosSlides(carrossel) {
    setTimeout(() => {
      const slides = carrossel.querySelectorAll(".swiper-slide");
      if (slides.length === 0) return;
      slides.forEach((slide) => {
        slide.style.height = "auto";
      });

      let maxHeight = 0;
      slides.forEach((slide) => {
        if (slide.offsetHeight > maxHeight) {
          maxHeight = slide.offsetHeight;
        }
      });
      slides.forEach((slide) => {
        slide.style.height = `${maxHeight}px`;
      });
    }, 150);
  }
  showConfirmationModal(message, onConfirm) {
    const modal = document.getElementById("custom-confirm-modal");
    const messageP = document.getElementById("confirm-message");
    const okBtn = document.getElementById("confirm-ok-btn");
    const cancelBtn = document.getElementById("confirm-cancel-btn");

    messageP.textContent = message;
    modal.classList.add("active");

    const handleConfirm = () => {
      onConfirm();
      closeModal();
    };

    const closeModal = () => {
      modal.classList.remove("active");
      okBtn.removeEventListener("click", handleConfirm);
      cancelBtn.removeEventListener("click", closeModal);
    };

    okBtn.addEventListener("click", handleConfirm, { once: true });
    cancelBtn.addEventListener("click", closeModal, { once: true });
  }
}
