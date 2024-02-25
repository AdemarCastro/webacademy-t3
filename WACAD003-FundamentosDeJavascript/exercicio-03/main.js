// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// function to generate random color

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

/*
    Construtor

    Args:
        x (number): Coordenada X em que o objeto estará localizado
        y (number): Coordenada Y em que o objeto estará localizado
        velX (number): Velocidade em que o objeto irá viajar no eixo X
        velY (number): Velocidade em que o objeto irá viajar no eixo Y
        color (number): Cor do objeto
        size (number): Tamanho do objeto, o seu raio em pixels
 */
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

/*
    Desenha a Bola
 */
Ball.prototype.draw = function() {

    // Declara que queremos desenhar uma forma no papel
    ctx.beginPath();

    // Defini a cor
    ctx.fillStyle = this.color;

    /*
        Traça uma forma de arco no papel

        Args:
            x (number): Coordenada X em que o objeto estará localizado
            y (number): Coordenada Y em que o objeto estará localizado
            size (number): Raio do arco
            startAngle (number): Número inicial em graus da volta do círculo
            endAngle (number: Número final em graus da volta do círculo (Em Radianos)
     */
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

    // Finaliza o desenho
    ctx.fill();
}

/*
    Atualiza os dados de localização da bola
 */
Ball.prototype.update = function() {

    // Verificam se a bola atingiu a borda da tela
    if (this.x + this.size >= width) { // Size incluído no cálculo para que a bola quique quando a borda da bola encostar no limite da tela
        this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
        this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
        this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
        this.velY = -this.velY;
    }

    // Adicionam o valor de velocidade a bola
    this.x += this.velX;
    this.y += this.velY;
};

/*
    Animando a bola
 */
let balls = [];

// Cria uma nova instância da Ball() usando valores aleatórios
// e os adiciona no final do array balls
while (balls.length < 100) {
    let size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        "rgb(" +
        random(0, 255) +
        "," +
        random(0, 255) +
        "," +
        random(0, 255) +
        ")",
        size,
    );

    Ball.prototype.collisionDetect = function () {

        // Checa todas as outras bolas para saber se uma colidiu com a outra
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color =
                        "rgb(" +
                        random(0, 255) +
                        "," +
                        random(0, 255) +
                        "," +
                        random(0, 255) +
                        ")";
                }
            }
        }
    };


    balls.push(ball);
}

/*
    Loop de animação
 */
function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    /*
        Cria um retângulo que preenche a tela

        Args:
            x (number): Posição inicial eixo X
            y (number): Posição inicial eixo Y
            width (number): Tamanho horizontal da tela em pixels
            height (number): Tamanho vertical da tela em pixels

        Explicação: Serve para encobrir o quadro anterior antes que o próximo seja desenhado, caso contrário você veria cobras na tela ao invés do movimento suave da bola viajando pelo navegador
     */
    ctx.fillRect(0, 0, width, height);

    /*
        Percorre o array balls
     */
    for (let i = 0; i < balls.length; i++) {

        // Desenha a bola
        balls[i].draw();

        // Atualiza o desenho
        balls[i].update();

        // Detecta se dois objetos estão colidindo na tela
        balls[i].collisionDetect();
    }

    // Executa a função novamente para criar uma animação suave
    requestAnimationFrame(loop);
}

// Inicia a animação
loop();




