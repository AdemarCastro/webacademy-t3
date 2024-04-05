import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function getLoremIpsum(req, res) {
    try {
        const paragraphs = req.query.x || 1;
        const loremIpsum = await fs.readFile('lorem-ipsum.txt', 'utf8');

        // console.log("Olá: " + loremIpsum);

        const loremParagraphs = loremIpsum.split('\n\n').slice(0, paragraphs).join('\n\n <br><br>');

        res.setHeader('Content-Type', 'text/plain');

        res.send(`<p>${loremParagraphs}</p>`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

async function getInicio(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
}

export { getLoremIpsum, getInicio };
