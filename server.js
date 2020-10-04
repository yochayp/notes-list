const express = require('express')
const next = require('next')
const mongoose = require('mongoose');

const config = require('./config');

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()
const port = parseInt(process.env.PORT, 10) || 3000
app.prepare()
    .then(() => {
        const server = express()
        server.post(
            '/notes', (req, res) => {
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
          })
      
console.log('server started')
        server.listen(port, (err) => {
            if (err) throw err
            console.log('> Ready on ${port}')
            mongoose.connect(
                config.MONGODB_URI,
                { useUnifiedTopology: true, useNewUrlParser: true }
            );
        })

        const db = mongoose.connection;

        db.on('error', err => console.log(err));

        db.once('open', () => {

            require('./routes/notes')(server);
            server.get('*', (req, res) => {
                return handle(req, res)
            })
            console.log(`Server started on port ${config.PORT}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })

