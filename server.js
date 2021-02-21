const { syncSeed, models: { User, Car, Sale }, db } = require('./db');
const express = require('express');
const path = require('path');
const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.use('/api', require('./api'))



const init = async () => {
    try {
        await syncSeed();
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => console.log(`Listening on port:${PORT}`))
    } catch (error) {
        console.log(error)
    }
};

init()