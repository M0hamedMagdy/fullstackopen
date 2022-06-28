const app = require("./app"); // the express app
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

logger.info(`Running on ${config.PORT}`);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
