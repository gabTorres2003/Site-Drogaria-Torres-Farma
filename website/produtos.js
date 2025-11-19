import { supabase } from "./js/supabase-config.js";

document.addEventListener("DOMContentLoaded", async () => {

  // Mapeamento correto entre categorias do SUPABASE e as seções do HTML
  const categoriasMap = {
    promocao: document.querySelector("#produtos .produtos-grid"),
    mais_vendidos: document.querySelector("#mais-vendidos .produtos-grid"),
    novidades: document.querySelector("#novidades .produtos-grid"),
    genericos: document.querySelector("#genericos .produtos-grid"),
    vitaminas_suplementos: document.querySelector("#vitaminas-suplementos .produtos-grid"),
    mamae_bebe: document.querySelector("#mamae-bebe .produtos-grid"),
    higiene_pessoal: document.querySelector("#higiene-pessoal .produtos-grid"),
    saude_feminina: document.querySelector("#saude-feminina .produtos-grid"),
    primeiros_socorros: document.querySelector("#primeiros-socorros .produtos-grid"),
  };

  // Buscar produtos ativos
  const { data: produtos, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true);

  if (error) {
    console.error("Erro ao buscar produtos:", error.message);
    return;
  }

  if (!produtos || produtos.length === 0) {
    console.warn("Nenhum produto encontrado.");
    return;
  }

  // Adicionar produtos em suas categorias
  produtos.forEach((produto) => {
    const grid = categoriasMap[produto.categoria];

    if (!grid) {
      console.warn("Categoria não encontrada:", produto.categoria, "Produto:", produto.nome);
      return;
    }

    const precoFinal = produto.valor_promocional || produto.valor_venda;

    const card = document.createElement("div");
    card.classList.add("swiper-slide", "produto-card");

    card.innerHTML = `
      <img src="${produto.imagem_url}" alt="${produto.nome}" />
      
      <h3>${produto.nome}</h3>
      <p>${produto.descricao || ""}</p>

      <div class="precos">
        ${
          produto.valor_promocional
            ? `
              <span class="preco-original">R$ ${produto.valor_venda.toFixed(2).replace(".", ",")}</span>
              <span class="preco-promocional">R$ ${produto.valor_promocional.toFixed(2).replace(".", ",")}</span>
              `
            : `<span class="preco">R$ ${produto.valor_venda.toFixed(2).replace(".", ",")}</span>`
        }
      </div>

      <button class="btn-adicionar"
        data-nome="${produto.nome}"
        data-preco="${precoFinal}">
        Adicionar ao Carrinho
      </button>
    `;

    grid.appendChild(card);
  });

  inicializarSwiper();
  ativarEventosCarrinho();
});


// ▶ SWIPER
function inicializarSwiper() {
  document.querySelectorAll(".product-swiper").forEach((swiperEl) => {
    new Swiper(swiperEl, {
      slidesPerView: 2,
      spaceBetween: 15,
      loop: true,
      navigation: {
        nextEl: swiperEl.querySelector(".swiper-button-next"),
        prevEl: swiperEl.querySelector(".swiper-button-prev"),
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      },
    });
  });
}


// ▶ CARRINHO
function ativarEventosCarrinho() {
  document.querySelectorAll(".btn-adicionar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nome = btn.dataset.nome;
      const preco = parseFloat(btn.dataset.preco);

      // Evento global que o carrinho.js escuta
      document.dispatchEvent(
        new CustomEvent("adicionarAoCarrinho", {
          detail: { nome, preco },
        })
      );

      btn.innerHTML = "Adicionado ✔";
      btn.style.backgroundColor = "#28a745";

      setTimeout(() => {
        btn.innerHTML = "Adicionar ao Carrinho";
        btn.style.backgroundColor = "";
      }, 1500);
    });
  });
}
