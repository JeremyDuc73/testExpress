const express = require('express')
const app = express()
const session = require("express-session")
const port = 3000

const mongodbSession = require("connect-mongodb-session")(session)
const mongoose = require('mongoose')

const pizzaRoutes = require('./routes/pizzas')
const userRoutes = require('./routes/session')

const mongodbUrl = "mongodb://localhost:27017/foodtruck"
mongoose.connect(mongodbUrl, {useNewUrlParser: true})
    .then(()=>{
        console.log("On est connectés")
    })
    .catch((err)=>{
        console.log(err)
    })

const store = new mongodbSession({
    url: mongodbUrl,
    collection: 'sessions'
})

const isAuth = (req,res,next)=>{
    if (req.session.isAuth){
        next()
    }else{
        res.send('not connected')
    }
}

app.use(session({
    secret: 'a key that is a string that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.get('/', (req,res)=>{
    req.session.isAuth =  true
    res.send("session ok")
})


app.use(express.json())
app.use('/api/pizzas', pizzaRoutes)
app.use('/api/user', userRoutes)



app.listen(port, ()=>{
    console.log('Coucou')
})

