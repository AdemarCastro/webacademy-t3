"use strict";
class TV {
    constructor(modelo, resolucao, tamanhoPolegadas, fabricante, valor) {
        this.modelo = modelo;
        this.resolucao = resolucao;
        this.tamanhoPolegadas = tamanhoPolegadas;
        this.fabricante = fabricante;
        this.valor = valor;
    }
}
class Celular {
    constructor(modelo, memoria, fabricante, valor) {
        this.modelo = modelo;
        this.memoria = memoria;
        this.fabricante = fabricante;
        this.valor = valor;
    }
}
class Bicicleta {
    constructor(modelo, tamanhoAro, fabricante, valor) {
        this.modelo = modelo;
        this.tamanhoAro = tamanhoAro;
        this.fabricante = fabricante;
        this.valor = valor;
    }
}
class Carrinho {
    constructor() {
        this.produtos = [];
    }
    adicionarProduto(produto) {
        if (produto) {
            this.produtos.push(produto);
        }
        else {
            console.error("Produto inserido é null.");
        }
    }
    calcularTotal() {
        return this.produtos.reduce((total, produto) => total + produto.valor, 0);
    }
}
// Instância do carrinho
const carrinho = new Carrinho();
/********************************************* VARIÁVEIS e TIPOS *********************************************/
// Instância da turma
const produtoList = document.getElementById('produto-list');
const addProdutoForm = document.getElementById('addProdutoForm');
const newProdutoButton = document.getElementById('newProdutoButton');
const produtoTipoSelect = document.getElementById('produtoTipo');
const camposTv = document.getElementById('camposTv');
const camposCelular = document.getElementById('camposCelular');
const camposBicicleta = document.getElementById('camposBicicleta');
const produtoTipo = document.getElementById('produtoTipo');
const modeloInput = document.getElementById('produtoModelo');
const fabricanteInput = document.getElementById('produtoFabricante');
const valorInput = document.getElementById('produtoValor');
const resolucaoInput = document.getElementById('tvResolucao');
const tamanhoPolegadasInput = document.getElementById('tvTamanhoPolegadas');
const memoriaInput = document.getElementById('celularMemoria');
const tamanhoAroInput = document.getElementById('bicicletaTamanhoAro');
const progressBars = document.querySelectorAll('.progress-bar');
// const mediaBar = document.getElementById('mediaBar') as
const modalElement = document.getElementById('modalNovoAluno');
const modal = modalElement && new bootstrap.Modal(modalElement); // Verifica se o modalElement é null antes de passá-lo ao construtor
const addProdutoButton = document.getElementById('addProdutoButton');
const saveEditProdutoButton = document.getElementById('saveEditProdutoButton');
// Variável global de edição do Aluno
let currentEditingProduto;
/********************************************* FUNÇÕES *********************************************/
// Função para renderizar a lista de produtos
function renderProdutoList(produtos) {
    const produtoListElement = document.getElementById('produto-list');
    if (produtoListElement) {
        // Limpar a lista antes de renderizar novamente
        produtoListElement.innerHTML = '';
        produtos.forEach((produto, index) => {
            const listItem = document.createElement('tr');
            let detalhesProduto = '';
            if (produto instanceof TV) {
                detalhesProduto = `Resolução: ${produto.resolucao}, Tamanho: ${produto.tamanhoPolegadas}"`;
            }
            else if (produto instanceof Celular) {
                detalhesProduto = `Memória: ${produto.memoria}`;
            }
            else if (produto instanceof Bicicleta) {
                detalhesProduto = `Tamanho Aro: ${produto.tamanhoAro}"`;
            }
            listItem.innerHTML = `
                <td>${produto.modelo}</td>
                <td>${produto.fabricante}</td>
                <td>${produto.valor}</td>
                <td>${detalhesProduto}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-editar" data-index="${index}" data-bs-toggle="modal" data-bs-target="#modalEditarProduto">Editar</button>
                    <button type="button" class="btn btn-danger btn-excluir" data-index="${index}">Excluir</button>
                </td>
            `;
            if (produtoListElement)
                produtoListElement.appendChild(listItem);
        });
    }
    else {
        console.error("O elemento produto-list não foi encontrado.");
    }
}
// Função para limpar os campos do formulário de aluno
function clearFormFields() {
    if (modeloInput && fabricanteInput && valorInput && resolucaoInput && tamanhoPolegadasInput && memoriaInput && tamanhoAroInput) {
        modeloInput.value = '';
        fabricanteInput.value = '';
        valorInput.value = '';
        resolucaoInput.value = '';
        tamanhoPolegadasInput.value = '';
        memoriaInput.value = '';
        tamanhoAroInput.value = '';
    }
    else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }
}
// Função para adicionar um produto
function addProdutoHandler(event) {
    event.preventDefault(); // Evitar o comportamento padrão do formulário
    if (produtoTipo && modeloInput && fabricanteInput && valorInput) {
        const tipo = produtoTipo.value;
        const modelo = modeloInput.value;
        const fabricante = fabricanteInput.value;
        const valor = parseFloat(valorInput.value);
        let novoProduto = null;
        switch (tipo) {
            case 'tv':
                const resolucaoInput = document.getElementById('tvResolucao');
                const tamanhoPolegadasInput = document.getElementById('tvTamanhoPolegadas');
                if (resolucaoInput && tamanhoPolegadasInput) {
                    const resolucao = resolucaoInput.value;
                    const tamanhoPolegadas = tamanhoPolegadasInput.value;
                    novoProduto = new TV(modelo, resolucao, tamanhoPolegadas, fabricante, valor);
                }
                else {
                    console.error("Um ou mais campos de entrada não foram encontrados.");
                }
                break;
            case 'celular':
                const memoriaInput = document.getElementById('celularMemoria');
                if (memoriaInput) {
                    const memoria = memoriaInput.value;
                    novoProduto = new Celular(modelo, memoria, fabricante, valor);
                }
                else {
                    console.error("Um ou mais campos de entrada não foram encontrados.");
                }
                break;
            case 'bicicleta':
                const tamanhoAroInput = document.getElementById('bicicletaTamanhoAro');
                if (tamanhoAroInput) {
                    const tamanhoAro = tamanhoAroInput.value;
                    novoProduto = new Bicicleta(modelo, tamanhoAro, fabricante, valor);
                }
                else {
                    console.error("Um ou mais campos de entrada não foram encontrados.");
                }
                break;
            default:
                console.error("Tipo de produto não reconhecido.");
        }
        // Adicionar o novo produto ao carrinho
        carrinho.adicionarProduto(novoProduto);
        // Fecha o modal do bootstrap
        modal === null || modal === void 0 ? void 0 : modal.hide();
        // Limpar os campos do formulário
        clearFormFields();
        // Renderizar novamente a lista após a adição do aluno
        renderProdutoList(carrinho.produtos);
        // Recalcular e atualizar o total do carrinho
        updateTotal();
    }
    else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }
}
// Função para salvar produto editado
function saveEditedProduto(produto, modelo, fabricante, valor) {
    let editedProduto;
    if (produto instanceof TV) {
        if (resolucaoInput && tamanhoPolegadasInput) {
            const resolucao = resolucaoInput.value;
            const tamanhoPolegadas = tamanhoPolegadasInput.value;
            editedProduto = new TV(modelo, resolucao, tamanhoPolegadas, fabricante, valor);
        }
        else {
            console.error("Um ou mais campos de entrada não foram encontrados.");
            return;
        }
    }
    else if (produto instanceof Celular) {
        if (memoriaInput) {
            const memoria = memoriaInput.value;
            editedProduto = new Celular(modelo, memoria, fabricante, valor);
        }
        else {
            console.error("Um ou mais campos de entrada não foram encontrados.");
            return;
        }
    }
    else if (produto instanceof Bicicleta) {
        if (tamanhoAroInput) {
            const tamanhoAro = tamanhoAroInput.value;
            editedProduto = new Bicicleta(modelo, tamanhoAro, fabricante, valor);
        }
        else {
            console.error("Um ou mais campos de entrada não foram encontrados.");
            return;
        }
    }
    else {
        console.error("Tipo de produto não reconhecido.");
        return;
    }
    // Atualizar o produto no carrinho com os novos dados
    const index = carrinho.produtos.findIndex(p => p === produto);
    if (index !== -1) {
        carrinho.produtos[index] = editedProduto;
    }
    // Renderizar novamente a lista após a edição
    renderProdutoList(carrinho.produtos);
    // Recalcular e atualizar o total do carrinho
    updateTotal();
}
// Função para capturar o produto a ser editado
function saveEditedProdutoHandler(event) {
    event.preventDefault(); // Evitar o comportamento padrão do formulário
    if (!currentEditingProduto) {
        console.error("Não há produto em edição.");
        return;
    }
    if (!modeloInput || !fabricanteInput || !valorInput) {
        console.error("Um ou mais campos de entrada não foram encontrados.");
        return;
    }
    const modelo = modeloInput.value;
    const fabricante = fabricanteInput.value;
    const valor = parseFloat(valorInput.value);
    // Chamar a função saveEditedProduto com os valores capturados
    saveEditedProduto(currentEditingProduto, modelo, fabricante, valor);
    // Fecha o modal do bootstrap
    modal === null || modal === void 0 ? void 0 : modal.hide();
    // Limpar os campos do formulário
    clearFormFields();
    // Resetar o produto atualmente em edição
    currentEditingProduto = null;
}
// Função para excluir um produto
function deleteProdutoHandler(index) {
    // Verificar se o índice está dentro dos limites da lista de produtos
    if (index < 0 || index >= carrinho.produtos.length) {
        console.error("Índice fora dos limites da lista de produtos.");
        return;
    }
    // Remover o produto da lista do carrinho
    carrinho.produtos.splice(index, 1);
    // Renderizar novamente a lista após a exclusão
    renderProdutoList(carrinho.produtos);
    // Recalcular e atualizar o total do carrinho
    updateTotal();
}
// Função para atualizar o total do carrinho
function updateTotal() {
    const totalElement = document.getElementById('total');
    const totalBar = document.getElementById('totalBar');
    if (totalElement && totalBar) {
        const total = carrinho.calcularTotal();
        totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
        // Ajustar a largura da barra de progresso com base no valor total
        const totalWidthPercentage = (total / 1000) * 100; // Assume uma largura máxima de 1000
        totalBar.style.width = totalWidthPercentage + "%";
        totalBar.setAttribute('aria-valuenow', totalWidthPercentage.toString());
    }
    else {
        console.error("O elemento total ou totalBar não foi encontrado.");
    }
}
/********************************************* EVENTOS *********************************************/
// Event listener para alterar os campos do formulário com base no tipo de produto selecionado
if (produtoTipoSelect && camposTv && camposCelular && camposBicicleta) {
    produtoTipoSelect.addEventListener('change', function (event) {
        const tipoSelecionado = produtoTipoSelect.value;
        if (tipoSelecionado === 'tv') {
            camposTv.style.display = 'block';
            camposCelular.style.display = 'none';
            camposBicicleta.style.display = 'none';
        }
        else if (tipoSelecionado === 'celular') {
            camposTv.style.display = 'none';
            camposCelular.style.display = 'block';
            camposBicicleta.style.display = 'none';
        }
        else if (tipoSelecionado === 'bicicleta') {
            camposTv.style.display = 'none';
            camposCelular.style.display = 'none';
            camposBicicleta.style.display = 'block';
        }
        else {
            camposTv.style.display = 'none';
            camposCelular.style.display = 'none';
            camposBicicleta.style.display = 'none';
        }
    });
}
else {
    console.error("Um ou mais elementos não foram encontrados.");
}
// Evento de submissão do formulário de produto
if (addProdutoForm) {
    addProdutoForm.addEventListener('submit', function (event) {
        // Verifica se o botão "Adicionar Produto" está visível
        if (addProdutoButton && addProdutoButton.style.display !== 'none') {
            addProdutoHandler(event); // Se estiver visível, chama a função normalmente
        }
        else {
            event.preventDefault(); // Se estiver oculto, impede o comportamento padrão de submissão
        }
    });
}
else {
    console.error("O formulário addProdutoForm não foi encontrado.");
}
// Evento new produto para abrir o modal do novo produto
if (newProdutoButton) {
    newProdutoButton.addEventListener("click", function (event) {
        // Limpar os campos do formulário
        clearFormFields();
        // Exibir o botão "Salvar"
        saveEditProdutoButton.style.display = 'none';
        // Esconder o botão "Adicionar Produto"
        addProdutoButton.style.display = 'block';
    });
}
// Event listener para editar e excluir produtos
if (produtoList) {
    produtoList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('btn-editar')) {
            const index = parseInt(target.getAttribute('data-index') || '');
            currentEditingProduto = carrinho.produtos[index];
            if (currentEditingProduto) {
                if (modeloInput && fabricanteInput && valorInput && produtoTipoSelect && camposTv && camposCelular && camposBicicleta) {
                    modeloInput.value = currentEditingProduto.modelo;
                    fabricanteInput.value = currentEditingProduto.fabricante;
                    valorInput.value = currentEditingProduto.valor.toString();
                    // Selecionar o tipo de produto no seletor
                    if (currentEditingProduto instanceof TV) {
                        produtoTipoSelect.value = 'tv';
                        camposTv.style.display = 'block';
                        camposCelular.style.display = 'none';
                        camposBicicleta.style.display = 'none';
                        const resolucaoInput = document.getElementById('tvResolucao');
                        const tamanhoPolegadasInput = document.getElementById('tvTamanhoPolegadas');
                        if (resolucaoInput && tamanhoPolegadasInput) {
                            resolucaoInput.value = currentEditingProduto.resolucao;
                            tamanhoPolegadasInput.value = currentEditingProduto.tamanhoPolegadas;
                        }
                        else {
                            console.error("Um ou mais campos de entrada para TV não foram encontrados.");
                        }
                    }
                    else if (currentEditingProduto instanceof Celular) {
                        produtoTipoSelect.value = 'celular';
                        camposTv.style.display = 'none';
                        camposCelular.style.display = 'block';
                        camposBicicleta.style.display = 'none';
                        const memoriaInput = document.getElementById('celularMemoria');
                        if (memoriaInput) {
                            memoriaInput.value = currentEditingProduto.memoria;
                        }
                        else {
                            console.error("O campo de entrada para memória do celular não foi encontrado.");
                        }
                    }
                    else if (currentEditingProduto instanceof Bicicleta) {
                        produtoTipoSelect.value = 'bicicleta';
                        camposTv.style.display = 'none';
                        camposCelular.style.display = 'none';
                        camposBicicleta.style.display = 'block';
                        const tamanhoAroInput = document.getElementById('bicicletaTamanhoAro');
                        if (tamanhoAroInput) {
                            tamanhoAroInput.value = currentEditingProduto.tamanhoAro;
                        }
                        else {
                            console.error("O campo de entrada para tamanho do aro da bicicleta não foi encontrado.");
                        }
                    }
                }
                else {
                    console.error("Um ou mais elementos do formulário de edição não foram encontrados.");
                }
                // Exibir o botão "Salvar"
                saveEditProdutoButton.style.display = 'block';
                // Esconder o botão "Adicionar Produto"
                addProdutoButton.style.display = 'none';
            }
            else {
                console.error("Produto não encontrado para edição.");
            }
        }
        else if (target.classList.contains('btn-excluir')) {
            const index = parseInt(target.getAttribute('data-index') || '');
            if (index !== -1) {
                // Chamar a função para excluir o produto com o modelo fornecido
                deleteProdutoHandler(index);
            }
            else {
                console.error("Produto não encontrado para exclusão.");
            }
        }
    });
}
else {
    console.error("O elemento produto-list não foi encontrado.");
}
// Event listener para o botão "Salvar"
if (saveEditProdutoButton) {
    saveEditProdutoButton.addEventListener('click', saveEditedProdutoHandler);
}
else {
    console.error("O botão saveEditProdutoButton não foi encontrado.");
}
updateTotal();
