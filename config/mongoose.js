const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const client = mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => connection.connection.getClient())
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected!");
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected!");
});
mongoose.connection.on("reconnected", () => {
  console.log("Mongoose reconnected!");
});
mongoose.connection.on("error", (err) => {
  console.log(`Mongoose err! \n ${err}`);
});

module.exports = client;
