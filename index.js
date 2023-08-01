const app = require("./app");
const logger = require("./utils/logger");

const PORT = 3005;
app.listen(PORT, () => {
    logger.info(`SERVER RUNNING ON PORT: ${PORT}`);
})