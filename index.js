const express = require('express')
const fs = require('fs').promises;

const app = express();

app.get('/', (request, response) => {
	return response.sendFile('index.html', { root: '.' });
});

app.get('/gameList', async function (request, response) {
    try {
        const data = await fs.readFile('./games.json', 'utf-8');
        const games = JSON.parse(data);
        response.json(games);
    } catch (error) {
        console.error('Error reading games.json:', error);
        response.status(500).json({ error: 'Failed to load game list' });
    }
})

app.get('/game/:id', async function (request, response) {
    const gameId = request.params.id;
    try {
        const data = await fs.readFile('./games.json', 'utf-8');
        const games = JSON.parse(data);
        const game = games.find(g => g.id === gameId);
        if (game) {
            response.json(game);
        } else {
            response.status(404).json({ error: 'Game not found' });
        }
    } catch (error) {
        console.error('Error reading games.json:', error);
        response.status(500).json({ error: 'Failed to load game details' });
    }
}
);