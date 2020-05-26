const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const controllers = require("./controllers");
const app = express();
const port = 3000;
const MONGODB_URI = `mongodb+srv://sleepl:oMLvdUrSfsOlZY3w@cluster0-kwnmr.mongodb.net/test`;

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

public_folder = path.join(__dirname, "public");

app.set("view engine", "ejs");

app.use(express.static(public_folder));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", controllers.getIndex);

app.get("/formasFarmaceuticas", controllers.getFormasFarmaceuticas);

app.get("/fatores", controllers.getFatores);

app.get("/novoManipulado", controllers.getNovoManipulado);

app.post("/novoManipulado", controllers.postNovoManipulado);

app.get("/orcamento", controllers.getOrcamento);

app.post("/orcamento", controllers.postOrcamento);

app.get("/arquivo", controllers.getArquivo);

app.post("/arquivo", controllers.postArquivo);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
