import express from 'express'
import { PORT } from './config.js'
import { getMovies } from './readUtil.js'

const app = express()

app.get('/', (req, res) => {
  res.send('GOOD MORNING DANIEL')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)

})

app.get("/show", (req, res) => {
  res.send({ "msg": "Aha you've been tricked!" })
})

app.get("/calc/rect/:length/:width", (req, res) => {
  let data = req.params
  res.status(206).send(`The area of a rectangle ${data.length} x ${data.width} is = ${data.length * data.width}`)
})
app.get("/movies", (req, res) => {
  getMovies(res)
})
