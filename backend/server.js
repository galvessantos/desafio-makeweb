require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: "*" }));
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "meubanco",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});

app.get("/filmes", (req, res) => {
  db.query("SELECT * FROM filmes", (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar filmes" });
      return;
    }
    res.json(result);
  });
});

app.post("/filmes", (req, res) => {
  const { nome, descricao, diretor, anolancamento, genero, avaliacao, urlimagem } = req.body;
  if (!nome || !descricao || !diretor || !anolancamento || !genero || !avaliacao || !urlimagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const sql = "INSERT INTO filmes (nome, descricao, diretor, anolancamento, genero, avaliacao, urlimagem) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [nome, descricao, diretor, anolancamento, genero, avaliacao, urlimagem];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao adicionar filme" });
      return;
    }
    res.json({ id: result.insertId, ...req.body });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
