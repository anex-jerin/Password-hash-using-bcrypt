const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())
const Users = []

app.get('/', (req, res) => {
  res.json(Users)
})

app.post('/user', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const user = { name: req.body.name, password: hashPassword }
    Users.push(user)
    res.json(user)
  } catch (error) {
    console.log(error)
  }
})
app.post('/user/login', async (req, res) => {
    const userC = Users.find(user => user.name === req.body.name)
    if (userC == null) {
      return res.status(400).send('user not found')
    }
  try {
    if (await bcrypt.compare(req.body.password, userC.password)) {
      res.status(200).send(`Welcome ${userC.name}`)
    }
    else{
        res.send('Wrong Password')
    }
  } catch (error) {
    res.send()
  }
})

app.listen(3000)
