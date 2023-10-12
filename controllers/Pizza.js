const Pizza = require("../models/Pizza");
async function createPizza(req, res) {
    let {...pizzaParams} = req.body
    await Pizza.create({...pizzaParams})
    res.sendStatus(201)
}

async function displayPizzas(req, res){
    res.send(await Pizza.find({}))
}

async function displayOnePizza(req, res){
    let {...pizzaOne} = req.params
    res.send(await Pizza.findOne({...pizzaOne}))
}

async function deletePizza(req, res){
    let {...pizzaToDelete} = req.params
    await Pizza.findOneAndDelete({...pizzaToDelete})
    res.send("OK")
}

async function updatePizza(req, res){
    let { ...pizzaToUpdate } = req.params
    let {...pizzaParams} = req.body
    await Pizza.findOneAndUpdate({...pizzaToUpdate}, {...pizzaParams})
    res.send("MODIFY OK")
}

module.exports = {createPizza, displayPizzas, deletePizza, updatePizza, displayOnePizza}