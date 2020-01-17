const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://wendhio:010203@cluster0-o4nlj.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
// Configurar requisições no formato JSON
app.use(express.json());
// Rotas
app.use(routes);

// Escolher porta de acesso
app.listen(3333);
