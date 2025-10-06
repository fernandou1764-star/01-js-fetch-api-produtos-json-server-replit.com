document.addEventListener('DOMContentLoaded', () => {
    const replit = 'https://9de06e98-817d-455b-bdd2-c7b96eaf32a9-00-b2r6bwmmdprw.riker.replit.dev/'; // URL do projeto no Replit.com.
    const url = replit + "imoveis";

    const formularioDeImovel = document.getElementById('formulario-de-imovel');
    const campoIdDoImovel = document.getElementById('imovel-id');
    const botaoEnviar = document.getElementById('botao-enviar');
    const listaDeImoveis = document.getElementById('lista-de-imoveis');

    let imoveis = [];

    //GET:
    const buscarImoveis = async () => {
        await fetch(url)
            .then(response => response.json())
            .then(json => {
                imoveis = json;
                apresentarTabela();
            })
            .catch(error => {
                console.error(error);
                listaDeImoveis.innerHTML = `<tr><td colspan="4">Erro ao carregar imoveis.</td></tr>`;
            })
    };

    //POST:
    const enviarImovel = async (imovel) => {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(imovel)
        })
            .then(response => response.json())
            .then(() => buscarImoveis())
            .catch(() => alert("Erro ao enviar imóvel!"));
    };

    //UPDATE:
    const atualizarImovel = async (id, imovel) => {
        await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(imovel)
        })
            .then(response => response.json())
            .then(() => buscarImoveis())
            .catch(() => alert("Erro ao atualizar imovel!"));
    };

    //DELETE    :
    const excluirImovel = async (id) => {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => buscarImoveis())
            .catch(() => alert("Erro ao excluir imóvel!"));
    };

    const apresentarTabela = () => {
        listaDeImoveis.innerHTML = '';

        if (imoveis.length === 0) {
            listaDeImoveis.innerHTML = '<tr><td colspan="4">Nenhum imóvel cadastrado.</td></tr>';
            return;
        }

        imoveis.forEach(imovel => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
              <td>${imovel.tipo}</td>
              <td>${imovel.categoria}</td>
              <td>${formatarMoeda(imovel.valor_aluguel)}</td>
              <td>
                <button class="botao-de-acao botao-editar" data-id="${imovel.id}">✏️ Editar</button>
                <button class="botao-de-acao botao-excluir" data-id="${imovel.id}">🗑️ Excluir</button>
              </td>`;
            listaDeImoveis.appendChild(linha);
        });
    };

    const formatarMoeda = valor => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    formularioDeImovel.addEventListener('submit', async event => {
        event.preventDefault();

        const id = campoIdDoImovel.value;
        const tipo = document.getElementById('tipo').value;
        const categoria = document.getElementById('categoria').value;
        const valor_aluguel = parseFloat(document.getElementById('valor_aluguel').value);

        const imovel = { tipo, categoria, valor_aluguel };

        if (id)
            atualizarImovel(id, imovel);
        else
            enviarImovel(imovel);

        limparFormulario();
        buscarImoveis();
    });

    listaDeImoveis.addEventListener('click', async event => {
        const alvo = event.target;
        const id = alvo.dataset.id;

        if (alvo.classList.contains('botao-editar')) {
            const imovel = imoveis.find(p => p.id === id);

            if (imovel) {
                campoIdDoImovel.value = imovel.id;
                document.getElementById('tipo').value = imovel.tipo;
                document.getElementById('categoria').value = imovel.categoria;
                document.getElementById('valor-aluguel').value = imovel.valor_aluguel;
                botaoEnviar.textContent = 'Atualizar Imóvel';
                window.scrollTo(0, 0);
            }
        } else if (alvo.classList.contains('botao-excluir')) {
            if (confirm('Tem certeza que deseja excluir este imóvel?')) {
                excluirImovel(id);
                buscarImoveis();
            }
        }
    });

    const limparFormulario = () => {
        formularioDeImovel.reset();
        campoIdDoImovel.value = '';
        botaoEnviar.textContent = 'Adicionar Imóvel';
    };

    buscarImoveis();
});

  /*
      OBS:
      O atributo data-* é uma convenção oficial do HTML5 que permite aos desenvolvedores 
      criar atributos personalizados e seguros para armazenar dados em elementos HTML.
      
      A sintaxe é sempre "data-nome", onde "nome" pode ser qualquer identificador válido.
    
      Os valores retornados por dataset são sempre strings. Use parseInt() ou parseFloat() 
      para convertê-los para os correspondentes numéricos.

      Exemplo válido:
      <button id="editar" data-id="123" data-nome="teclado" data-preco="199.99">Editar</button>
    
      No JavaScript, o acesso a esses atributos é realizado da seguinte forma:
      
      const elemento = document.getElementById("editar");
      const id = parseInt(elemento.dataset.id);         // "123"
      const nome = elemento.dataset.nome;               // "teclado"
      const preco = parseFloat(elemento.dataset.preco); // "199.99"
  */