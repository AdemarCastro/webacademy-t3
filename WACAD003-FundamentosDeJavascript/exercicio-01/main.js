// Variáveis
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
    const random = Math.floor(Math.random()*array.length);
    return array[random];
}

// Arrays com referências ao anime Hunter x Hunter <3
const insertX = ["Gon Freecss", "Killua Zoldyck", "Hisoka Morow"];
const insertY = ["Heaven's Arena", "Yorknew City", "Greed Island"];
const insertZ = ["unleashed their Nen abilities", "faced off against a Chimera Ant", "participated in the Hunter Exam"];

// Cria a história base
const storyText = "The Hunter Exam was underway, so :insertx: decided to participate. When they reached :inserty:, they were astonished for a moment, then :insertz:. Kurapika witnessed the entire event, but remained composed — :insertx: was determined to prove their worth, even in challenging circumstances.\n";

// Adiciona um evento de clique ao botão "Randomize"
randomize.addEventListener('click', result);

// Função que gera a história
function result() {

    // Variável para armazenar a história gerada
    let newStory = storyText;

    // Obtenção de valores aleatórios dos arrays
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    // Substituições na história base
    newStory = newStory.replace(":insertx:", xItem);
    newStory = newStory.replace(":insertx:", xItem);
    newStory = newStory.replace(":inserty:", yItem);
    newStory = newStory.replace(":insertz:", zItem);

    // Verifica se o usuário inseriu um nome personalizado
    if (customName.value) {
        newStory = newStory.replace("Kurapika", customName.value);
    }

    // Verifica se a opção "UK English" está selecionada
    // Tentei transformar termos mais usuais US para termos mais utilizado UK
    if (document.getElementById("uk").checked) {
        newStory = newStory.replace("astonished", "amazed");
        newStory = newStory.replace("decided", "chose");
        newStory = newStory.replace("worth", "value");
    }

    // Atribuí o texto criado até agora 'newStory' ao elemento <p> no HTML
    story.textContent = newStory;

    // Torna a história visível
    story.style.visibility = 'visible';
}
