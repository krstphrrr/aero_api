if(process.env.NODE_ENV!=='production'){
  require('dotenv').config()
}
const express = require('express')
const db = require('./config/database')
const cors = require('cors')
const helmet = require('helmet')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')


const app = express()

//route
const aeroRoute = require('./routes/aero_get');
// const { reset } = require('nodemon');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));

const swaggerOptions = {
  swaggerDefinition: {
    info:{
      title: 'Aero/Flux API',
      description: 'API to serve to AERO data',
      contact:{
        name:'kris'
      },
      servers:["http://localhost:5015/api/", "https://aero.landscapedatacommons.org/api/"]
    }
  },
  apis:["./routes/*.js"]
}

var swaggerUiOpts = {
  explorer: false,
  swaggerOptions: swaggerOptions,
  customCss: '.swagger-ui .topbar { display: none }'
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOpts))


app.use(helmet())
app.use(cors())

db.authenticate()
    .then(() => console.log('database connected...'))
    .catch(err => console.log('error:'+ err));

app.get('/', (req, res) => {
  res.send('aero api up. updated: 11-03-2020')
  })
app.use('/api', aeroRoute)
db
  .sync({logging:false})
  .catch(err=>{
    console.log(err)
  })
  .then(result=>{
    const server = app.listen(process.env.PORT || 5015)
  })