import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import routes from 'apiProxy/routes'

dotenv.config()

const {
  NODE_ENV, API_PORT, API_NAME, API_VERSION, API_DESCRIPTION,
} = process.env

const app = express()

// Logging the requests to the API
switch (NODE_ENV) {
  case 'production':
    app.use(morgan('combined'))
    break
  case 'development':
  default:
    app.use(morgan('dev'))
    break
}

// parse application/json

// app.use(bodyParser.json())
app.use((req, res, next) => {
  bodyParser.json()(req, res, err => {
    // Handles malformed JSON
    if (err) console.error(err)
    next()
  })
})

// Use helmet to remove some and add other headers
app.use(
  helmet({
    // Set powered-by [API_NAME] so no one knows from start how to attack the API
    hidePoweredBy: { setTo: API_NAME },
    // No need to guard from clickjacking, it's a simple API
    frameguard: false,
    // Again, it's a simple API no HTML should be injected
    ieNoOpen: false,
  }),
)

// swagger-jsdoc options
const options = {
  swaggerDefinition: {
    info: {
      title: API_NAME, // Title (required)
      version: API_VERSION, // Version (required)
      description: API_DESCRIPTION,
    },
  },
  apis: ['./**/routes/*.js', './**/models/**/*.js', './**/controllers/**/*.js'],
}
// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)
// Use swagger-jsdoc alongside swagger-ui-express to generate test-able documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Connect all routes to the application
app.use('/', routes)

// Stay a while() and .listen
app.listen(API_PORT, () => {
  console.info(`${API_NAME} v${API_VERSION} listening on port ${API_PORT}`)
})
