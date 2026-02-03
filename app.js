import express from 'express'
import { PORT } from './config.js'
import { getMovie, getMovies } from './readUtil.js'

const app = express()

app.get('/', (req, res) => {
  res.send('GOOD MORNING DANIEL')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)

})

app.get("/calc/rect/:length/:width", (req, res) => {
  let data = req.params
  res.status(206).send(`The area of a rectangle ${data.length} x ${data.width} is = ${data.length * data.width}`)
})

app.get("/:type", (req, res) => {
  let type = req.params.type.toLowerCase()
  if (type != "movie" && type != "series") {
    res.status(400).send({ "error": "Invalid URI" })
    return
  }
  getMovies(res, type)
})

// page
app.get("/:type/p:page", (req, res) => {
  const pageSize = 10
  let type = req.params.type.toLowerCase()
  if (type != "movie" && type != "series") {
    res.status(400).send({ "error": "Invalid URI" })
    return
  }
  let page = parseInt(req.params.page)
  if (!page || isNaN(page) || page < 1) {
    res.status(400).send({ "error": "Invalid URI" })
    return
  }
  page = (page - 1) * pageSize
  getMovies(res, type, page)
})

// info
app.get("/info/:id", (req, res) => {
  let movieID = req.params.id
  if (!movieID || movieID.length != 24) {
    res.status(400).send({ "error": "Invalid ID" })
    return
  }
  getMovie(res, movieID)
})