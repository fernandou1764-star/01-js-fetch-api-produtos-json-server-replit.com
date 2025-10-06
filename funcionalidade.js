document.addEventListener('DOMContentLoaded', () => {
    const replit = 'https://6a0f147d-da74-4ae1-b8ca-7a7828542734-00-h6nwxazwm4tw.worf.replit.dev/'; // URL do projeto no Replit.com.
    const url = replit + "produtos";

    const formularioDeProduto = document.getElementById('formulario-de-produto');
    const campoIdDoProduto = document.getElementById('produto-id');
    const botaoEnviar = document.getElementById('botao-enviar');
    const listaDeProdutos = document.getElementById('lista-de-produtos');

    let produtos = [];

    //GET:
    const buscarProdutos = async () => {
        await fetch(url)
            .then(response => response.json())
            .then(json => {
                produtos = json;
                apresentarTabela();
            })
            .catch(error => {
                console.error(error);
                listaDeProdutos.innerHTML = `<tr><td colspan="4">Erro ao carregar produtos.</td></tr>`;
            })
    };

    //POST:
    const enviarProduto = async (produto) => {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(produto)
        })
            .then(response => response.json())
            .then(() => buscarProdutos())
            .catch(() => alert("Erro ao enviar produto!"));
    };

    //UPDATE:
    const atualizarProduto = async (id, produto) => {
        await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ id, ...produto })
        })
            .then(response => response.json())
            .then(() => buscarProdutos())
            .catch(() => alert("Erro ao atualizar produto!"));
    };

    //DELETE    :
    const excluirProduto = async (id) => {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => buscarProdutos())
            .catch(() => alert("Erro ao excluir produto!"));
    };

    const apresentarTabela = () => {
        listaDeProdutos.innerHTML = '';

        if (produtos.length === 0) {
            listaDeProdutos.innerHTML = '<tr><td colspan="4">Nenhum produto cadastrado.</td></tr>';
            return;
        }

        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
              <td>${produto.nome}</td>
              <td>${produto.quantidade}</td>
              <td>${formatarMoeda(produto.preco)}</td>
              <td>
                <button class="botao-editar" data-id="${produto.id}">✏️ Editar</button>
                <button class="botao-excluir" data-id="${produto.id}">🗑️ Excluir</button>
              </td>`;
            listaDeProdutos.appendChild(linha);
        });
    };

    const formatarMoeda = valor => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    formularioDeProduto.addEventListener('submit', async event => {
        event.preventDefault();

        const id = campoIdDoProduto.value;
        const nome = document.getElementById('nome').value;
        const quantidade = parseInt(document.getElementById('quantidade').value);
        const preco = parseFloat(document.getElementById('preco').value);

        const produto = { nome, quantidade, preco };

        if (id)
            atualizarProduto(id, produto);
        else
            enviarProduto(produto);

        limparFormulario();
        buscarProdutos();
    });

    listaDeProdutos.addEventListener('click', async event => {
        const alvo = event.target;
        const id = alvo.dataset.id;

        if (alvo.classList.contains('botao-editar')) {
            const produto = produtos.find(p => p.id === id);

            if (produto) {
                campoIdDoProduto.value = produto.id;
                document.getElementById('nome').value = produto.nome;
                document.getElementById('quantidade').value = produto.quantidade;
                document.getElementById('preco').value = produto.preco;
                botaoEnviar.textContent = 'Atualizar Produto';
                window.scrollTo(0, 0);
            }
        } else if (alvo.classList.contains('botao-excluir')) {
            if (confirm('Tem certeza que deseja excluir este produto?')) {
                excluirProduto(id);
                buscarProdutos();
            }
        }
    });

    const limparFormulario = () => {
        formularioDeProduto.reset();
        campoIdDoProduto.value = '';
        botaoEnviar.textContent = 'Adicionar Produto';
    };

    buscarProdutos();
});