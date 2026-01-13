import express from 'express'
import { PORT } from './config.js'
import req from 'express/lib/request.js'

const app = express()

app.get('/', (req, res) => {
  res.send('GOODMORNING DANIEL')
})

app.get("/show", (req,res)=>{
  res.send({"msg":"aha you've been tricked!"})
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})