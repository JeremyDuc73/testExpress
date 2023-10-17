const User = require('../models/User')
const bcrypt = require("bcryptjs")


const register = async function register(req,res){

    let { ...userParams } = req.body

    let hashedPassword = await bcrypt.hash(userParams.password, 12)

    let user = await User.findOne({email: userParams.email})
    if (!user){
        let newUser = await User.create({
            username: userParams.username,
            email: userParams.email,
            password: hashedPassword
        })
        res.send(newUser)

    }else {
        res.sendStatus(400).send("email already exists")
    }

}


const login = async function login(req,res){

    if (req.session.isAuth){
        res.send("You're already logged in")
    }
    let { ...userParams } = req.body
    let user = await User.findOne({ email: userParams.email })
    if (!user){
        res.sendStatus(404).send("This user hasn't been find")
    }
    const match = await bcrypt.compare(userParams.password, user.password)

    if (!match){
        res.sendStatus(200).send("Wrong password")
    }

    req.session.isAuth = true
    res.send("You're log in " + user.username)

}


const logout = async function logout(req,res){

    if (req.session.isAuth){
        req.session.destroy()
        res.send("Logged out")
    }else {
        res.send("You're not log in")
    }


}


module.exports = { register, login, logout }