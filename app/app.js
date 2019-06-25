// npm packages
const dotenv = require("dotenv");
const express = require("express");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

Promise = require("bluebird"); // eslint-disable-line

// app imports
const { connectToDatabase, globalResponseHeaders } = require("./config");
const { errorHandler } = require("./handlers");
const { thingsRouter, accountsRouter } = require("./routers");

// global constants
dotenv.config();
const app = express();
const {
  bodyParserHandler,
  globalErrorHandler,
  fourOhFourHandler,
  fourOhFiveHandler
} = errorHandler;

//Auth stuff
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-5ubi1s8k.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://68.183.100.145/api",
  issuer: "https://dev-5ubi1s8k.auth0.com/",
  algorithms: ["RS256"]
});

app.use(jwtCheck);

// database
connectToDatabase();

// body parser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "*/*" }));
app.use(bodyParserHandler); // error handling specific to body parser only

// response headers setup; CORS
app.use(globalResponseHeaders);

app.use("/things", thingsRouter);
app.use("/accounts", accountsRouter);

// catch-all for 404 "Not Found" errors
app.get("*", fourOhFourHandler);
// catch-all for 405 "Method Not Allowed" errors
app.all("*", fourOhFiveHandler);

app.use(globalErrorHandler);

/**
 * This file does NOT run the app. It merely builds and configures it then exports it.config
 *  This is for integration tests with supertest (see __tests__).
 */
module.exports = app;
