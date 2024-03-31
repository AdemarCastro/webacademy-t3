/********************************************* DEFININDO CLASSES *********************************************/
interface Produto {
    modelo: string;
    fabricante: string;
    valor: number;
}

class TV implements Produto {
    constructor(
        public modelo: string,
        public resolucao: string,
        public tamanhoPolegadas: string,
        public fabricante: string,
        public valor: number
    ) {}
}

class Celular implements Produto {
    constructor(
        public modelo: string,
        public memoria: string,
        public fabricante: string,
        public valor: number
    ) {}
}

class Bicicleta implements Produto {
    constructor(
        public modelo: string,
        public tamanhoAro: string,
        public fabricante: string,
        public valor: number
    ) {}
}

interface CarrinhoDeCompras<T extends Produto> {
    produtos: T[];
    adicionarProduto(produto: T): void;
    calcularTotal(): number;
}

class Carrinho implements CarrinhoDeCompras<Produto> {
    produtos: Produto[] = [];

    adicionarProduto(produto: Produto | null): void {
        if (produto) {
            this.produtos.push(produto);
        } else {
            console.error("Produto inserido é null.");
        }
    }

    calcularTotal(): number {
        return this.produtos.reduce((total, produto) => total + produto.valor, 0);
    }
}

// Instância do carrinho
const carrinho: Carrinho = new Carrinho();

/********************************************* VARIÁVEIS e TIPOS *********************************************/

// Instância da turma
const produtoList: HTMLElement | null = document.getElementById('produto-list');
const addProdutoForm: HTMLFormElement | null = document.getElementById('addProdutoForm') as HTMLFormElement;
const newProdutoButton: HTMLButtonElement | null = document.getElementById('newProdutoButton') as HTMLButtonElement;
const produtoTipoSelect: HTMLSelectElement | null = document.getElementById('produtoTipo') as HTMLSelectElement;
const camposTv: HTMLElement | null = document.getElementById('camposTv');
const camposCelular: HTMLElement | null = document.getElementById('camposCelular');
const camposBicicleta: HTMLElement | null = document.getElementById('camposBicicleta');
const produtoTipo: HTMLSelectElement | null = document.getElementById('produtoTipo') as HTMLSelectElement;
const modeloInput: HTMLInputElement | null = document.getElementById('produtoModelo') as HTMLInputElement;
const fabricanteInput: HTMLInputElement | null = document.getElementById('produtoFabricante') as HTMLInputElement;
const valorInput: HTMLInputElement | null = document.getElementById('produtoValor') as HTMLInputElement;
const resolucaoInput: HTMLInputElement | null = document.getElementById('tvResolucao') as HTMLInputElement;
const tamanhoPolegadasInput: HTMLInputElement | null = document.getElementById('tvTamanhoPolegadas') as HTMLInputElement;
const memoriaInput: HTMLInputElement | null = document.getElementById('celularMemoria') as HTMLInputElement;
const tamanhoAroInput: HTMLInputElement | null = document.getElementById('bicicletaTamanhoAro') as HTMLInputElement;
const progressBars = document.querySelectorAll('.progress-bar') as NodeListOf<HTMLElement>;
// const mediaBar = document.getElementById('mediaBar') as
const modalElement = document.getElementById('modalNovoAluno');
const modal = modalElement && new bootstrap.Modal(modalElement); // Verifica se o modalElement é null antes de passá-lo ao construtor

const addProdutoButton: HTMLButtonElement | null = document.getElementById('addProdutoButton') as HTMLButtonElement;
const saveEditProdutoButton: HTMLButtonElement | null = document.getElementById('saveEditProdutoButton') as HTMLButtonElement;

// Variável global de edição do Aluno
let currentEditingProduto : Produto | null;
/********************************************* FUNÇÕES *********************************************/

// Função para renderizar a lista de produtos
function renderProdutoList(produtos: Produto[]) : void {
    const produtoListElement: HTMLElement | null = document.getElementById('produto-list');
    if (produtoListElement) {
        // Limpar a lista antes de renderizar novamente
        produtoListElement.innerHTML = '';

        produtos.forEach((produto : Produto, index : number) : void => {
            const listItem : HTMLTableRowElement = document.createElement('tr');

            let detalhesProduto = '';

            if (produto instanceof TV) {
                detalhesProduto = `Resolução: ${produto.resolucao}, Tamanho: ${produto.tamanhoPolegadas}"`;
            } else if (produto instanceof Celular) {
                detalhesProduto = `Memória: ${produto.memoria}`;
            } else if (produto instanceof Bicicleta) {
                detalhesProduto = `Tamanho Aro: ${produto.tamanhoAro}"`;
            }

            listItem.innerHTML = `
                <td>${produto.modelo}</td>
                <td>${produto.fabricante}</td>
                <td>${produto.valor}</td>
                <td>${detalhesProduto}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-editar" data-index="${index}" data-bs-toggle="modal" data-bs-target="#modalNovoProduto">Editar</button>
                    <button type="button" class="btn btn-danger btn-excluir" data-index="${index}">Excluir</button>
                </td>
            `;
            if (produtoListElement) produtoListElement.appendChild(listItem);
        });
    } else {
        console.error("O elemento produto-list não foi encontrado.");
    }
}


// Função para limpar os campos do formulário de aluno
function clearFormFields() : void {
    if (modeloInput && fabricanteInput && valorInput && resolucaoInput && tamanhoPolegadasInput && memoriaInput && tamanhoAroInput) {
        modeloInput.value = '';
        fabricanteInput.value = '';
        valorInput.value = '';
        resolucaoInput.value = '';
        tamanhoPolegadasInput.value = '';
        memoriaInput.value = '';
        tamanhoAroInput.value = '';
    } else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }
}

// Função para adicionar um produto
function addProdutoHandler(event: SubmitEvent): void {
    event.preventDefault(); // Evitar o comportamento padrão do formulário

    if (produtoTipo && modeloInput && fabricanteInput && valorInput) {
        const tipo: string = produtoTipo.value;
        const modelo: string = modeloInput.value;
        const fabricante: string = fabricanteInput.value;
        const valor: number = parseFloat(valorInput.value);

        let novoProduto: Produto | null = null;
        switch (tipo) {
            case 'tv':
                const resolucaoInput: HTMLInputElement | null = document.getElementById('tvResolucao') as HTMLInputElement;
                const tamanhoPolegadasInput: HTMLInputElement | null = document.getElementById('tvTamanhoPolegadas') as HTMLInputElement;

                if (resolucaoInput && tamanhoPolegadasInput) {
                    const resolucao : string = resolucaoInput.value;
                    const tamanhoPolegadas : string = tamanhoPolegadasInput.value;

                    novoProduto = new TV(modelo, resolucao, tamanhoPolegadas, fabricante, valor);
                } else {
                    console.error("Um ou mais campos de entrada não foram encontrados.");
                }
                break;

            case 'celular':
                const memoriaInput: HTMLInputElement | null = document.getElementById('celularMemoria') as HTMLInputElement;

                if (memoriaInput) {
                    const memoria : string = memoriaInput.value;

                    novoProduto = new Celular(modelo, memoria, fabricante, valor);
                } else {
                    console.error("Um ou mais campos de entrada não foram encontrados.");
                }
                break;

            case 'bicicleta':
                const tamanhoAroInput: HTMLInputElement | null = document.getElementById('bicicletaTamanhoAro') as HTMLInputElement;

                if (tamanhoAroInput) {
                    const tamanhoAro : string = tamanhoAroInput.value;

                    novoProduto = new Bicicleta(modelo, tamanhoAro, fabricante, valor);
                } else {
                    console.error("Um ou mais campos de entrada não foram encontrados.");
                }
                break;

            default:
                console.error("Tipo de produto não reconhecido.");
        }

        // Adicionar o novo produto ao carrinho
        carrinho.adicionarProduto(novoProduto);

        // Fecha o modal do bootstrap
        modal?.hide();

        // Limpar os campos do formulário
        clearFormFields();

        // Renderizar novamente a lista após a adição do aluno
        renderProdutoList(carrinho.produtos);

        // Recalcular e atualizar o total do carrinho
        updateTotal();
    } else {
        console.error("Um ou mais campos de entrada não foram encontrados.");
    }
}

// Função para salvar produto editado
function saveEditedProduto(produto: Produto, modelo: string, fabricante: string, valor: number): void {
    let editedProduto: Produto;

    if (produto instanceof TV) {

        if (resolucaoInput && tamanhoPolegadasInput) {
            const resolucao: string = resolucaoInput.value;
            const tamanhoPolegadas: string = tamanhoPolegadasInput.value;

            editedProduto = new TV(modelo, resolucao, tamanhoPolegadas, fabricante, valor);
        } else {
            console.error("Um ou mais campos de entrada não foram encontrados.");
            return;
        }
    } else if (produto instanceof Celular) {

        if (memoriaInput) {
            const memoria: string = memoriaInput.value;

            editedProduto = new Celular(modelo, memoria, fabricante, valor);
        } else {
            console.error("Um ou mais campos de entrada não foram encontrados.");
            return;
        }
    } else if (produto instanceof Bicicleta) {

        if (tamanhoAroInput) {
            const tamanhoAro: string = tamanhoAroInput.value;

            editedProduto = new Bicicleta(modelo, tamanhoAro, fabricante, valor);
        } else {
            console.error("Um ou mais campos de entrada não foram encontrados.");
            return;
        }
    } else {
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
function saveEditedProdutoHandler(event: MouseEvent): void {
    event.preventDefault(); // Evitar o comportamento padrão do formulário

    if (!currentEditingProduto) {
        console.error("Não há produto em edição.");
        return;
    }

    if (!modeloInput || !fabricanteInput || !valorInput) {
        console.error("Um ou mais campos de entrada não foram encontrados.");
        return;
    }

    const modelo: string = modeloInput.value;
    const fabricante: string = fabricanteInput.value;
    const valor: number = parseFloat(valorInput.value);

    // Chamar a função saveEditedProduto com os valores capturados
    saveEditedProduto(currentEditingProduto, modelo, fabricante, valor);

    // Fecha o modal do bootstrap
    modal?.hide();

    // Limpar os campos do formulário
    clearFormFields();

    // Resetar o produto atualmente em edição
    currentEditingProduto = null;
}


// Função para excluir um produto
function deleteProdutoHandler(index: number): void {
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
function updateTotal(): void {
    const totalElement: HTMLElement | null = document.getElementById('total');

    if (totalElement) {
        const total: number = carrinho.calcularTotal();
        totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    } else {
        console.error("O elemento total ou totalBar não foi encontrado.");
    }
}

/********************************************* EVENTOS *********************************************/

// Exibir campos de TV inicialmente
if (camposTv) {
    camposTv.style.display = 'block';
}

// Event listener para alterar os campos do formulário com base no tipo de produto selecionado
if (produtoTipoSelect && camposTv && camposCelular && camposBicicleta) {
    produtoTipoSelect.addEventListener('change', function(event : Event) : void {
        const tipoSelecionado : string = produtoTipoSelect.value;
        camposTv.style.display = tipoSelecionado === 'tv' ? 'block' : 'none';
        camposCelular.style.display = tipoSelecionado === 'celular' ? 'block' : 'none';
        camposBicicleta.style.display = tipoSelecionado === 'bicicleta' ? 'block' : 'none';

        if (resolucaoInput && tamanhoPolegadasInput) {
            resolucaoInput.required = tipoSelecionado === 'tv';
            tamanhoPolegadasInput.required = tipoSelecionado === 'tv';
        }
        if (memoriaInput) {
            memoriaInput.required = tipoSelecionado === 'celular';
        }
        if (tamanhoAroInput) {
            tamanhoAroInput.required = tipoSelecionado === 'bicicleta';
        }
    });
} else {
    console.error("Um ou mais elementos não foram encontrados.");
}

// Evento de submissão do formulário de produto
if (addProdutoForm) {
    addProdutoForm.addEventListener('submit', function(event) {
        // Verifica se o botão "Adicionar Produto" está visível
        if (addProdutoButton && addProdutoButton.style.display !== 'none') {
            addProdutoHandler(event); // Se estiver visível, chama a função normalmente
        } else {
            event.preventDefault(); // Se estiver oculto, impede o comportamento padrão de submissão
        }
    });
} else {
    console.error("O formulário addProdutoForm não foi encontrado.");
}

// Evento new produto para abrir o modal do novo produto
if (newProdutoButton) {
    newProdutoButton.addEventListener("click", function (event : MouseEvent) {
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
    produtoList.addEventListener('click', function (event: MouseEvent): void {
        const target: HTMLElement = event.target as HTMLElement;
        if (target.classList.contains('btn-editar')) {
            const index: number = parseInt(target.getAttribute('data-index') || '');
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

                        if (resolucaoInput && tamanhoPolegadasInput) {
                            resolucaoInput.value = currentEditingProduto.resolucao;
                            tamanhoPolegadasInput.value = currentEditingProduto.tamanhoPolegadas;
                        } else {
                            console.error("Um ou mais campos de entrada para TV não foram encontrados.");
                        }
                    } else if (currentEditingProduto instanceof Celular) {
                        produtoTipoSelect.value = 'celular';
                        camposTv.style.display = 'none';
                        camposCelular.style.display = 'block';
                        camposBicicleta.style.display = 'none';

                        if (memoriaInput) {
                            memoriaInput.value = currentEditingProduto.memoria;
                        } else {
                            console.error("O campo de entrada para memória do celular não foi encontrado.");
                        }
                    } else if (currentEditingProduto instanceof Bicicleta) {
                        produtoTipoSelect.value = 'bicicleta';
                        camposTv.style.display = 'none';
                        camposCelular.style.display = 'none';
                        camposBicicleta.style.display = 'block';

                        if (tamanhoAroInput) {
                            tamanhoAroInput.value = currentEditingProduto.tamanhoAro;
                        } else {
                            console.error("O campo de entrada para tamanho do aro da bicicleta não foi encontrado.");
                        }
                    }
                } else {
                    console.error("Um ou mais elementos do formulário de edição não foram encontrados.");
                }

                // Exibir o botão "Salvar"
                saveEditProdutoButton.style.display = 'block';
                // Esconder o botão "Adicionar Produto"
                addProdutoButton.style.display = 'none';
            } else {
                console.error("Produto não encontrado para edição.");
            }

        } else if (target.classList.contains('btn-excluir')) {
            const index: number = parseInt(target.getAttribute('data-index') || '');
            if (index !== -1) {
                // Chamar a função para excluir o produto com o modelo fornecido
                deleteProdutoHandler(index);
            } else {
                console.error("Produto não encontrado para exclusão.");
            }
        }
    });
} else {
    console.error("O elemento produto-list não foi encontrado.");
}

// Event listener para o botão "Salvar"
if (saveEditProdutoButton) {
    saveEditProdutoButton.addEventListener('click', saveEditedProdutoHandler);
} else {
    console.error("O botão saveEditProdutoButton não foi encontrado.");
}

// Atualiza o total do carrinho logo ao abrir a aplicação
updateTotal();