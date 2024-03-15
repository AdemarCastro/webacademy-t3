const express = require('express');
const fs = require('fs').promises;
require('dotenv').config();
const cors = require('cors'); // Importe o pacote cors

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Use o middleware cors

app.get('/', async (req, res) => {
    try {
        const paragraphs = req.query.x || 1;
        const loremIpsum = await fs.readFile('lorem-ipsum.txt', 'utf8');
        // console.log(loremIpsum)
        const loremParagraphs = loremIpsum.split('\n\n').slice(0, paragraphs).join('\n\n <br><br>');
        // console.log(loremParagraphs);
        res.send(`<p>${loremParagraphs}</p>`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
