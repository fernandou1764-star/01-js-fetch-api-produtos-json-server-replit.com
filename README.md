# js-fetch-api-produtos-json-server-replit.com
* No [Replit.com](https://replit.com/), criar um projeto `Node.js`. OBS: Clicar na opção "Developer Framewoks" do menu lateral esquerdo. Em seguida, clicar no botão "+ Create".

* No projeto `Node.js`, criar uma pasta `bd/`.

* Na pasta `bd/`, criar o arquivo `bd.json` com o conteúdo abaixo:
```json
{
    "produtos": [
        {
            "id": 1,
            "nome": "Notebook Gamer XYZ",
            "quantidade": 15,
            "preco": 7599.90
        },
        {
            "id": 2,
            "nome": "Mouse sem Fio Logitech",
            "quantidade": 80,
            "preco": 199.50
        },
        {
            "id": 3,
            "nome": "Monitor Ultrawide 29\"",
            "quantidade": 35,
            "preco": 1450.00
        }
    ]
}
```

* No terminal do projeto, executar os comandos abaixo:

```bash
npm install -g json-server
```

```bash
json-server --watch bd/bd.json --port 3030
```

OBS:

O atributo data-* é uma convenção oficial do HTML5 que permite aos desenvolvedores 
criar atributos personalizados e seguros para armazenar dados em elementos HTML.
      
A sintaxe é sempre "data-nome", onde "nome" pode ser qualquer identificador válido.

Os valores retornados por dataset são sempre strings. Use parseInt() ou parseFloat() para convertê-los para os correspondentes numéricos.

Exemplo válido:
```html
<button id="editar" data-id="123" data-nome="teclado" data-preco="199.99">Editar</button>
```
No JavaScript, o acesso a esses atributos é realizado da seguinte forma:

```JS
const elemento = document.getElementById("editar");
const id = parseInt(elemento.dataset.id);         // "123"
const nome = elemento.dataset.nome;               // "teclado"
const preco = parseFloat(elemento.dataset.preco); // "199.99"
```