const { default: mongoose } = require("mongoose");
const { disconnectRedis } = require("./redis");

process.on("SIGTERM", () => {
  try {
    disconnectRedis();
  } catch (e) {
    console.error(e);
  }
  try {
    mongoose.connection.close();
  } catch (e) {
    console.error(e);
  }
});
