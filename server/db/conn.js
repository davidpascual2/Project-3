const mongoose = require("mongoose");

const DB = `mongodb+srv://user123:user123@cluster0.9hkme8k.mongodb.net/NEW-APP?retryWrites=true&w=majority`;

mongoose
  .connect(DB, {
    useNewUrlParser: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log("Database not connected"));
