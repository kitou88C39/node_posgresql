const express = require('express');
const app = express();
const PORT = 3000;
const pool = require('/db');

//APIを作成
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello Express');
});

//User情報を全て取得する
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.row);
  });
});

//特定のUserを取得する
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.row);
  });
});

app.listen(PORT, () => {
  console.log('server is running on PORT' + PORT);
});
