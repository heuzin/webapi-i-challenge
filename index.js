// implement your API here
const express = require('express');

const db = require('./data/db')

const server = express();

server.use(express.json());


server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if (!newUser.name || !newUser.bio) {
            res.status(404).json({
                message: "Please provide name and bio for the user."
            })
    } else {
        db.insert(newUser)
        .then((name) => {
                if (name) {
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
    }
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

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "The user information could not be retrieved."
        });
    });  
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(deleteUser => {
            if (deleteUser) {
                res.json(deleteUser);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist." 
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "The user could not be removed"
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
        .then((name, bio) => {
            if (name && bio) {
                res.status(200).json(name)
            } else {
                res.status(404).json({
                    message: "Please provide name and bio for the user." 
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "The user information could not be modified." 
        });
    });  
});

server.listen(4000, () => {
    console.log('Server is running on port 4000...')
});