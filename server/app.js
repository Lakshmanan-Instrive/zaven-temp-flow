if (process.env.NODE_ENV === "local" || process.env.NODE_ENV === "dev") {
  // eslint-disable-next-line global-require
  require("dotenv").config({
    path: `./${process.env.NODE_ENV}.env`,
  });
}

const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const userAgent = require("express-useragent");
const bodyParser = require("body-parser");
const boom = require("@hapi/boom");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const requestIp = require("request-ip");
const useragent = require("express-useragent");
const logError = require("./system/middleware/log-error");
const errorHandler = require("./system/error/handler");
// const swaggerSpec = require('./docs');
const middlewareConfig = require("./system/config/middleware");

// api routes folder path
const countryRoutes = require("./api/Country/route");
const countryCodeRoutes = require("./api/CountryCode/route");
const legalServicesRoutes = require("./api/LegalServices/route");
const userRoutes = require("./api/User/route");
const authRoutes = require("./api/Auth/route");
const corporateRoutes = require("./api/Corporate/route");
const refreshTokenRoutes = require("./api/RefreshToken/route");

app.use(userAgent.express());
app.use(cors(middlewareConfig.cors));
app.use(helmet());
app.use(morgan(middlewareConfig.morganRequestFormat));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(requestIp.mw());
app.use(useragent.express());

// public routes
app.get("/", (req, res) => {
  res.send({
    message: "success",
  });
});
app.get("/api/health", (req, res) => {
  res.send("Health is A OK.");
});

app.use("/api/country", countryRoutes);
app.use("/api/country-code", countryCodeRoutes);
app.use("/api/legal-services", legalServicesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/corporate", corporateRoutes);
app.use("/api/refresh-token", refreshTokenRoutes);

// middleware

//app.use('/api/country-code', countryCodeRoutes);
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  throw boom.notFound("Endpoint Not Found");
});
app.use(logError);
app.use(errorHandler.token);
app.use(errorHandler.validation);
app.use(errorHandler.all);

module.exports = app;
