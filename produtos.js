const produtos = [
  {
    "id": 1,
    "nome": "Absorvente Intimus Noturno 16 Unidades",
    "descricao": "Absorvente Intimus Noturno 16 Unidades: Máxima proteção e conforto para uma noite de sono segura, mesmo com fluxo intenso.",
    "preco": 9.99,
    "imagem": "assets/img/produtos/abs-intmus-noturno-16unid.jpg",
    "categoria": "saude-feminina",
    "tags": [
      "novo"
    ]
  },
  {
    "id": 2,
    "nome": "Antisséptico Spray Nexderm 50ml",
    "descricao": "Antisséptico Spray Nexderm 50ml: Limpa e protege ferimentos e arranhões, prevenindo infecções de forma prática.",
    "preco": 14.9,
    "imagem": "assets/img/produtos/anti-septico-spray-50ml-nexderm.jpg",
    "categoria": "primeiros-socorros",
    "tags": []
  },
  {
    "id": 3,
    "nome": "Autoteste de COVID-19 G-Tech",
    "descricao": "Autoteste de COVID-19 G-Tech: Teste rápido e confiável para detecção de COVID-19 no conforto da sua casa.",
    "preco": 12.5,
    "imagem": "assets/img/produtos/autoteste-covid-gtech.jpg",
    "categoria": "novidades",
    "tags": [
      "novo"
    ]
  },
  {
    "id": 4,
    "nome": "Bolsa Térmica Termogel",
    "descricao": "Bolsa Térmica Termogel: Alívio para dores, cólicas e lesões. Pode ser usada quente ou fria para terapia local.",
    "preco": 15.9,
    "imagem": "assets/img/produtos/bolsa-termica-termogel.jpg",
    "categoria": "novidades",
    "tags": []
  },
  {
    "id": 5,
    "nome": "Buscofem para Cólica Menstrual 10 Cápsulas",
    "descricao": "Buscofem para Cólica Menstrual 10 Cápsulas: Alívio rápido e focado para as dores e cólicas do período menstrual.",
    "preco": 22.9,
    "imagem": "assets/img/produtos/buscofem-colica-menstrual-10caps.jpg",
    "categoria": "saude-feminina",
    "tags": []
  },
  {
    "id": 6,
    "nome": "Creme Dental Colgate Sensitive 60g",
    "descricao": "Creme Dental Colgate Sensitive 60g: Proteção diária e alívio imediato para dentes sensíveis, garantindo um sorriso sem dor.",
    "preco": 8.5,
    "imagem": "assets/img/produtos/colgate-sensitive-60g.jpg",
    "categoria": "higiene-pessoal",
    "tags": []
  },
  {
    "id": 7,
    "nome": "Condicionador Infantil Granado 250ml",
    "descricao": "Condicionador Infantil Granado 250ml: Fórmula suave que desembaraça e hidrata os cabelos infantis, deixando-os macios e cheirosos.",
    "preco": 18.75,
    "imagem": "assets/img/produtos/cond-infantil-granado-250ml.jpg",
    "categoria": "mamae-bebe",
    "tags": []
  },
  {
    "id": 8,
    "nome": "Desodorante Monange Oliva 150ml",
    "descricao": "Desodorante Monange Oliva 150ml: Proteção antitranspirante por 48 horas com fórmula hidratante que cuida da pele.",
    "preco": 15.99,
    "imagem": "assets/img/produtos/des-monange-olivia-150ml.jpg",
    "categoria": "saude-feminina",
    "tags": []
  },
  {
    "id": 9,
    "nome": "Dipirona Genérica 500mg em Cartela",
    "descricao": "Dipirona Genérica 500mg em Cartela: Analgésico e antitérmico eficaz contra dores de cabeça, dores no corpo e febre.",
    "preco": 8.5,
    "imagem": "assets/img/produtos/dipirona-generica-cartela-500mg.jpg",
    "categoria": "genericos",
    "tags": []
  },
  {
    "id": 10,
    "nome": "Energrip Vitamina C 10 Comprimidos",
    "descricao": "Energrip Vitamina C 10 Comprimidos: Reforço diário para o sistema imunológico. Mais energia e proteção para o seu dia.",
    "preco": 55.9,
    "imagem": "assets/img/produtos/energrip-vitamina-c-10comp.jpg",
    "categoria": "vitaminas-suplementos",
    "tags": []
  },
  {
    "id": 11,
    "nome": "Esparadrapo Missner 10cm x 4,5m",
    "descricao": "Esparadrapo Missner 10cm x 4,5m: Alta aderência e resistência para a fixação segura de curativos e ataduras.",
    "preco": 21.99,
    "imagem": "assets/img/produtos/esparadrapo-missiner-10x4.jpg",
    "categoria": "primeiros-socorros",
    "tags": []
  },
  {
    "id": 12,
    "nome": "Esparadrapo Missner 5cm x 4,5m",
    "descricao": "Esparadrapo Missner 5cm x 4,5m: Fixação segura e flexível para curativos de diversos tamanhos. Essencial para primeiros socorros.",
    "preco": 15.75,
    "imagem": "assets/img/produtos/esparadrapo-missiner-5x4.jpg",
    "categoria": "primeiros-socorros",
    "tags": []
  },
  {
    "id": 13,
    "nome": "Enxaguante Bucal Listerine Cool Mint 500ml",
    "descricao": "Enxaguante Bucal Listerine Cool Mint 500ml: Hálito fresco e proteção intensa contra os germes que causam placa e gengivite.",
    "preco": 12.5,
    "imagem": "assets/img/produtos/ex-bucal-listerine-500ml-coolmint.jpg",
    "categoria": "higiene-pessoal",
    "tags": []
  },
  {
    "id": 14,
    "nome": "Fio Dental Hilo 100m",
    "descricao": "Fio Dental Hilo 100m: Remove placa e resíduos entre os dentes, essencial para uma higiene bucal completa.",
    "preco": 35.5,
    "imagem": "assets/img/produtos/fio-dental-hilo-100m.jpg",
    "categoria": "higiene-pessoal",
    "tags": []
  },
  {
    "id": 15,
    "nome": "Fita Microporosa Missner 5cm x 4,5m",
    "descricao": "Fita Microporosa Missner 5cm x 4,5m: Fita hipoalergênica para fixação de curativos em peles sensíveis. Permite que a pele respire.",
    "preco": 89.9,
    "imagem": "assets/img/produtos/fita-microporosa-missiner-5x4.jpg",
    "categoria": "primeiros-socorros",
    "tags": []
  },
  {
    "id": 16,
    "nome": "Ibuprofeno Genérico 20 Comprimidos",
    "descricao": "Ibuprofeno Genérico 20 Comprimidos: Ação anti-inflamatória e analgésica para o alívio de diversas dores e cólicas.",
    "preco": 75.0,
    "imagem": "assets/img/produtos/ibuprofeno-generico-20comp.jpg",
    "categoria": "genericos",
    "tags": []
  },
  {
    "id": 17,
    "nome": "Ibuprofeno Genérico em Gotas 20ml",
    "descricao": "Ibuprofeno Genérico em Gotas 20ml: Ação anti-inflamatória e analgésica em gotas, para dosagem flexível e fácil administração.",
    "preco": 68.9,
    "imagem": "assets/img/produtos/ibuprofeno-generico-gotas-20ml.jpg",
    "categoria": "genericos",
    "tags": []
  },
  {
    "id": 18,
    "nome": "Inalador e Nebulizador G-Tech",
    "descricao": "Inalador e Nebulizador G-Tech: Tratamento eficaz para doenças respiratórias. Transforma o medicamento em névoa para fácil inalação.",
    "preco": 6.9,
    "imagem": "assets/img/produtos/inalador-e-nebulizador-gtech.jpg",
    "categoria": "novidades",
    "tags": []
  },
  {
    "id": 19,
    "nome": "Lavitan Cabelos e Unhas 60 Cápsulas",
    "descricao": "Lavitan Cabelos e Unhas 60 Cápsulas: Suplemento com Biotina e Zinco que fortalece cabelos e unhas, promovendo mais vitalidade.",
    "preco": 11.8,
    "imagem": "assets/img/produtos/lavitan-cab-unh-60caps.jpg",
    "categoria": "vitaminas-suplementos",
    "tags": []
  },
  {
    "id": 20,
    "nome": "Lorasliv (Loratadina) 10mg",
    "descricao": "Lorasliv (Loratadina) 10mg: Alívio rápido dos sintomas de alergias respiratórias, como coriza e espirros, sem causar sono.",
    "preco": 18.5,
    "imagem": "assets/img/produtos/lorasliv-loratadina-10mg.jpg",
    "categoria": "mais-vendidos",
    "tags": []
  },
  {
    "id": 21,
    "nome": "Pomada Nistatina + Óxido de Zinco Genérica 60g",
    "descricao": "Pomada Nistatina + Óxido de Zinco Genérica 60g: Dupla ação que trata e previne assaduras, formando uma camada protetora na pele do bebê.",
    "preco": 29.9,
    "imagem": "assets/img/produtos/nistatina-ox-zinco-pomada-infantil-generico-60g.jpg",
    "categoria": "mamae-bebe",
    "tags": []
  },
  {
    "id": 22,
    "nome": "Protetor Solar Helioderm FPS 70 200ml",
    "descricao": "Protetor Solar Helioderm FPS 70 200ml: Altíssima proteção contra raios UVA/UVB com toque seco. Previne o envelhecimento da pele.",
    "preco": 45.9,
    "imagem": "assets/img/produtos/protetor-helioderm-70fps-200ml.jpg",
    "categoria": "promocao",
    "tags": []
  },
  {
    "id": 23,
    "nome": "Sabonete Infantil Granado Glicerina 90g",
    "descricao": "Sabonete Infantil Granado Glicerina 90g: Limpeza suave para a pele delicada do bebê, formulado com glicerina vegetal.",
    "preco": 19.99,
    "imagem": "assets/img/produtos/sab-granado-infantil-90g.jpg",
    "categoria": "mamae-bebe",
    "tags": []
  },
  {
    "id": 24,
    "nome": "Sabonete Íntimo Feminino Dermacyd 200ml",
    "descricao": "Sabonete Íntimo Feminino Dermacyd 200ml: Mantém o pH da região íntima equilibrado, proporcionando 24 horas de frescor e proteção.",
    "preco": 14.5,
    "imagem": "assets/img/produtos/sab-intimo-fem-dermacyd-200ml.jpg",
    "categoria": "mamae-bebe",
    "tags": []
  },
  {
    "id": 25,
    "nome": "Sabonete Líquido Infantil Granado Glicerina 250ml",
    "descricao": "Sabonete Líquido Infantil Granado Glicerina 250ml: Limpeza suave da cabeça aos pés para a pele sensível do bebê. Não arde os olhos.",
    "preco": 9.9,
    "imagem": "assets/img/produtos/sab-liq-infantil-granado-250ml.jpg",
    "categoria": "mamae-bebe",
    "tags": []
  },
  {
    "id": 26,
    "nome": "Shampoo Anticaspa Clear 200ml",
    "descricao": "Shampoo Anticaspa Clear 200ml: Controle eficaz da caspa e alívio da coceira, para um couro cabeludo saudável e renovado.",
    "preco": 11.2,
    "imagem": "assets/img/produtos/shamp-anticaspa-clear-200ml.jpg",
    "categoria": "higiene-pessoal",
    "tags": []
  },
  {
    "id": 27,
    "nome": "Tadalafila Genérico 20mg",
    "descricao": "Tadalafila Genérico 20mg: Medicamento indicado para o tratamento da disfunção erétil, para mais confiança e desempenho.",
    "preco": 25.0,
    "imagem": "assets/img/produtos/tadalafila-generico-20mg.jpg",
    "categoria": "genericos",
    "tags": []
  },
  {
    "id": 28,
    "nome": "Tadalafila Genérico 5mg",
    "descricao": "Tadalafila Genérico 5mg: Indicado para o tratamento diário da disfunção erétil, permitindo mais espontaneidade.",
    "preco": 7.8,
    "imagem": "assets/img/produtos/tadalafila-generico-5mg.jpg",
    "categoria": "genericos",
    "tags": []
  },
  {
    "id": 29,
    "nome": "Termômetro Digital Techline",
    "descricao": "Termômetro Digital Techline: Medição de temperatura rápida, precisa e segura, com alerta sonoro e memória da última medição.",
    "preco": 16.9,
    "imagem": "assets/img/produtos/termometro-digital-techline.jpg",
    "categoria": "novidades",
    "tags": []
  },
  {
    "id": 30,
    "nome": "Teste de Gravidez Verifik",
    "descricao": "Teste de Gravidez Verifik: Teste rápido e prático com 99% de precisão para um resultado claro em poucos minutos.",
    "preco": 9.9,
    "imagem": "assets/img/produtos/teste-gravidez-verifik.jpg",
    "categoria": "promocao",
    "tags": []
  },
  {
    "id": 31,
    "nome": "Toalhas Umedecidas Bebê Limpinho 90 Unidades",
    "descricao": "Toalhas Umedecidas Bebê Limpinho 90 Unidades: Limpeza suave e eficaz para a pele delicada do bebê a cada troca de fralda.",
    "preco": 29.8,
    "imagem": "assets/img/produtos/toalha-umedecidas-bebe-limpinho-90unid.jpg",
    "categoria": "promocao",
    "tags": []
  },
  {
    "id": 32,
    "nome": "Umidificador de Ar G-Tech 3L",
    "descricao": "Umidificador de Ar G-Tech 3L: Melhora a qualidade do ar, aliviando o desconforto do tempo seco e problemas respiratórios.",
    "preco": 199.8,
    "imagem": "assets/img/produtos/umidificador-gtech-3l.jpg",
    "categoria": "novidades",
    "tags": []
  },
  {
    "id": 33,
    "nome": "Vitamina C Lavitan Mastigável 60 Comprimidos",
    "descricao": "Vitamina C Lavitan Mastigável 60 Comprimidos: Reforce sua imunidade de forma prática e saborosa com comprimidos mastigáveis.",
    "preco": 20.0,
    "imagem": "assets/img/produtos/vitamina-c-lavitan-mastigavel-60comp.jpg",
    "categoria": "vitaminas-suplementos",
    "tags": []
  }
];