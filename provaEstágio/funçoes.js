const valorProdutoInput = document.getElementById('valorProduto');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const produtosList = document.getElementById('produtosList');
    const cadastroForm = document.getElementById('cadastroForm');

    // Função para formatar o valor do produto como moeda ao digitar
    valorProdutoInput.addEventListener('input', function(e) {
        // Remove tudo que não é número
        let valor = e.target.value.replace(/\D/g, '');
        // Formata o valor como moeda
        valor = (Number(valor) / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        // Atualiza o valor no campo de entrada
        e.target.value = valor;
    });

    // Função para cadastrar um novo produto
    cadastroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nomeProduto = document.getElementById('nomeProduto').value;
        const valorProduto = document.getElementById('valorProduto').value;

        // Adiciona o novo produto à lista
        const novoProduto = document.createElement('li');
        novoProduto.textContent = `${nomeProduto} - ${valorProduto}`;
        produtosList.appendChild(novoProduto);

        // Ordena os produtos pelo valor do menor para o maior
        ordenarProdutos();

        // Limpa o formulário
        cadastroForm.reset();

        // Rola a página para a lista de produtos
        document.getElementById('listaProdutos').scrollIntoView();
    });

    // Ordena os produtos pelo valor do menor para o maior
    function ordenarProdutos() {
        const produtos = [...produtosList.children];
        produtos.sort((a, b) => {
            const valorA = extrairValorProduto(a.textContent);
            const valorB = extrairValorProduto(b.textContent);
            return valorA - valorB; // Ordem crescente
        });
        produtos.forEach(produto => produtosList.appendChild(produto));
    }

    // Função auxiliar para extrair o valor do produto
    function extrairValorProduto(textoProduto) {
        const regexValor = /\d+,\d{2}/;
        const match = textoProduto.match(regexValor);
        if (match) {
            return parseFloat(match[0].replace(',', '.'));
        }
        return NaN;
    }

    // Adiciona um ouvinte de evento ao botão Cadastrar Novo Produto
    btnCadastrar.addEventListener('click', () => {
        document.getElementById('formularioContainer').scrollIntoView();
    });