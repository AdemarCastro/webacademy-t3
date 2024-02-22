// JOKENPO
function jokenpo() {
    // Variáveis
    let pontuacao = 0;

    for (let i = 0; i < 3; i++) {

        // Layout do Jogo
        console.log("Escolha sua jogada:");
        console.log("1 - Papel");
        console.log("2 - Pedra");
        console.log("3 - Tesoura");

        // Recebendo a resposta do usuário
        let resposta = parseInt(prompt('Selecione: '));
        console.log(`Você jogou ${valJokenpo(resposta)}`);

        // Jogada do computador
        let computador = Math.floor(Math.random() * (4 - 1) + 1);
        // console.log(typeof computador);
        // console.log(computador);
        console.log(`O computador jogou ${valJokenpo(computador)}`);

        // Switch para encontrar o resultado da rodada
        switch (resposta) {
            case 1:
                if (computador === 1) {
                    console.log("A rodada empatou!");
                }
                else if (computador === 2) {
                    console.log("Você ganhou!");
                    pontuacao++;
                }
                else if (computador === 3) {
                    console.log("Você perdeu!");
                }
                break;
            case 2:
                if (computador === 1) {
                    console.log("Você perdeu!");
                }
                else if (computador === 2) {
                    console.log("A rodada empatou!");
                }
                else if (computador === 3) {
                    console.log("Você ganhou!");
                    pontuacao++;
                }
                break;
            case 3:
                if (computador === 1) {
                    console.log("Você ganhou!");
                    pontuacao++;
                }
                else if (computador === 2) {
                    console.log("Você perdeu!");
                }
                else if (computador === 3) {
                    console.log("A rodada empatou!");
                }
                break;
            default:
                break;
        }
    } // Como sabemos os valores que serão recebidos, faz sentido utilizar o switch já que ele é mais leve e otimizado que o 'for'

    console.log(`A sua pontuação foi ${pontuacao}`);

    if (pontuacao >=2) {
        console.log(`Parabêns, você venceu o jogo!`);
    } else if (pontuacao < 2) {
        console.log(`Você perdeu, mais sorte na próxima vacilão`);
    }
}

// Inicializando o jogo
jokenpo();

// Função que transforma os números em seus correspondentes no jogo Jokenpo
function valJokenpo (num) {
    if (num == "1") {
        return "Papel";
    } else if (num == "2") {
        return "Pedra";
    } else if (num == "3") {
        return "Tesoura";
    } else {
        return null;
    }
}