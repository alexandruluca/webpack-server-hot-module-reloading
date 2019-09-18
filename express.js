const express = require('express')

const port = 3000

function expressApp() {
    const app = express();
    app.get('/', (req, res) => res.send('Hello World!'))
    
    app.use('/', (req, res) => {
        console.log('use was called');
    });
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

function fastifyApp() {
    const app = require('fastify')()

    app.get('/test', (req, res) => res.send('Hello World!'))
    
    app.use('/test', (req, res, next) => {
        console.log('use was called');
        next();
    });

    app.listen(3000, (err, address) => {
        if (err) {
            console.error(err)
            return
        }
    })
}

fastifyApp();

