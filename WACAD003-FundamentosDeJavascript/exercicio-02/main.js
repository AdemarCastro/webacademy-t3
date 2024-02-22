const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

/* Declaring the alternative text for each image file */

/* Looping through images */
for (let i = 1; i < 6; i++) {

    // Variáveis
    const newImage = document.createElement('img');
    const src = `images/pic${i}.jpeg`;
    const alt = `Imagem pic${i}`;

    // Adiciona novos atributos a newImage
    newImage.setAttribute('src', src);
    newImage.setAttribute('alt', alt);

    newImage.addEventListener('click', () => {
        displayedImage.setAttribute('src', src);
        displayedImage.setAttribute('alt', alt);
    });

    thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {

    // Se a classe do botão for 'dark'
    if (btn.classList.contains('dark')) {

        // Remove a classe 'dark' e adiciona a 'light'
        btn.classList.remove('dark');
        btn.classList.add('light');

        // Formata o texto botão para 'Lighten'
        btn.textContent = 'Lighten';

        // Define a sobreposição para obscurecer o layout
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else { // Se a classe do botão não for 'dark'

        // Remove a classe 'light' e adiciona a 'dark'
        btn.classList.remove('light');
        btn.classList.add('dark');

        // Formata o texto do botão para "Darken"
        btn.textContent = 'Darken';

        // Define a sobreposição
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
});
