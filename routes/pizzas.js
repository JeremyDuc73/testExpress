const { Router } = require ('express')
const router = Router()
const Pizza = require('../models/Pizza')
const {createPizza, displayPizzas, deletePizza, updatePizza, displayOnePizza} = require('../controllers/Pizza')
const pizzas = [
    {
        "id" : 1,
        "name": "trois fromages",
        "price": 13
    },
    {
        "id" : 2,
        "name": "reine",
        "price": 12
    },
    {
        "id" : 3,
        "name": "margherita",
        "price": 10
    }
]

//router.get('/all', (req, res)=>{

   // res.send(pizzas)
//})

//router.get('/:name', (req, res)=>{
  //  let { name } = req.params
    //let pizza = pizzas.find(x=> x.name === name)
    //res.send(pizza)
//})

router.post('/create', (req, res) =>{
    let lastId = pizzas.findLast(p=>p.id)
    let newId = lastId.id +1
    let pizza = {}
    pizza.id = newId
    let newPizza = req.body
    Object.assign(pizza, newPizza)
    pizzas.push(pizza)
    res.send(pizzas)
})

router.get('/', displayPizzas)

router.post('/add', createPizza)

router.delete('/delete/:name', deletePizza)

router.put('/modify/:name', updatePizza)

router.get('/:name', displayOnePizza)

module.exports = router