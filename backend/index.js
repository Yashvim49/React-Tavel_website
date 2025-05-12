const connectToMongo = require('./db');
const express = require('express')
// var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

// app.use(cors())
app.use(express.json())

//Available route
app.use('/api/services',require('./routes/services'))



app.listen(port, () => {
  console.log(`Wanderwise backend listening at http://localhost:${port}`)
})