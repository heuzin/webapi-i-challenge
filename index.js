// implement your API here
const express = require('express');

const db = require('./data/db')

const server = express();

server.use(express.json());


server.post('/api/users', (req, res) => {
    const newUser = req.body;

    db.insert(newUser)
        .then((name, bio) => {
            if (name && bio) {
                res.status(201).json(name);
            } else {
                res.status(404).json({
                    message: "Please provide name and bio for the user."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                    err: err,
                    message: "There was an error while saving the user to the database"
            });
        });
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "The users information could not be retrieved."
            });
        });
})

server.listen(4000, () => {
    console.log('Server is running on port 4000...')
});