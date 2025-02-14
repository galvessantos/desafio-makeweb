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
      console.error("Erro ao buscar filmes:", err);
      res.status(500).json({ error: "Erro ao buscar filmes" });
      return;
    }
    res.json(result);
  });
});


app.get("/filmes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM filmes WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar filme:", err);
      res.status(500).json({ error: "Erro ao buscar filme" });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: "Filme não encontrado" });
      return;
    }

    res.json(result[0]);
  });
});


app.post("/filmes", (req, res) => {
  console.log("Recebendo dados do frontend:", req.body);

  const { nome, descricao, diretor, anolancamento, genero, avaliacao, urlimagem } = req.body;

  if (!nome || !descricao || !diretor || !anolancamento || !genero || avaliacao === undefined || !urlimagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const anolancamentoNum = parseInt(anolancamento, 10);
  const avaliacaoNum = parseFloat(avaliacao);

  if (isNaN(anolancamentoNum) || anolancamentoNum < 1800 || anolancamentoNum > new Date().getFullYear()) {
    return res.status(400).json({ error: "Ano de lançamento inválido" });
  }

  if (isNaN(avaliacaoNum) || avaliacaoNum < 0 || avaliacaoNum > 10) {
    return res.status(400).json({ error: "A avaliação deve estar entre 0 e 10" });
  }

  const sql =
    "INSERT INTO filmes (nome, descricao, diretor, anolancamento, genero, avaliacao, urlimagem) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [nome, descricao, diretor, anolancamentoNum, genero, avaliacaoNum, urlimagem];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erro ao adicionar filme:", err);
      res.status(500).json({ error: "Erro ao adicionar filme", details: err });
      return;
    }

    const newMovie = { id: result.insertId, ...req.body };
    console.log("Filme adicionado com sucesso:", newMovie);
    res.status(201).json(newMovie);
  });
});


app.delete("/filmes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM filmes WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir filme:", err);
      res.status(500).json({ error: "Erro ao excluir filme" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Filme não encontrado" });
      return;
    }

    console.log(`Filme com ID ${id} excluído com sucesso.`);
    res.json({ message: "Filme excluído com sucesso" });
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
