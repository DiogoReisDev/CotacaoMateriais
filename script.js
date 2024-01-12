var subcategorias = {
    cabeceiras: {
        retas: ["Solteiro", "Casal", "Queen", "King"],
        painel: ["Solteiro", "Casal", "Queen", "King"]
    },
    base: {
        base_box: ["Solteiro", "Casal", "Queen", "King"],
        base_bau: ["Solteiro", "Casal", "Queen", "King"]
    },
    colchoes: {
        colchao_smart: ["Solteiro", "Casal", "Queen", "King"],
        colchao_comfort: ["Solteiro", "Casal", "Queen", "King"],
        colchao_deluxe: ["Solteiro", "Casal", "Queen", "King"]
    }
}
function showSubcategorias() {
    var categoriaSelecionada = document.getElementById("categoria").value;
    // Obter a div de subcategorias
    var subcategoriasContainer = document.getElementById("subcategoriasContainer");
    var subcategoriasAdicionaisContainer = document.getElementById("subcategoriasAdicionaisContainer");
    // Limpar qualquer conteúdo anterior
    subcategoriasContainer.innerHTML = "";
    subcategoriasAdicionaisContainer.innerHTML = "";
    // Adiciona a caixa de quantidade
    var quantidadeContainer = document.getElementById("quantidadeContainer");
    // Verificar se a categoria selecionada existe nas subcategorias
    if (subcategorias[categoriaSelecionada]) {
        // Adicionar a lógica aqui para criar os elementos conforme as subcategorias
        createDropdown(subcategoriasContainer, "Escolha a subcategoria de " + categoriaSelecionada + ":", "subcategoria" + categoriaSelecionada, Object.keys(subcategorias[categoriaSelecionada]));
        // Adicionar a segunda subcategoria
        createDropdown(subcategoriasAdicionaisContainer, "Escolha a segunda subcategoria de " + categoriaSelecionada + ":", "subcategoriaAdicional" + categoriaSelecionada, ["Solteiro", "Casal", "Queen", "King"]);
        // Adiciona a caixa de quantidade
        quantidadeContainer.style.display = 'none';  // Inicia oculta
    } else {
        console.error("Categoria não encontrada ou subcategorias não é um array:", categoriaSelecionada);
    }
    // Adiciona um event listener para monitorar alterações na segunda subcategoria
    document.getElementById("subcategoriaAdicional" + categoriaSelecionada).addEventListener("change", function () {
        if (this.value) {
            quantidadeContainer.style.display = 'block';
        } else {
            quantidadeContainer.style.display = 'none';
        }
    });
}
function createDropdown(container, label, id, options, defaultOption) {
    // Cria o rótulo
    var dropdownLabel = document.createElement("label");
    dropdownLabel.textContent = label;
    // Cria o dropdown
    var dropdown = document.createElement("select");
    dropdown.className = "form-control";
    dropdown.id = id;
    // Adiciona a opção padrão ao dropdown
    var defaultOptionElement = document.createElement("option");
    defaultOptionElement.value = "";
    defaultOptionElement.text = defaultOption || "Selecione";
    dropdown.appendChild(defaultOptionElement);
    // Adiciona as opções ao dropdown
    if (options) {
        if (Array.isArray(options)) {
            options.forEach(function (option) {
                var optionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.text = option;
                dropdown.appendChild(optionElement);
            });
        } else if (typeof options === 'object') {
            // Modificado para acessar apenas as chaves (modelos)
            Object.keys(options).forEach(function (key) {
                var optionElement = document.createElement("option");
                optionElement.value = key; // Alterado para key em vez de options[key]
                optionElement.text = key;
                dropdown.appendChild(optionElement);
            });
        } else {
            console.error("As opções não são nem um array nem um objeto:", options);
        }
    }
    // Adiciona o rótulo e o dropdown ao contêiner
    container.appendChild(dropdownLabel);
    container.appendChild(dropdown);
}
function preencherFormulario() {
    var categoriaSelecionada = document.getElementById("categoria").value;
    var subcategoriaSelecionadaElement = document.getElementById("subcategoria" + categoriaSelecionada);
    var subcategoriaAdicionalSelecionadaElement = document.getElementById("subcategoriaAdicional" + categoriaSelecionada);
    // Certifique-se de que os elementos das subcategorias foram encontrados
    if (subcategoriaSelecionadaElement && subcategoriaAdicionalSelecionadaElement) {
        var subcategoriaSelecionada = subcategoriaSelecionadaElement.value;
        var subcategoriaAdicionalSelecionada = subcategoriaAdicionalSelecionadaElement.value;
        var quantidadeElement = document.getElementById("quantidade");
        // Certifique-se de que o elemento da quantidade foi encontrado
        if (quantidadeElement) {
            var quantidade = quantidadeElement.value;
            if (categoriaSelecionada && subcategoriaSelecionada && subcategoriaAdicionalSelecionada && quantidade) {
                // Adicionar a linha na tabela
                var tabelaItens = document.getElementById("tabelaItensBody");  // Use "tabelaItensBody" em vez de "tabelaItens"
                var novaLinha = tabelaItens.insertRow();
                var celulaItem = novaLinha.insertCell(0);
                var celulaQuantidade = novaLinha.insertCell(1);
                celulaItem.innerHTML = categoriaSelecionada + " - " + subcategoriaSelecionada + " - " + subcategoriaAdicionalSelecionada;
                celulaQuantidade.innerHTML = quantidade;
                // Limpar os campos do formulário após adicionar à tabela
                document.getElementById("categoria").value = "";
                document.getElementById("subcategoriasContainer").innerHTML = "";
                document.getElementById("subcategoriasAdicionaisContainer").innerHTML = "";
                document.getElementById("quantidade").value = "";
                // Ocultar a caixa de quantidade após adicionar à tabela
                document.getElementById("quantidadeContainer").style.display = 'none';
            } else {
                alert("Preencha todos os campos antes de adicionar à tabela.");
            }
        } else {
            console.error("Elemento da quantidade não encontrado.");
        }
    } else {
        console.error("Elementos das subcategorias não encontrados.");
    }
}
function calcularOrcamento() {
    // Obter a tabela de itens
    var tabelaItens = document.getElementById("tabelaItens");
    // Obter a tabela de orçamento
    var tabelaOrcamento = document.getElementById("tabelaOrcamento");
    var tabelaOrcamentoBody = document.getElementById("tabelaOrcamentoBody");
    // Limpar a tabela de orçamento antes de adicionar novos dados
    tabelaOrcamentoBody.innerHTML = "";
    // Mapear os materiais para a categoria Cabeceiras - Modelo Painel
    var materiaisCabeceirasPainel = {
        "Solteiro": {
            "Ripa 1x2": { quantidade: 2, custoUnitario: 3.4 },
            "Grampo 14/35 Estrutura": { quantidade: 1, custoUnitario: 2.0 },
            // Adicionar outros materiais aqui
        },
        "Casal": {
            "Ripa 1x2": { quantidade: 3, custoUnitario: 3.4 },
            "Grampo 14/35 Estrutura": { quantidade: 2, custoUnitario: 2.0 },
            // Adicionar outros materiais aqui
        },
        // Adicionar objetos semelhantes para outros tamanhos
    };
    // Inicializar o custo total geral
    var custoTotalGeral = 0;
    // Iterar sobre as linhas da tabela de itens
    for (var i = 1; i < tabelaItens.rows.length; i++) {
        var categoriaModelo = tabelaItens.rows[i].cells[0].innerText.split(" - ");
        var categoria = categoriaModelo[0];
        var modelo = categoriaModelo[1];
        var submodelo = categoriaModelo[2];
        var quantidade = parseInt(tabelaItens.rows[i].cells[1].innerText);
        // Calcular o custo total com base na quantidade e nos custos unitários dos materiais
        var custoTotalItem = 0;
        var materiais;
        // Verificar a categoria e o modelo
        if (categoria === "Cabeceiras" && modelo === "Painel") {
            materiais = materiaisCabeceirasPainel[submodelo];
        }
        // Adicionar lógica para as demais categorias e modelos
        // Calcular o custo total para o item atual
        for (var material in materiais) {
            if (materiais.hasOwnProperty(material)) {
                var custoMaterial = quantidade * materiais[material].quantidade * materiais[material].custoUnitario;
                custoTotalItem += custoMaterial;
                // Adicionar uma linha à tabela de orçamento com os resultados
                var novaLinha = tabelaOrcamentoBody.insertRow();
                var celulaMaterial = novaLinha.insertCell(0);
                var celulaQuantidadeTotal = novaLinha.insertCell(1);
                var celulaCustoTotal = novaLinha.insertCell(2);
                celulaMaterial.innerHTML = material;
                celulaQuantidadeTotal.innerHTML = quantidade * materiais[material].quantidade;
                celulaCustoTotal.innerHTML = "R$ " + custoMaterial.toFixed(2);
            }
        }
        // Adicionar o custo total do item ao custo total geral
        custoTotalGeral += custoTotalItem;
    }
    // Adicionar uma linha à tabela de orçamento com o custo total geral
    var linhaCustoTotalGeral = tabelaOrcamentoBody.insertRow();
    var celulaCustoTotalGeral = linhaCustoTotalGeral.insertCell(0);
    celulaCustoTotalGeral.colSpan = 3;
    celulaCustoTotalGeral.innerHTML = "<strong>Custo Total Geral: R$ " + custoTotalGeral.toFixed(2) + "</strong>";
    // Exibir a tabela de orçamento
    tabelaOrcamento.style.display = "table";
    
}function calcularOrcamento() {
    // Obter a tabela de itens
    var tabelaItens = document.getElementById("tabelaItens");
    // Obter a tabela de orçamento
    var tabelaOrcamento = document.getElementById("tabelaOrcamento");
    var tabelaOrcamentoBody = document.getElementById("tabelaOrcamentoBody");
    // Limpar a tabela de orçamento antes de adicionar novos dados
    tabelaOrcamentoBody.innerHTML = "";
    // Iterar sobre as linhas da tabela de itens
    for (var i = 1; i < tabelaItens.rows.length; i++) {
        var item = tabelaItens.rows[i].cells[0].innerText;
        var quantidade = parseInt(tabelaItens.rows[i].cells[1].innerText);
        // Implementar lógica para calcular custos com base no item selecionado
        // Adicionar uma linha à tabela de orçamento com os resultados
        var novaLinha = tabelaOrcamentoBody.insertRow();
        var celulaMaterial = novaLinha.insertCell(0);
        var celulaQuantidadeTotal = novaLinha.insertCell(1);
        var celulaCustoTotal = novaLinha.insertCell(2);
        celulaMaterial.innerHTML = item;  // Substituir com o nome do material
        celulaQuantidadeTotal.innerHTML = quantidade;  // Substituir com a quantidade total calculada
        celulaCustoTotal.innerHTML = "R$ XX,XX";  // Substituir com o custo total calculado
    }
    // Exibir a tabela de orçamento
    tabelaOrcamento.style.display = "table";
}
