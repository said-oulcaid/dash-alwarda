const express = require('express')
const route = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { verifyToken } = require('../middlewares/verifyToken')

route.post('/register', (req, res) => {
    db.User.count({ where: { email: req.body.email } }).then(doc => {
        if (doc != 0) {
            return res.status(400).json({ message: 'cet e-mail est utilisé' })
        } {
            bcrypt.hash(req.body.password, 10).then(hashedPassword => {
                db.User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hashedPassword,
                    isOwner: req.body.isOwner,
                }).then((response) => res.status(201).send(response))
                    .catch((error) => res.status(400).send(error))
            })
        }
    })
})

route.post('/login', (req, res) => {

    db.User.findOne({ where: { email: req.body.email } }).then(user => {
        if (!user) {
            res.status(400).json({ message: 'invalid email or password' })
        } else {
            bcrypt.compare(req.body.password, user.password).then(same => {
                if (same) {
                    let token = jwt.sign({ id: user.id, isOwner: user.isOwner, id: user.id }, process.env.JWT_SECRET_KEY,)
                    res.status(200).json({ token: token, user: { id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, isOwner: user.isOwner } })
                } else {
                    res.status(400).json({ message: 'invalid email or password' })
                }
            })
        }
    })
}
)


module.exports = route
