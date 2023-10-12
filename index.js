const express = require('express')
const app = express()
const pizzaRoutes = require('./routes/pizzas')
const mongoose = require('mongoose')

const port = 3000

mongoose
    .connect('mongodb://localhost:27017/foodtruck')
    .then(()=>{
        console.log("On est connectés")
    })
    .catch((err)=>{
        console.log(err)
    })

app.use(express.json())

app.use('/api/pizzas', pizzaRoutes)




app.listen(port, ()=>{
    console.log('Coucou')
})

