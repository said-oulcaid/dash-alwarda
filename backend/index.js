const express = require('express')
const cors = require('cors')

const app =express()
const db = require('./models')
const loginPath = require('./routers/login')
const elevePath = require('./routers/eleve-routes')
const centrePath = require('./routers/centre-routes')
const matierePath = require('./routers/matiere-routes')
const niveauPath = require('./routers/niveau-routes')
const enseignantPath = require('./routers/enseignants-routes')
const dotenv = require('dotenv')
dotenv.config()

// Init App
app.use(express.json())
app.use(cors())

app.use(express.urlencoded({extended:true}))

// Routes
app.use('/', loginPath)
app.use('/', elevePath)
app.use('/', centrePath)
app.use('/', matierePath)
app.use('/', niveauPath)
app.use('/', enseignantPath)


db.sequelize.sync().then(()=>{
    app.listen(5000,()=>console.log('server listining'))
})