process.env.UV_THREADPOOL_SIZE = 4;

const cluster = require('cluster');

if (cluster.isMaster) {
    // Cause index.js to be executed again but in slave mode
    cluster.fork();
    cluster.fork();
} else {
    // I am a child.
    const express = require('express');
    const crypto = require('crypto');
    const app = express();

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Did crypto work');
        });
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast');
    });

    app.listen(3000);
}


