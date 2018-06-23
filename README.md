# API Proxy 🚀

---

Simple API Proxy project - no storage layer, proxies results from underlaying API, built to be a boilerplate for API's, good training-hack-session and memory refresher.

Tested with [NHTSA NCAP 5 Star Safety Ratings API](https://one.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5).

- [API Proxy](#api-proxy)
  - [Up and running](#up-and-running)
    - [Local development environment](#local-development-environment)
    - [Production deployment](#production-deployment)
  - [Swagger](#swagger)
  - [Notes](#notes)
  - [Addendum](#addendum)
    - [ENV variables](#env-variables)
    - [Node version](#node-version)
    - [Packages used](#packages-used)

## Up and running

### Local development environment

You have two options in doing so, running directly on the local terminal, or using [docker](https://docs.docker.com/install/) along with [docker-compose](https://docs.docker.com/compose/install/)

- Terminal: Copy/rename `.env.example` file to `.env` set any changes to the `ENV` variables and then run `npm install && npm start` or `yarn && yarn start`

- Docker (Compose): Modify the `docker-compose.yml` file, set any changes on the files and then simply run `docker-compose up dev`

### Production deployment

- Docker (with Compose): Modify the `docker-compose.yml` file, set any changes on the files and then simply run `docker-compose up -d prod`. Also, can be piped through a CI (such as CircleCI) and be deployed via [Google Cloud SDK](https://cloud.google.com) To its [Kubernetes Engine](https://cloud.google.com/kubernetes-engine/) for example.

### Swagger

This project implements `swagger-ui-express` along with `swagger-jsdoc` which easily deploys a swagger UI page with all relevant documentation that is previously set in JSDoc format, following the [OpenAPI a.k.a. Swagger](https://swagger.io/docs/specification) specification.

After getting the API server up and running, you can navigate to [http://localhost:8888/api-docs](http://localhost:8888/api-docs) to use the Swagger UI :rocket:

## Notes

- Handles malformed JSON when parsing the body, it returns 200 and an empty `baseModel` object, in case the test suite you are using doesn't deal with status codes, the proper way to handle any error (such as missing params in the JSON body) would be returning the corresponding status code (400 Bad Request) and relaying any messages; or returning 200, the `baseModel` and a meaningful message, or even an error object with error codes such as:

```javascript
{
  // Spread the baseModel[Count, Results, Message] Object
  ...baseModel
  "error":{
    "code": -999,
    "message": "Something really bad happened"
  }
}
```

## Addendum

### ENV variables

- `NODE_ENV`: determines the environment that the API is running, possible values:
  - `development`
  - `production`
- `API_PORT`: the port that the API will be exposed
- `API_NAME`: Name of the API
- `API_VERSION`: SemVer of the API (i.e: 1.0.0)
- `API_DESCRIPTION`: Description of the API
- `API_RESPONSE_VERBOSE`: Allows to pipe he messages of the underlaying API to the response object
- `VEHICLE_API_BASE_URL`: The base of the API URL for the [VEHICLES](https://one.nhtsa.gov/webapi/api/SafetyRatings) example

### Node version

The project uses node 8.11 the latest LTS as of June 2018

### Packages used

- [Express](http://expressjs.com) - minimalist and flexible framework with plenty of middleware options to extend
- [Babel](http://babeljs.io) - javascript transpiler of usage of es6, es7 features (object/array spread operators, await/async)
- [dotenv](https://github.com/motdotla/dotenv) - zero-dependency module that loads environment variables from a .env file into process.env
- [helmet](https://helmetjs.github.io) - helps on securing (a litle bit) the node.js app by setting a series of headers
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger, to see what's being sent to the API
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) - Generates swagger doc based on JSDoc, used with together with `swagger-ui-express`
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - Middleware for the express app to serve the Swagger UI bound to the `swagger-jsdoc` definitions.
- [nodemon](https://helmetjs.github.io) [`dev-dep`]- monitors changes in the node.js app and automatically restarts the server
- [eslint](https://eslint.org/) [`dev-dep`]- linting for javascript, keeps code files in shape
