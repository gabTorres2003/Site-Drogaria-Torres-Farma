import csv
import json

def converter_csv_para_js(arquivo_csv='produtos.CSV', arquivo_js='produtos.js'):
    """
    Lê um arquivo CSV de produtos, processa apenas as colunas desejadas,
    converte os dados para o formato correto e gera um arquivo JavaScript.
    """
    lista_de_produtos = []
    colunas_desejadas = ['id', 'nome', 'descricao', 'preco', 'imagem', 'categoria', 'tags']

    print(f"Iniciando a leitura do arquivo '{arquivo_csv}'...")

    try:
        # --- ALTERAÇÃO PRINCIPAL AQUI ---
        # Alterado o encoding de 'utf-8' para 'latin-1' para ler corretamente
        # arquivos salvos pelo Excel no Windows.
        with open(arquivo_csv, mode='r', encoding='latin-1') as f:
            leitor_csv = csv.DictReader(f, delimiter=';')

            for linha in leitor_csv:
                try:
                    produto_formatado = {key: linha.get(key, '') for key in colunas_desejadas}

                    produto_formatado['id'] = int(produto_formatado.get('id', '0'))

                    preco_str = produto_formatado.get('preco', '0').replace(',', '.')
                    produto_formatado['preco'] = float(preco_str)

                    tags_str = produto_formatado.get('tags', '')
                    if tags_str:
                        produto_formatado['tags'] = [tag.strip() for tag in tags_str.split(',')]
                    else:
                        produto_formatado['tags'] = []

                    lista_de_produtos.append(produto_formatado)

                except (ValueError, KeyError) as e:
                    print(f"AVISO: Pulando linha por erro de formatação ou dado ausente: {linha}. Erro: {e}")

        if not lista_de_produtos:
            print("AVISO: Nenhum produto foi encontrado ou lido do arquivo CSV.")
            return

        json_produtos = json.dumps(lista_de_produtos, indent=2, ensure_ascii=False)
        conteudo_js = f"const produtos = {json_produtos};"

        # Ao salvar o arquivo .js, mantemos o utf-8 que é o padrão da web
        with open(arquivo_js, 'w', encoding='utf-8') as f:
            f.write(conteudo_js)

        print(f"\nSUCESSO! O arquivo '{arquivo_js}' foi gerado com {len(lista_de_produtos)} produtos, ignorando colunas extras.")

    except FileNotFoundError:
        print(f"\nERRO: O arquivo '{arquivo_csv}' não foi encontrado.")
        print("Por favor, certifique-se de que o arquivo CSV está na mesma pasta que este script.")
    except Exception as e:
        print(f"\nERRO: Ocorreu um erro inesperado durante a execução: {e}")


# --- Inicia a execução do conversor ---
if __name__ == "__main__":
    converter_csv_para_js()