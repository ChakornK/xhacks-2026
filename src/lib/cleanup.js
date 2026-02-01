const { default: mongoose } = require("mongoose");
const { disconnectRedis } = require("./redis");

process.on("SIGTERM", () => {
  disconnectRedis();
  mongoose.connection.close();
});
