import 'reflect-metadata'
import express from 'express'
import routes from './routes'
import './database/index'

const app = express()
// Middlewares
app.use(express.json())
app.use(routes)

app.listen(3333, () => {
  console.log('App running on port 3333')
})
