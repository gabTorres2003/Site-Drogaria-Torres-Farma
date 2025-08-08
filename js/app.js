class App {
  constructor(carrinho, ui) {
    this.carrinho = carrinho;
    this.ui = ui;
  }

  iniciar() {
    this.ui.renderizarProdutos(produtos);
    this.ui.renderizarCarrinho(this.carrinho);
    this.ui.inicializarTodosOsCarrosseis();
    this._configurarEventListeners();
    this._configurarBannerSwiper();
    this._configurarAvisoCookies();
    this._configurarPedidoPersonalizado();
  }

  _configurarBannerSwiper() {
    if (document.querySelector(".main-banner-swiper")) {
      new Swiper(".main-banner-swiper", {
        effect: "slide",
        loop: true,
        speed: 800,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  }

  _configurarEventListeners() {
    const mainElement = document.querySelector("main");
    const carrinhoDropdown = document.querySelector(".carrinho-dropdown");
    const header = document.querySelector("header");
    const searchToggleButton = document.querySelector(".search-toggle-btn");

    if (searchToggleButton && header) {
      searchToggleButton.addEventListener("click", (e) => {
        e.stopPropagation();
        header.classList.toggle("search-active");
      });
    }

    if (mainElement) {
      mainElement.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-comprar")) {
          const card = event.target.closest(".produto-card");
          if (!card) return;
          const produtoId = parseInt(card.dataset.id);
          const produto = produtos.find((p) => p.id === produtoId);
          if (produto) {
            this.carrinho.adicionarItem(produto);
            this.ui.renderizarCarrinho(this.carrinho);
            this.ui.mostrarFeedback("Produto adicionado ao carrinho!");
          }
        }
      });
    }

    if (carrinhoDropdown) {
      carrinhoDropdown.addEventListener("click", (event) => {
        event.stopPropagation();
        const target = event.target;
        const itemElement = target.closest(".carrinho-item");

        if (target.matches(".btn-finalizar, .btn-esvaziar-carrinho")) return;

        const produtoId = itemElement ? parseInt(itemElement.dataset.id) : null;
        const itemNoCarrinho = produtoId
          ? this.carrinho.itens.find((i) => i.id === produtoId)
          : null;

        if (!itemNoCarrinho) return;

        if (target.matches(".carrinho-item-aumentar")) {
          this.carrinho.atualizarQuantidade(
            produtoId,
            itemNoCarrinho.quantidade + 1
          );
        } else if (target.matches(".carrinho-item-diminuir")) {
          this.carrinho.atualizarQuantidade(
            produtoId,
            itemNoCarrinho.quantidade - 1
          );
        } else if (
          target.matches(
            ".carrinho-item-remover-total, .carrinho-item-remover-total *"
          )
        ) {
          this.carrinho.removerItem(produtoId);
        }
        this.ui.renderizarCarrinho(this.carrinho);
      });

      const btnFinalizar = document.querySelector(".btn-finalizar");
      if (btnFinalizar) {
        btnFinalizar.addEventListener("click", (event) => {
          event.stopPropagation();
          if (this.carrinho.itens.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
          }
          this.ui.abrirInfoModal();
        });
      }

      const btnEsvaziar = document.querySelector(".btn-esvaziar-carrinho");
      if (btnEsvaziar) {
        btnEsvaziar.addEventListener("click", (event) => {
          event.stopPropagation();
          if (this.carrinho.itens.length > 0) {
            this.ui.showConfirmationModal(
              "Tem certeza que deseja remover todos os itens do carrinho?",
              () => {
                this.carrinho.esvaziar();
                this.ui.renderizarCarrinho(this.carrinho);
              }
            );
          }
        });
      }

      document.querySelector(".carrinho-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        this.ui.toggleCarrinho();
      });
      document
        .querySelector(".btn-fechar-carrinho")
        .addEventListener("click", (e) => {
          e.stopPropagation();
          this.ui.fecharCarrinho();
        });
    }

    document.addEventListener("click", (event) => {
      const carrinhoContainer = document.querySelector(".carrinho-container");
      if (carrinhoContainer && !carrinhoContainer.contains(event.target)) {
        this.ui.fecharCarrinho();
      }

      const headerElement = document.querySelector("header");
      if (
        headerElement &&
        headerElement.classList.contains("search-active") &&
        !headerElement.contains(event.target)
      ) {
        headerElement.classList.remove("search-active");
      }
    });

    if (this.ui.modal) {
      this.ui.closeModalBtn.addEventListener("click", () =>
        this.ui.fecharInfoModal()
      );
      this.ui.modal.addEventListener("click", (event) => {
        if (event.target === this.ui.modal) {
          this.ui.fecharInfoModal();
        }
      });

      this.ui.precisaTrocoCheckbox.addEventListener("change", () => {
        this.ui.trocoWrapper.style.display = this.ui.precisaTrocoCheckbox
          .checked
          ? "block"
          : "none";
      });

      this.ui.temComplementoCheckbox.addEventListener("change", () => {
        this.ui.complementoWrapper.style.display = this.ui
          .temComplementoCheckbox.checked
          ? "block"
          : "none";
      });

      this.ui.infoForm.addEventListener("submit", (event) =>
        this._handleFormSubmit(event)
      );
    }

    this._configurarBusca();
    this._configurarMenusGenericos();
    this._configurarBotaoVoltarAoTopo();
    this._configurarFormularioContato();
  }

  _handleFormSubmit(event) {
    event.preventDefault();
    this.ui.showConfirmationModal(
      "Deseja confirmar o envio do pedido? Você será redirecionado ao WhatsApp para finalizar.",
      () => {
        this._enviarPedido();
      }
    );
  }

  _enviarPedido() {
    const nome = document.getElementById("cliente-nome").value;
    const celular = document.getElementById("cliente-celular").value;
    const rua = document.getElementById("cliente-rua").value;
    const numero = document.getElementById("cliente-numero").value;
    const bairro = document.getElementById("cliente-bairro").value;
    const temComplemento = document.getElementById("tem-complemento").checked;
    const complemento = document.getElementById("cliente-complemento").value;
    const referencia = document.getElementById("cliente-referencia").value;
    const pagamento = document.getElementById("cliente-pagamento").value;
    const precisaTroco = document.getElementById("precisa-troco").checked;
    const trocoPara = document.getElementById("cliente-troco").value;

    const totalPedido = this.carrinho.getTotal();
    const itensParaMensagem = this.carrinho.itens
      .map((item) => {
        const totalItem = item.preco * item.quantidade;
        return `${item.quantidade}x ${item.nome} (R$ ${item.preco
          .toFixed(2)
          .replace(".", ",")}) - Total: R$ ${totalItem
          .toFixed(2)
          .replace(".", ",")}`;
      })
      .join("\n");

    const enderecoCompleto = `${rua}, Nº ${numero} - ${bairro}`;

    let dadosCliente = `*DADOS DO CLIENTE:*\nNome: ${nome}\nCelular: ${celular}\nEndereço: ${enderecoCompleto}`;

    if (temComplemento && complemento) {
      dadosCliente += `\nComplemento: ${complemento}`;
    }
    if (referencia) {
      dadosCliente += `\nPonto de Referência: ${referencia}`;
    }

    dadosCliente += `\n\n*PAGAMENTO:*\nForma de Pagamento: ${pagamento}`;
    if (precisaTroco && trocoPara) {
      dadosCliente += `\nPrecisa de troco para: R$ ${trocoPara}`;
    } else if (precisaTroco) {
      dadosCliente += `\n(Precisa de troco)`;
    }

    const mensagem = `Olá, Drogaria Torres Farma! Gostaria de fazer o seguinte pedido:\n\n*RESUMO DO PEDIDO:*\n${itensParaMensagem}\n\n*TOTAL DO PEDIDO: R$ ${totalPedido
      .toFixed(2)
      .replace(".", ",")}*\n\n-------------------------\n\n${dadosCliente}`;
    const numeroFarmacia = "5522999404155";
    window.open(
      `https://wa.me/${numeroFarmacia}?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );

    this.carrinho.esvaziar();
    this.ui.renderizarCarrinho(this.carrinho);
    this.ui.fecharInfoModal();
  }

  _configurarBusca() {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");
    const suggestionsContainer = document.querySelector(".search-suggestions");
    const header = document.querySelector("header");

    if (!searchInput || !searchButton || !suggestionsContainer) {
      return;
    }

    const realizarBusca = () => {
      const termo = searchInput.value.trim().toLowerCase();
      this.ui.esconderSugestoes();

      if (header) header.classList.remove("search-active");

      if (termo === "") {
        this.ui.restaurarVisualizacaoPadrao();
        this.ui.inicializarTodosOsCarrosseis();
        return;
      }

      const resultados = produtos.filter(
        (p) =>
          p.nome.toLowerCase().includes(termo) ||
          p.descricao.toLowerCase().includes(termo)
      );
      this.ui.renderizarResultadosBusca(resultados, searchInput.value.trim());
    };

    searchInput.addEventListener("input", () => {
      const termo = searchInput.value.trim().toLowerCase();

      if (searchInput.value.trim() === "") {
        this.ui.restaurarVisualizacaoPadrao();
        this.ui.inicializarTodosOsCarrosseis();
      }

      if (termo.length < 2) {
        this.ui.esconderSugestoes();
        return;
      }

      const resultados = produtos.filter((p) =>
        p.nome.toLowerCase().includes(termo)
      );
      const sugestoesLimitadas = resultados.slice(0, 7);
      this.ui.renderizarSugestoes(sugestoesLimitadas);
    });

    suggestionsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("suggestion-item")) {
        searchInput.value = event.target.textContent;
        realizarBusca();
      }
    });

    searchButton.addEventListener("click", realizarBusca);

    searchInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        realizarBusca();
      }
    });
  }

  _configurarMenusGenericos() {
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownContent = document.querySelector(".dropdown-content");
    const menuToggle = document.querySelector(".menu-toggle");
    const headerNav = document.querySelector(".header-nav");

    if (dropdownBtn) {
      dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownContent.classList.toggle("show");
      });
    }

    if (menuToggle && headerNav) {
      menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        headerNav.classList.toggle("active");
      });

      headerNav.addEventListener("click", (e) => {
        if (e.target.tagName === "A" || e.target.closest("A")) {
          headerNav.classList.remove("active");
        }
      });
    }

    window.addEventListener("click", () => {
      if (dropdownContent && dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    });
  }

  _configurarBotaoVoltarAoTopo() {
    const backToTopButton = document.getElementById("back-to-top");
    if (backToTopButton) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTopButton.classList.add("visible");
        } else {
          backToTopButton.classList.remove("visible");
        }
      });
      backToTopButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }

  _configurarFormularioContato() {
    const formContato = document.getElementById("formContatoWhatsApp");
    if (formContato) {
      formContato.addEventListener("submit", function (event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const assunto = document.getElementById("assunto").value.trim();
        const mensagemUsuario = document
          .getElementById("mensagem")
          .value.trim();
        if (!nome || !email || !assunto || !mensagemUsuario) {
          alert("Por favor, preencha todos os campos obrigatórios.");
          return;
        }
        let mensagemWhatsApp = `Nova Mensagem de Contato (do Site):\n\nNome: ${nome}\nE-mail: ${email}\n`;
        if (telefone) {
          mensagemWhatsApp += `Telefone: ${telefone}\n`;
        }
        mensagemWhatsApp += `Assunto: ${assunto}\n\nMensagem:\n${mensagemUsuario}`;
        const numeroFarmaciaContato = "5522999404155";
        const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
        window.open(
          `https://wa.me/${numeroFarmaciaContato}?text=${mensagemCodificada}`,
          "_blank"
        );
        formContato.reset();
      });
    }
  }
  _configurarAvisoCookies() {
    const banner = document.getElementById("cookie-banner");
    const btnAceitar = document.getElementById("aceitar-cookies");

    if (!banner || !btnAceitar) {
      return;
    }

    const cookiesAceitos = localStorage.getItem("cookiesAceitosTorresFarma");

    if (cookiesAceitos) {
      banner.style.display = "none";
      return;
    }
    setTimeout(() => {
      banner.style.display = "flex";
      setTimeout(() => banner.classList.add("visible"), 50);
    }, 500);

    btnAceitar.addEventListener("click", () => {
      localStorage.setItem("cookiesAceitosTorresFarma", "true");
      banner.classList.remove("visible");

      setTimeout(() => {
        banner.style.display = "none";
      }, 500);
    });
  }

  _configurarPedidoPersonalizado() {
    const botao = document.getElementById("botao-pedido-personalizado");
    const modal = document.getElementById("modal-pedido-personalizado");

    if (!botao || !modal) return;

    botao.addEventListener("click", (evento) => {
      evento.preventDefault();
      this.ui.abrirModalPedidoPersonalizado();
    });

    const form = document.getElementById("form-pedido-personalizado");
    const btnFechar = modal.querySelector(".close-modal");

    form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      this._enviarPedidoPersonalizado();
    });

    btnFechar.addEventListener("click", () =>
      this.ui.fecharModalPedidoPersonalizado()
    );
    modal.addEventListener("click", (evento) => {
      if (evento.target === modal) {
        this.ui.fecharModalPedidoPersonalizado();
      }
    });
  }

  _enviarPedidoPersonalizado() {
    const nome = document.getElementById("personalizado-nome").value;
    const celular = document.getElementById("personalizado-celular").value;
    const bairro = document.getElementById("personalizado-bairro").value;
    const produtosDesejados =
      document.getElementById("produtos-desejados").value;

    let mensagem =
      `*SOLICITAÇÃO DE PEDIDO PERSONALIZADO*\n\n` +
      `*Cliente:* ${nome}\n` +
      `*Celular:* ${celular}\n`;

    if (bairro) {
      mensagem += `*Bairro:* ${bairro}\n\n`;
    }

    mensagem += `*Produtos que procuro:*\n${produtosDesejados}`;

    const numeroFarmacia = "5522999404155";
    window.open(
      `https://wa.me/${numeroFarmacia}?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );

    this.ui.fecharModalPedidoPersonalizado();
    this.ui.mostrarFeedback("Sua solicitação foi enviada!");
  }

  _enviarPedidoPersonalizado() {
    const nome = document.getElementById("personalizado-nome").value;
    const celular = document.getElementById("personalizado-celular").value;
    const bairro = document.getElementById("personalizado-bairro").value;
    const produtosDesejados =
      document.getElementById("produtos-desejados").value;

    let mensagem =
      `*SOLICITAÇÃO DE PEDIDO PERSONALIZADO*\n\n` +
      `*Cliente:* ${nome}\n` +
      `*Celular:* ${celular}\n`;

    if (bairro) {
      mensagem += `*Bairro:* ${bairro}\n\n`;
    }

    mensagem += `*Produtos que procuro:*\n${produtosDesejados}`;

    const numeroFarmacia = "5522999404155";
    window.open(
      `https://wa.me/${numeroFarmacia}?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );

    this.ui.fecharModalPedidoPersonalizado();
    this.ui.mostrarFeedback("Sua solicitação foi enviada!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App(new Carrinho(), new UI());
  app.iniciar();
});
